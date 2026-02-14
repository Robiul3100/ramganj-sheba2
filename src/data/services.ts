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
  { id: 1, title: "রামগঞ্জ সম্পর্কে", slug: "about", icon: Info, status: "active", colorKey: "info", headerColor: "217 91% 50%" },
  { id: 2, title: "জরুরি কল", slug: "emergency-call", icon: Phone, status: "active", colorKey: "emergency", headerColor: "0 75% 55%" },
  { id: 3, title: "হাসপাতাল", slug: "hospital", icon: Building2, status: "active", colorKey: "health", headerColor: "152 60% 40%" },
  { id: 4, title: "রক্ত", slug: "blood", icon: Droplets, status: "active", colorKey: "blood", headerColor: "0 75% 50%" },
  { id: 5, title: "পুলিশ", slug: "police", icon: Shield, status: "active", colorKey: "police", headerColor: "240 50% 45%" },
  { id: 6, title: "অ্যাম্বুলেন্স", slug: "ambulance", icon: Truck, status: "active", colorKey: "ambulance", headerColor: "152 60% 40%" },
  { id: 7, title: "ডক্টর তালিকা", slug: "doctors", icon: Users, status: "active", colorKey: "doctor", headerColor: "180 50% 40%" },
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
  { id: 18, title: "বাসা ভাড়া", slug: "house-rent", icon: Home, status: "active", colorKey: "house", headerColor: "260 50% 45%" },
  { id: 19, title: "কৃষি ও খামার", slug: "agriculture", icon: Wheat, status: "active", colorKey: "agriculture", headerColor: "100 50% 40%" },
  { id: 20, title: "কুরিয়ার ও পার্সেল", slug: "courier", icon: Package, status: "active", colorKey: "courier", headerColor: "25 80% 45%" },
  { id: 21, title: "টিউশন মিডিয়া", slug: "tuition", icon: MonitorPlay, status: "active", colorKey: "tuition", headerColor: "200 50% 45%" },
  { id: 22, title: "খাবার ডেলিভারি", slug: "food-delivery", icon: UtensilsCrossed, status: "active", colorKey: "food", headerColor: "30 80% 45%" },
  { id: 23, title: "মেরামতি সেবা", slug: "repair", icon: Wrench, status: "active", colorKey: "repair", headerColor: "200 30% 45%" },
  { id: 24, title: "দলিল লেখক", slug: "document-writer", icon: FileText, status: "active", colorKey: "document", headerColor: "152 40% 40%" },
  // Coming soon (last 2)
  { id: 25, title: "ডেভেলপার তথ্য", slug: "developer", icon: Code, status: "coming_soon", colorKey: "developer", headerColor: "220 20% 45%" },
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

