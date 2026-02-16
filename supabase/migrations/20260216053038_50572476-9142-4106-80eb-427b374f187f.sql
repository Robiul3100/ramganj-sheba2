
-- ========== ENUM & ROLE SYSTEM ==========
CREATE TYPE public.app_role AS ENUM ('user', 'moderator', 'admin', 'super_admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_above(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'super_admin')
  )
$$;

CREATE OR REPLACE FUNCTION public.is_moderator_or_above(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('moderator', 'admin', 'super_admin')
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.is_admin_or_above(auth.uid()));

-- ========== PROFILES ==========
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name) 
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========== CATEGORIES ==========
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- 'business', 'job', 'news', 'event', etc.
  icon TEXT,
  color TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL USING (public.is_admin_or_above(auth.uid()));

-- ========== BUSINESS DIRECTORY ==========
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  phone TEXT,
  address TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  opening_hours TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved businesses" ON public.businesses FOR SELECT USING (is_approved = true);
CREATE POLICY "Users create businesses" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Owners update own" ON public.businesses FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins manage businesses" ON public.businesses FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== JOB BOARD ==========
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT,
  description TEXT,
  salary_range TEXT,
  location TEXT,
  job_type TEXT DEFAULT 'full_time', -- full_time, part_time, contract, overseas
  deadline DATE,
  apply_link TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved jobs" ON public.jobs FOR SELECT USING (is_approved = true);
CREATE POLICY "Users create jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Owners update own jobs" ON public.jobs FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins manage jobs" ON public.jobs FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== NEWS / NOTICES ==========
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'general', -- general, school, madrasa, government, urgent
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published news" ON public.news FOR SELECT USING (is_published = true);
CREATE POLICY "Mods manage news" ON public.news FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== EMERGENCY CONTACTS ==========
CREATE TABLE public.emergency_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL, -- police, fire, ambulance, hotline
  description TEXT,
  priority INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read emergency" ON public.emergency_contacts FOR SELECT USING (true);
CREATE POLICY "Admins manage emergency" ON public.emergency_contacts FOR ALL USING (public.is_admin_or_above(auth.uid()));

-- ========== COMPLAINTS ==========
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- road, drain, electricity, other
  image_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, reviewing, resolved, rejected
  is_anonymous BOOLEAN DEFAULT false,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES auth.users(id),
  review_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own complaints" ON public.complaints FOR SELECT USING (auth.uid() = submitted_by);
CREATE POLICY "Users create complaints" ON public.complaints FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Admins manage complaints" ON public.complaints FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== EVENTS ==========
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT, -- tournament, social, waz, cultural
  event_date DATE,
  event_time TEXT,
  location TEXT,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved events" ON public.events FOR SELECT USING (is_approved = true);
CREATE POLICY "Users create events" ON public.events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Admins manage events" ON public.events FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== BLOOD DONORS ==========
CREATE TABLE public.blood_donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL, -- A+, A-, B+, B-, AB+, AB-, O+, O-
  phone TEXT NOT NULL,
  location TEXT,
  last_donation_date DATE,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read available donors" ON public.blood_donors FOR SELECT USING (is_available = true);
CREATE POLICY "Users register as donor" ON public.blood_donors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own donor info" ON public.blood_donors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins manage donors" ON public.blood_donors FOR ALL USING (public.is_admin_or_above(auth.uid()));

-- ========== ISLAMIC CORNER ==========
CREATE TABLE public.islamic_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- prayer_time, hadith, khutba, mosque
  title TEXT,
  content TEXT,
  source TEXT,
  date DATE DEFAULT CURRENT_DATE,
  extra_data JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.islamic_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read islamic" ON public.islamic_content FOR SELECT USING (true);
CREATE POLICY "Admins manage islamic" ON public.islamic_content FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== LOST AND FOUND ==========
CREATE TABLE public.lost_and_found (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'lost', -- lost, found
  location TEXT,
  image_url TEXT,
  contact_phone TEXT,
  status TEXT DEFAULT 'active', -- active, resolved
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.lost_and_found ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active items" ON public.lost_and_found FOR SELECT USING (status = 'active');
CREATE POLICY "Users create items" ON public.lost_and_found FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Owners update own" ON public.lost_and_found FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins manage lost_found" ON public.lost_and_found FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== ADVERTISEMENTS ==========
CREATE TABLE public.advertisements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT,
  link_url TEXT,
  placement TEXT DEFAULT 'banner', -- banner, sidebar, in_content
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  click_count INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active ads" ON public.advertisements FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage ads" ON public.advertisements FOR ALL USING (public.is_admin_or_above(auth.uid()));

-- ========== SAVED LISTINGS ==========
CREATE TABLE public.saved_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL, -- business, job, event, lost_found
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_id, item_type)
);
ALTER TABLE public.saved_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved" ON public.saved_listings FOR ALL USING (auth.uid() = user_id);

-- ========== MARKETPLACE ==========
CREATE TABLE public.marketplace (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- rent, land, vehicle, shop, agriculture
  price NUMERIC,
  price_type TEXT DEFAULT 'fixed', -- fixed, negotiable
  location TEXT,
  phone TEXT,
  image_url TEXT,
  is_approved BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active', -- active, sold, expired
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.marketplace ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read approved marketplace" ON public.marketplace FOR SELECT USING (is_approved = true AND status = 'active');
CREATE POLICY "Users create listings" ON public.marketplace FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Owners update own" ON public.marketplace FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins manage marketplace" ON public.marketplace FOR ALL USING (public.is_moderator_or_above(auth.uid()));

-- ========== DAILY CONTENT ==========
CREATE TABLE public.daily_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- quote, hadith, tip
  content TEXT NOT NULL,
  source TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.daily_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read daily" ON public.daily_content FOR SELECT USING (true);
CREATE POLICY "Admins manage daily" ON public.daily_content FOR ALL USING (public.is_admin_or_above(auth.uid()));

-- ========== UPDATED_AT TRIGGER ==========
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_complaints_updated_at BEFORE UPDATE ON public.complaints FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ========== STORAGE BUCKET ==========
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);
CREATE POLICY "Authenticated users upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Public read uploads" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Owners delete uploads" ON storage.objects FOR DELETE USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
