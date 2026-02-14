import {
  Info, Phone, Building2, Droplets, Shield, Truck, Users, Pill,
  Zap, Flame, Bus, GraduationCap, Umbrella, Briefcase, Scale, Store,
  Heart, Code, Home, Wheat, Package, MonitorPlay, UtensilsCrossed, Wrench, FileText, HeartHandshake
} from "lucide-react";

export type ServiceStatus = "active" | "coming_soon";

export interface Service {
  id: number;
  title: string;
  slug: string;
  icon: typeof Info;
  status: ServiceStatus;
  colorKey: string;
  headerColor: string;
  description?: string;
}

export const services: Service[] = [
  { id: 1, title: "পাথরঘাটা সম্পর্কে", slug: "about", icon: Info, status: "active", colorKey: "info", headerColor: "217 91% 50%" },
  { id: 2, title: "জরুরি কল", slug: "emergency-call", icon: Phone, status: "active", colorKey: "emergency", headerColor: "0 75% 55%" },
  { id: 3, title: "হাসপাতাল", slug: "hospital", icon: Building2, status: "active", colorKey: "health", headerColor: "152 60% 40%" },
  { id: 4, title: "রক্ত", slug: "blood", icon: Droplets, status: "active", colorKey: "blood", headerColor: "0 75% 50%" },
  { id: 5, title: "পুলিশ", slug: "police", icon: Shield, status: "active", colorKey: "police", headerColor: "240 50% 45%" },
  { id: 6, title: "অ্যাম্বুলেন্স", slug: "ambulance", icon: Truck, status: "active", colorKey: "ambulance", headerColor: "152 60% 40%" },
  { id: 7, title: "ডক্টার তালিকা", slug: "doctors", icon: Users, status: "active", colorKey: "doctor", headerColor: "180 50% 40%" },
  { id: 8, title: "ফার্মেসি", slug: "pharmacy", icon: Pill, status: "active", colorKey: "pharmacy", headerColor: "340 60% 45%" },
  { id: 9, title: "বিদ্যুৎ অফিস", slug: "electricity", icon: Zap, status: "active", colorKey: "electric", headerColor: "45 90% 50%" },
  { id: 10, title: "ফায়ার সার্ভিস", slug: "fire-service", icon: Flame, status: "active", colorKey: "fire", headerColor: "15 85% 50%" },
  { id: 11, title: "যাতায়াত", slug: "transport", icon: Bus, status: "active", colorKey: "transport", headerColor: "210 50% 45%" },
  { id: 12, title: "শিক্ষা", slug: "education", icon: GraduationCap, status: "active", colorKey: "education", headerColor: "152 50% 40%" },
  { id: 13, title: "পর্যটন", slug: "tourism", icon: Umbrella, status: "active", colorKey: "tourism", headerColor: "200 70% 45%" },
  { id: 14, title: "চাকরি", slug: "jobs", icon: Briefcase, status: "active", colorKey: "job", headerColor: "217 80% 45%" },
  { id: 15, title: "আইনি সহায়তা", slug: "legal", icon: Scale, status: "active", colorKey: "legal", headerColor: "270 50% 45%" },
  { id: 16, title: "দোকান", slug: "shops", icon: Store, status: "active", colorKey: "shop", headerColor: "340 70% 45%" },
  { id: 17, title: "অনুদান", slug: "donation", icon: HeartHandshake, status: "active", colorKey: "donation", headerColor: "340 60% 45%" },
  // Coming soon
  { id: 18, title: "ডেভেলপার তথ্য", slug: "developer", icon: Code, status: "coming_soon", colorKey: "developer", headerColor: "220 20% 45%" },
  { id: 19, title: "বাসা ভাড়া", slug: "house-rent", icon: Home, status: "coming_soon", colorKey: "house", headerColor: "260 50% 45%" },
  { id: 20, title: "কৃষি ও খামার", slug: "agriculture", icon: Wheat, status: "coming_soon", colorKey: "agriculture", headerColor: "100 50% 40%" },
  { id: 21, title: "কুরিয়ার ও পার্সেল", slug: "courier", icon: Package, status: "coming_soon", colorKey: "courier", headerColor: "25 80% 45%" },
  { id: 22, title: "টিউশন মিডিয়া", slug: "tuition", icon: MonitorPlay, status: "coming_soon", colorKey: "tuition", headerColor: "200 50% 45%" },
  { id: 23, title: "খাবার ডেলিভারি", slug: "food-delivery", icon: UtensilsCrossed, status: "coming_soon", colorKey: "food", headerColor: "30 80% 45%" },
  { id: 24, title: "মেরামতি সেবা", slug: "repair", icon: Wrench, status: "coming_soon", colorKey: "repair", headerColor: "200 30% 45%" },
  { id: 25, title: "দলিল লেখক", slug: "document-writer", icon: FileText, status: "coming_soon", colorKey: "document", headerColor: "152 40% 40%" },
  { id: 26, title: "বিবাহ মিডিয়া", slug: "marriage", icon: Heart, status: "coming_soon", colorKey: "marriage", headerColor: "340 65% 45%" },
];