// রামগঞ্জ থানা ভিত্তিক ডাটা
export const sampleServiceData: Record<string, ServiceListItem[]> = {
  about: [
    { id: 1, name: "রামগঞ্জ উপজেলা পরিষদ", location: "রামগঞ্জ সদর, লক্ষ্মীপুর", type: "সরকারি", phone: "01700000001" },
    { id: 2, name: "রামগঞ্জ পৌরসভা", location: "পৌরসভা ভবন, রামগঞ্জ সদর", type: "সরকারি", phone: "01700000002" },
    { id: 3, name: "রামগঞ্জ ভূমি অফিস", location: "উপজেলা ভূমি অফিস, রামগঞ্জ", type: "সরকারি", phone: "01700000003" },
    { id: 4, name: "রামগঞ্জ ডাকঘর", location: "রামগঞ্জ সদর ডাকঘর", type: "সরকারি", phone: "01700000004" },
    { id: 5, name: "রামগঞ্জ উপজেলা নির্বাহী অফিসার", location: "ইউএনও অফিস, রামগঞ্জ", type: "সরকারি", phone: "01700000005" },
  ],
  hospital: [
    { id: 1, name: "রামগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স", location: "হাসপাতাল রোড, রামগঞ্জ সদর", type: "সরকারি", phone: "01700000010" },
    { id: 2, name: "রামগঞ্জ মা ও শিশু হাসপাতাল", location: "স্টেশন রোড, রামগঞ্জ", type: "বেসরকারি", phone: "01700000011" },
    { id: 3, name: "আল-আমিন ক্লিনিক", location: "কলেজ রোড, রামগঞ্জ সদর", type: "বেসরকারি", phone: "01700000012" },
    { id: 4, name: "রামগঞ্জ ডায়াগনস্টিক সেন্টার", location: "বাজার রোড, রামগঞ্জ", type: "বেসরকারি", phone: "01700000013" },
    { id: 5, name: "শেফা ক্লিনিক ও ডায়াগনস্টিক", location: "থানা রোড, রামগঞ্জ সদর", type: "বেসরকারি", phone: "01700000014" },
    { id: 6, name: "রামগঞ্জ পরিবার পরিকল্পনা কেন্দ্র", location: "উপজেলা পরিষদ সংলগ্ন", type: "সরকারি", phone: "01700000015" },
  ],
  "emergency-call": [
    { id: 1, name: "জাতীয় জরুরি সেবা", location: "পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স", phone: "999" },
    { id: 2, name: "জাতীয় তথ্য বাতায়ন", location: "সরকারি তথ্য ও সেবা", phone: "333" },
    { id: 3, name: "নারী ও শিশু নির্যাতন", location: "নারী ও শিশু নির্যাতন প্রতিরোধ", phone: "10921" },
    { id: 4, name: "দুদক হটলাইন", location: "দুর্নীতি সংক্রান্ত অভিযোগ", phone: "106" },
    { id: 5, name: "স্বাস্থ্য বাতায়ন", location: "স্বাস্থ্য সেবা তথ্য", phone: "16263" },
    { id: 6, name: "রামগঞ্জ থানা", location: "রামগঞ্জ থানা, লক্ষ্মীপুর", phone: "01700000030" },
    { id: 7, name: "রামগঞ্জ ফায়ার স্টেশন", location: "ফায়ার সার্ভিস, রামগঞ্জ", phone: "01700000031" },
  ],
  blood: [
    { id: 1, name: "মোঃ রবিউল ইসলাম", location: "রামগঞ্জ সদর, লক্ষ্মীপুর", phone: "01700000040", bloodGroup: "A+", canDonate: true },
    { id: 2, name: "মোঃ আরিফ হোসেন", location: "চন্দ্রগঞ্জ বাজার, রামগঞ্জ", phone: "01700000041", bloodGroup: "B+", canDonate: true },
    { id: 3, name: "ফাতেমা আক্তার", location: "কলেজ রোড, রামগঞ্জ", phone: "01700000042", bloodGroup: "O+", canDonate: true },
    { id: 4, name: "মোঃ কামরুল হাসান", location: "বাজার রোড, রামগঞ্জ সদর", phone: "01700000043", bloodGroup: "AB+", canDonate: false, date: "15 Mar, 2026" },
    { id: 5, name: "তানভীর আহমেদ", location: "স্টেশন রোড, রামগঞ্জ", phone: "01700000044", bloodGroup: "A-", canDonate: true },
    { id: 6, name: "সাদিয়া রহমান", location: "পৌরসভা এলাকা, রামগঞ্জ", phone: "01700000045", bloodGroup: "B-", canDonate: true },
    { id: 7, name: "মোঃ সোহেল রানা", location: "থানা রোড, রামগঞ্জ", phone: "01700000046", bloodGroup: "O-", canDonate: false, date: "20 Mar, 2026" },
  ],
  police: [
    { id: 1, name: "রামগঞ্জ থানা", location: "থানা রোড, রামগঞ্জ সদর", type: "থানা", phone: "01700000050" },
    { id: 2, name: "রামগঞ্জ হাইওয়ে পুলিশ ক্যাম্প", location: "ঢাকা-চট্টগ্রাম মহাসড়ক, রামগঞ্জ", type: "ক্যাম্প", phone: "01700000051" },
    { id: 3, name: "রামগঞ্জ তদন্ত কেন্দ্র", location: "উপজেলা পরিষদ সংলগ্ন", type: "তদন্ত", phone: "01700000052" },
    { id: 4, name: "ওসি, রামগঞ্জ থানা", location: "রামগঞ্জ থানা ভবন", type: "কর্মকর্তা", phone: "01700000053" },
  ],
  ambulance: [
    { id: 1, name: "রামগঞ্জ স্বাস্থ্য কমপ্লেক্স অ্যাম্বুলেন্স", location: "হাসপাতাল রোড, রামগঞ্জ", type: "সরকারি", phone: "01700000060" },
    { id: 2, name: "আল-আমিন অ্যাম্বুলেন্স সার্ভিস", location: "কলেজ রোড, রামগঞ্জ", type: "বেসরকারি", phone: "01700000061" },
    { id: 3, name: "জীবন রক্ষা অ্যাম্বুলেন্স", location: "রামগঞ্জ বাজার", type: "বেসরকারি", phone: "01700000062" },
    { id: 4, name: "রেড ক্রিসেন্ট অ্যাম্বুলেন্স", location: "রামগঞ্জ সদর", type: "স্বেচ্ছাসেবী", phone: "01700000063" },
  ],
  doctors: [
    { id: 1, name: "ডাঃ মোঃ আব্দুল করিম", location: "রামগঞ্জ স্বাস্থ্য কমপ্লেক্স", type: "মেডিসিন বিশেষজ্ঞ", phone: "01700000070" },
    { id: 2, name: "ডাঃ ফারহানা ইসলাম", location: "আল-আমিন ক্লিনিক, রামগঞ্জ", type: "গাইনি বিশেষজ্ঞ", phone: "01700000071" },
    { id: 3, name: "ডাঃ মোঃ রফিকুল ইসলাম", location: "শেফা ক্লিনিক, রামগঞ্জ", type: "শিশু বিশেষজ্ঞ", phone: "01700000072" },
    { id: 4, name: "ডাঃ সালমা বেগম", location: "রামগঞ্জ ডায়াগনস্টিক সেন্টার", type: "চক্ষু বিশেষজ্ঞ", phone: "01700000073" },
    { id: 5, name: "ডাঃ মোঃ জাহিদ হাসান", location: "মা ও শিশু হাসপাতাল, রামগঞ্জ", type: "সার্জারি বিশেষজ্ঞ", phone: "01700000074" },
    { id: 6, name: "ডাঃ নাজমুল হক", location: "রামগঞ্জ সদর, কলেজ রোড", type: "হৃদরোগ বিশেষজ্ঞ", phone: "01700000075" },
  ],
  pharmacy: [
    { id: 1, name: "রামগঞ্জ মডেল ফার্মেসি", location: "বাজার রোড, রামগঞ্জ সদর", type: "মডেল ফার্মেসি", phone: "01700000080" },
    { id: 2, name: "স্কয়ার ফার্মেসি", location: "কলেজ রোড, রামগঞ্জ", type: "চেইন ফার্মেসি", phone: "01700000081" },
    { id: 3, name: "লাজপুর ফার্মেসি", location: "লাজপুর বাজার, রামগঞ্জ", type: "সাধারণ", phone: "01700000082" },
    { id: 4, name: "সেবা ফার্মেসি", location: "থানা রোড, রামগঞ্জ সদর", type: "সাধারণ", phone: "01700000083" },
    { id: 5, name: "জনতা মেডিকেল হল", location: "স্টেশন রোড, রামগঞ্জ", type: "সাধারণ", phone: "01700000084" },
  ],
  electricity: [
    { id: 1, name: "রামগঞ্জ পল্লী বিদ্যুৎ অফিস", location: "উপজেলা রোড, রামগঞ্জ সদর", type: "পল্লী বিদ্যুৎ", phone: "01700000090" },
    { id: 2, name: "বিদ্যুৎ বিল পরিশোধ কেন্দ্র", location: "বাজার রোড, রামগঞ্জ", type: "বিল কেন্দ্র", phone: "01700000091" },
    { id: 3, name: "রামগঞ্জ ইলেকট্রিক সাব-স্টেশন", location: "রামগঞ্জ-লক্ষ্মীপুর সড়ক", type: "সাব-স্টেশন", phone: "01700000092" },
  ],
  "fire-service": [
    { id: 1, name: "রামগঞ্জ ফায়ার সার্ভিস ও সিভিল ডিফেন্স", location: "থানা রোড, রামগঞ্জ সদর", type: "সরকারি", phone: "01700000100" },
    { id: 2, name: "ফায়ার সার্ভিস হটলাইন", location: "জরুরি যোগাযোগ", type: "হটলাইন", phone: "199" },
  ],
  transport: [
    { id: 1, name: "রামগঞ্জ বাস স্ট্যান্ড", location: "রামগঞ্জ সদর বাস টার্মিনাল", type: "বাস", phone: "01700000110" },
    { id: 2, name: "ঢাকা-রামগঞ্জ বাস সার্ভিস", location: "সায়দাবাদ টু রামগঞ্জ", type: "আন্তঃজেলা", phone: "01700000111" },
    { id: 3, name: "রামগঞ্জ-লক্ষ্মীপুর বাস সার্ভিস", location: "প্রতি ঘণ্টায় বাস ছাড়ে", type: "জেলা", phone: "01700000112" },
    { id: 4, name: "রামগঞ্জ অটো-রিকশা স্ট্যান্ড", location: "রামগঞ্জ বাজার", type: "অটো-রিকশা", phone: "01700000113" },
    { id: 5, name: "রামগঞ্জ সিএনজি স্ট্যান্ড", location: "বাস স্ট্যান্ড সংলগ্ন", type: "সিএনজি", phone: "01700000114" },
  ],
  education: [
    { id: 1, name: "রামগঞ্জ সরকারি কলেজ", location: "কলেজ রোড, রামগঞ্জ সদর", type: "কলেজ", phone: "01700000120" },
    { id: 2, name: "রামগঞ্জ পাইলট উচ্চ বিদ্যালয়", location: "স্কুল রোড, রামগঞ্জ", type: "উচ্চ বিদ্যালয়", phone: "01700000121" },
    { id: 3, name: "রামগঞ্জ বালিকা উচ্চ বিদ্যালয়", location: "পৌরসভা এলাকা, রামগঞ্জ", type: "বালিকা বিদ্যালয়", phone: "01700000122" },
    { id: 4, name: "রামগঞ্জ কামিল মাদ্রাসা", location: "মাদ্রাসা রোড, রামগঞ্জ", type: "মাদ্রাসা", phone: "01700000123" },
    { id: 5, name: "রামগঞ্জ সরকারি প্রাথমিক বিদ্যালয়", location: "রামগঞ্জ সদর", type: "প্রাথমিক", phone: "01700000124" },
    { id: 6, name: "রামগঞ্জ টেকনিক্যাল স্কুল", location: "উপজেলা রোড, রামগঞ্জ", type: "কারিগরি", phone: "01700000125" },
  ],
  tourism: [
    { id: 1, name: "রামগঞ্জ জমিদার বাড়ি", location: "পুরাতন রামগঞ্জ, লক্ষ্মীপুর", type: "ঐতিহাসিক", phone: "01700000130" },
    { id: 2, name: "রামগঞ্জ শাহী মসজিদ", location: "রামগঞ্জ সদর", type: "ধর্মীয় স্থাপনা", phone: "01700000131" },
    { id: 3, name: "চন্দ্রগঞ্জ নদীর তীর", location: "চন্দ্রগঞ্জ, রামগঞ্জ", type: "প্রাকৃতিক", phone: "01700000132" },
    { id: 4, name: "রামগঞ্জ পুরাতন দুর্গ", location: "রামগঞ্জ সদর", type: "প্রত্নতাত্ত্বিক", phone: "01700000133" },
  ],
  jobs: [
    { id: 1, name: "প্রাথমিক বিদ্যালয়ে শিক্ষক নিয়োগ", location: "রামগঞ্জ উপজেলা শিক্ষা অফিস", type: "সরকারি", date: "28 Feb, 2026", description: "রামগঞ্জ উপজেলায় প্রাথমিক বিদ্যালয়ে সহকারী শিক্ষক পদে নিয়োগ বিজ্ঞপ্তি প্রকাশিত হয়েছে..." },
    { id: 2, name: "কম্পিউটার অপারেটর নিয়োগ", location: "রামগঞ্জ পৌরসভা কার্যালয়", type: "সরকারি", date: "15 Mar, 2026", description: "রামগঞ্জ পৌরসভায় কম্পিউটার অপারেটর পদে জরুরি ভিত্তিতে লোক নিয়োগ করা হবে..." },
    { id: 3, name: "সেলস এক্সিকিউটিভ", location: "রামগঞ্জ বাজার", type: "বেসরকারি", date: "10 Mar, 2026", description: "স্থানীয় প্রতিষ্ঠানে অভিজ্ঞ সেলস এক্সিকিউটিভ প্রয়োজন। যোগ্যতা: এইচএসসি পাস..." },
    { id: 4, name: "ফার্মেসি সহকারী", location: "রামগঞ্জ মডেল ফার্মেসি", type: "বেসরকারি", date: "20 Mar, 2026", description: "অভিজ্ঞ ফার্মেসি সহকারী নিয়োগ দেওয়া হবে। ফার্মেসি কোর্স সম্পন্ন প্রার্থীদের অগ্রাধিকার..." },
  ],
  legal: [
    { id: 1, name: "অ্যাডভোকেট মোঃ আনোয়ার হোসেন", location: "রামগঞ্জ আদালত চত্বর", type: "আইনজীবী", phone: "01700000150" },
    { id: 2, name: "অ্যাডভোকেট ফাহমিদা সুলতানা", location: "রামগঞ্জ বার কাউন্সিল", type: "আইনজীবী", phone: "01700000151" },
    { id: 3, name: "রামগঞ্জ জজ কোর্ট", location: "আদালত রোড, রামগঞ্জ সদর", type: "আদালত", phone: "01700000152" },
    { id: 4, name: "অ্যাডভোকেট মোঃ কামরুজ্জামান", location: "কলেজ রোড, রামগঞ্জ", type: "আইনজীবী", phone: "01700000153" },
  ],
  shops: [
    { id: 1, name: "রামগঞ্জ সুপার মার্কেট", location: "বাজার রোড, রামগঞ্জ সদর", type: "সুপার শপ", phone: "01700000160" },
    { id: 2, name: "আল-মদিনা ক্লথ হাউস", location: "রামগঞ্জ বাজার", type: "কাপড়ের দোকান", phone: "01700000161" },
    { id: 3, name: "রামগঞ্জ ইলেকট্রনিক্স", location: "কলেজ রোড, রামগঞ্জ", type: "ইলেকট্রনিক্স", phone: "01700000162" },
    { id: 4, name: "নিউ ফ্যাশন টেইলার্স", location: "থানা রোড, রামগঞ্জ", type: "দর্জি", phone: "01700000163" },
    { id: 5, name: "জনতা ফার্নিচার হাউস", location: "স্টেশন রোড, রামগঞ্জ", type: "ফার্নিচার", phone: "01700000164" },
    { id: 6, name: "রামগঞ্জ বুক স্টোর", location: "স্কুল রোড, রামগঞ্জ সদর", type: "বইয়ের দোকান", phone: "01700000165" },
  ],
  donation: [
    { id: 1, name: "রামগঞ্জ এতিমখানা", location: "রামগঞ্জ সদর", type: "এতিমখানা", phone: "01700000170" },
    { id: 2, name: "রামগঞ্জ দরিদ্র সহায়তা ফাউন্ডেশন", location: "পৌরসভা এলাকা", type: "সংস্থা", phone: "01700000171" },
    { id: 3, name: "আল-ফালাহ ইসলামিক ফাউন্ডেশন", location: "রামগঞ্জ সদর", type: "ইসলামিক সংস্থা", phone: "01700000172" },
    { id: 4, name: "রামগঞ্জ শিক্ষা সহায়তা ট্রাস্ট", location: "কলেজ রোড, রামগঞ্জ", type: "শিক্ষা ট্রাস্ট", phone: "01700000173" },
  ],
  "house-rent": [
    { id: 1, name: "২ বেডরুম ফ্ল্যাট ভাড়া", location: "কলেজ রোড, রামগঞ্জ সদর", type: "ফ্ল্যাট", phone: "01700000180", description: "২ বেডরুম, ১ বাথরুম, রান্নাঘর সহ। ভাড়া: ৫,০০০ টাকা/মাস" },
    { id: 2, name: "৩ বেডরুম বাসা ভাড়া", location: "পৌরসভা এলাকা, রামগঞ্জ", type: "বাসা", phone: "01700000181", description: "৩ বেডরুম, ২ বাথরুম, গ্যারেজ সহ। ভাড়া: ৮,০০০ টাকা/মাস" },
    { id: 3, name: "দোকান ঘর ভাড়া", location: "রামগঞ্জ বাজার", type: "দোকান", phone: "01700000182", description: "বাজারের মূল সড়কে দোকান ঘর। ভাড়া: ৩,০০০ টাকা/মাস" },
    { id: 4, name: "মেস রুম ভাড়া", location: "স্কুল রোড, রামগঞ্জ", type: "মেস", phone: "01700000183", description: "ছাত্রদের জন্য মেস রুম। সিট ভাড়া: ১,৫০০ টাকা/মাস" },
    { id: 5, name: "অফিস স্পেস ভাড়া", location: "থানা রোড, রামগঞ্জ সদর", type: "অফিস", phone: "01700000184", description: "বাণিজ্যিক অফিস স্পেস, ২০০ বর্গফুট। ভাড়া: ৬,০০০ টাকা/মাস" },
  ],
  agriculture: [
    { id: 1, name: "রামগঞ্জ কৃষি অফিস", location: "উপজেলা কৃষি অফিস, রামগঞ্জ", type: "সরকারি", phone: "01700000190" },
    { id: 2, name: "রামগঞ্জ মৎস্য অফিস", location: "মৎস্য অফিস, রামগঞ্জ সদর", type: "সরকারি", phone: "01700000191" },
    { id: 3, name: "রামগঞ্জ প্রাণিসম্পদ অফিস", location: "প্রাণিসম্পদ অফিস, রামগঞ্জ", type: "সরকারি", phone: "01700000192" },
    { id: 4, name: "মুরগির খামার — রামগঞ্জ পোল্ট্রি ফার্ম", location: "চন্দ্রগঞ্জ, রামগঞ্জ", type: "পোল্ট্রি", phone: "01700000193" },
    { id: 5, name: "সার ও বীজ বিক্রয় কেন্দ্র", location: "রামগঞ্জ বাজার", type: "কৃষি উপকরণ", phone: "01700000194" },
  ],
  courier: [
    { id: 1, name: "সুন্দরবন কুরিয়ার — রামগঞ্জ শাখা", location: "বাজার রোড, রামগঞ্জ সদর", type: "কুরিয়ার", phone: "01700000200" },
    { id: 2, name: "এসএ পরিবহন — রামগঞ্জ", location: "বাস স্ট্যান্ড, রামগঞ্জ", type: "পার্সেল", phone: "01700000201" },
    { id: 3, name: "কন্টিনেন্টাল কুরিয়ার — রামগঞ্জ", location: "কলেজ রোড, রামগঞ্জ", type: "কুরিয়ার", phone: "01700000202" },
    { id: 4, name: "পাঠাও পার্সেল পয়েন্ট", location: "রামগঞ্জ বাজার", type: "ই-কমার্স ডেলিভারি", phone: "01700000203" },
  ],
  tuition: [
    { id: 1, name: "রামগঞ্জ কোচিং সেন্টার", location: "কলেজ রোড, রামগঞ্জ সদর", type: "কোচিং", phone: "01700000210" },
    { id: 2, name: "ইংলিশ স্পোকেন ক্লাস", location: "স্কুল রোড, রামগঞ্জ", type: "ভাষা", phone: "01700000211" },
    { id: 3, name: "গণিত ও বিজ্ঞান প্রাইভেট টিউটর", location: "রামগঞ্জ সদর", type: "প্রাইভেট", phone: "01700000212" },
    { id: 4, name: "কম্পিউটার ট্রেনিং সেন্টার", location: "থানা রোড, রামগঞ্জ", type: "কম্পিউটার", phone: "01700000213" },
    { id: 5, name: "আরবি ও কুরআন শিক্ষা কেন্দ্র", location: "মাদ্রাসা রোড, রামগঞ্জ", type: "ধর্মীয়", phone: "01700000214" },
  ],
  "food-delivery": [
    { id: 1, name: "রামগঞ্জ বিরিয়ানি হাউস", location: "বাজার রোড, রামগঞ্জ সদর", type: "রেস্তোরাঁ", phone: "01700000220" },
    { id: 2, name: "তৃপ্তি ফুড কর্নার", location: "কলেজ রোড, রামগঞ্জ", type: "ফাস্ট ফুড", phone: "01700000221" },
    { id: 3, name: "হোম মেড ফুড ডেলিভারি", location: "রামগঞ্জ সদর", type: "হোম কুকিং", phone: "01700000222" },
    { id: 4, name: "চা ও নাস্তা ঘর", location: "থানা রোড, রামগঞ্জ", type: "চা-নাস্তা", phone: "01700000223" },
    { id: 5, name: "রামগঞ্জ মিষ্টি ঘর", location: "রামগঞ্জ বাজার", type: "মিষ্টি", phone: "01700000224" },
  ],
  repair: [
    { id: 1, name: "রামগঞ্জ মোবাইল সার্ভিস", location: "বাজার রোড, রামগঞ্জ সদর", type: "মোবাইল মেরামত", phone: "01700000230" },
    { id: 2, name: "ইলেকট্রনিক রিপেয়ার সেন্টার", location: "কলেজ রোড, রামগঞ্জ", type: "ইলেকট্রনিক্স", phone: "01700000231" },
    { id: 3, name: "রামগঞ্জ বাইক সার্ভিসিং", location: "স্টেশন রোড, রামগঞ্জ", type: "বাইক মেরামত", phone: "01700000232" },
    { id: 4, name: "প্লাম্বিং ও ইলেকট্রিক সেবা", location: "রামগঞ্জ সদর", type: "গৃহ মেরামত", phone: "01700000233" },
  ],
  "document-writer": [
    { id: 1, name: "রামগঞ্জ দলিল লেখক সমিতি", location: "আদালত চত্বর, রামগঞ্জ", type: "দলিল লেখক", phone: "01700000240" },
    { id: 2, name: "মোঃ আমিনুল ইসলাম — দলিল লেখক", location: "রামগঞ্জ ভূমি অফিস সংলগ্ন", type: "দলিল লেখক", phone: "01700000241" },
    { id: 3, name: "রামগঞ্জ নোটারি পাবলিক", location: "আদালত রোড, রামগঞ্জ", type: "নোটারি", phone: "01700000242" },
    { id: 4, name: "মোঃ সাইফুল ইসলাম — কম্পিউটার কম্পোজ", location: "থানা রোড, রামগঞ্জ সদর", type: "কম্পিউটার কম্পোজ", phone: "01700000243" },
  ],
};
