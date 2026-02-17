
-- Site settings table for dynamic app configuration
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read settings
CREATE POLICY "Public read settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Only admins can manage settings
CREATE POLICY "Admins manage settings"
  ON public.site_settings FOR ALL
  USING (is_admin_or_above(auth.uid()));

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.news;
ALTER PUBLICATION supabase_realtime ADD TABLE public.businesses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blood_donors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.complaints;
ALTER PUBLICATION supabase_realtime ADD TABLE public.marketplace;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;

-- Seed default settings
INSERT INTO public.site_settings (key, value) VALUES
  ('site_name', 'রামগঞ্জ ডিজিটাল সেবা'),
  ('site_subtitle', 'লক্ষ্মীপুর জেলা'),
  ('developer_name', 'RSF ROBIUL'),
  ('footer_text', 'রামগঞ্জ ডিজিটাল সেবা — লক্ষ্মীপুর জেলা'),
  ('app_version', 'v1.0.0'),
  ('admin_password', 'admin123'),
  ('contact_email', ''),
  ('contact_phone', '');