export const activeServices = services.filter(s => s.status === "active");
export const comingSoonServices = services.filter(s => s.status === "coming_soon");

export interface ServiceListItem {
  id: number;
  name: string;
  location: string;
  type?: string;
  phone?: string;
  image?: string;
  description?: string;
  date?: string;
  bloodGroup?: string;
  canDonate?: boolean;
}

// Sample data for service detail pages
export const sampleServiceData: Record<string, ServiceListItem[]> = {
  hospital: [
    { id: 1, name: "পাথরঘাটা সৌদি প্রবাসী হাসপাতাল", location: "হাসপাতাল সড়ক", type: "বেসরকারি", phone: "01700000001" },
    { id: 2, name: "মেডিকেয়ার", location: "কেন্দ্রীয় জামের মসজিদের সামনে হসপিটাল সড়ক", type: "বেসরকারি", phone: "01700000002" },
    { id: 3, name: "স্কয়ার ডায়াগনস্টিক", location: "পাথরঘাটা সিনিয়র জুডিশিয়াল ম্যাজিস্ট্রেট কোর্ড বরগুনা গেটের সামনে", type: "বেসরকারি", phone: "01700000003" },
  ],
  "emergency-call": [
    { id: 1, name: "জাতীয় জরুরি সেবা", location: "পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স", phone: "999" },
    { id: 2, name: "জাতীয় তথ্য বাতায়ন", location: "সরকারি তথ্য ও সেবা", phone: "333" },
    { id: 3, name: "নারী ও শিশু নির্যাতন", location: "নারী ও শিশু নির্যাতন প্রতিরোধ", phone: "10921" },
    { id: 4, name: "দুদক হটলাইন", location: "দুর্নীতি সংক্রান্ত অভিযোগ", phone: "106" },
  ],
  blood: [
    { id: 1, name: "মোঃ রাজা", location: "কালমেঘা, কাঁকুর বাজার।", phone: "01700000010", bloodGroup: "A+", canDonate: true },
    { id: 2, name: "Md Ebrahim Hosen", location: "Patharghata Upazila Ward No. 1", phone: "01700000011", bloodGroup: "A+", canDonate: false, date: "30 Mar, 2026" },
    { id: 3, name: "তাহসিন আজাদ", location: "পাথরঘাটা এক নং ওয়ার্ড", phone: "01700000012", bloodGroup: "B+", canDonate: true },
  ],
  shops: [
    { id: 1, name: "সোহেল টেইলার্স", location: "পাল পট্টি মদনমোহন বস্ত্রালয়ের সামনে।", type: "দর্জি", phone: "01700000020" },
    { id: 2, name: "দি বিউটি মার্ক", location: "পাথরঘাটা উপজেলা গেটে এর সামনে", type: "জেন্টস পার্লার", phone: "01700000021" },
    { id: 3, name: "স্বপ্নপূরণ", location: "গোলচত্বর সংলগ্ন সদর রোড, পাথরঘাটা, বরগুনা", type: "সুপার শপ", phone: "01700000022" },
  ],
  jobs: [
    { id: 1, name: "অভিজ্ঞ PHP ওয়েবসাইট ডেভেলপার", location: "পাথরঘাটা শপ", type: "বেসরকারি", date: "31 Jan, 2026", description: "আমাদের প্রতিষ্ঠানের জন্য একজন অভিজ্ঞ ও দক্ষ PHP ওয়েবসাইট ডেভেলপা..." },
    { id: 2, name: "অভিজ্ঞ অ্যান্ড্রয়েড অ্যাপ্লিকেশন...", location: "পাথরঘাটা শপ", type: "বেসরকারি", date: "31 Jan, 2026", description: "আমাদের প্রতিষ্ঠানের জন্য একজন অভিজ্ঞ ও দক্ষ অ্যান্ড্রয়েড অ্যাপ্লিকেশন ডেভেলপার নিয়োগ..." },
  ],
};
