import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Car,
  ChevronDown,
  ChevronUp,
  Clock,
  Hotel,
  MapPin,
  Menu,
  MessageCircle,
  PackageIcon,
  Phone,
  Plane,
  Settings,
  Shield,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────────

const WHATSAPP = "917319076862";

function waLink(msg: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

const HERO_SLIDES = [
  {
    src: "/assets/generated/darjeeling-bg.dim_1920x1080.jpg",
    label: "Darjeeling",
  },
  { src: "/assets/generated/bhutan-bg.dim_1920x1080.jpg", label: "Bhutan" },
  { src: "/assets/generated/sikkim-bg.dim_1920x1080.jpg", label: "Sikkim" },
  { src: "/assets/generated/kashmir-bg.dim_1920x1080.jpg", label: "Kashmir" },
];

interface TourPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: string;
  priceNote: string;
  pickup: string;
  highlight: string;
  itinerary: { day: string; title: string; details: string }[];
}

const PACKAGES: TourPackage[] = [
  {
    id: "bhutan-group",
    name: "Bhutan Group Tour",
    destination: "Bhutan",
    duration: "6N / 7D",
    price: "₹24,500",
    priceNote: "per person",
    pickup: "Bagdogra Airport / NJP Station",
    highlight: "Tiger's Nest Monastery & Punakha Dzong",
    itinerary: [
      {
        day: "Day 1",
        title: "Pickup → Phuentsholing",
        details:
          "Pickup from Bagdogra Airport or NJP Station → drive to Phuentsholing. Check-in, local sightseeing: Zangto Pelri Lhakhang, Karbandi Monastery. Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing → Thimphu",
        details:
          "Drive to Thimphu (capital city). Visit Buddha Dordenma Statue, Takin Preserve, Memorial Chorten, Changangkha Lhakhang, Folk Heritage Museum. Overnight stay in Thimphu.",
      },
      {
        day: "Day 3",
        title: "Thimphu Sightseeing",
        details:
          "Visit Dochula Pass (108 chortens & Himalayan views), National Museum, Tashichho Dzong, Simply Bhutan Museum. Evening: local market. Overnight stay in Thimphu.",
      },
      {
        day: "Day 4",
        title: "Thimphu → Punakha",
        details:
          "Drive to Punakha valley. Visit Punakha Dzong (historical fortress), Chimi Lhakhang Fertility Temple, Suspension Bridge, Mo Chhu River. Overnight stay in Punakha.",
      },
      {
        day: "Day 5",
        title: "Punakha → Paro",
        details:
          "Drive to Paro. Visit Rinpung Dzong, National Museum of Paro, Paro Town Market. Evening stroll along Paro Chhu river. Overnight stay in Paro.",
      },
      {
        day: "Day 6",
        title: "Tiger's Nest Hike",
        details:
          "Early morning hike to Taktsang Palphug Monastery (Tiger's Nest) – one of Bhutan's most iconic sites. Also visit Drukgyel Dzong ruins, Kyichu Lhakhang. Overnight stay in Paro.",
      },
      {
        day: "Day 7",
        title: "Paro → Drop",
        details:
          "After breakfast, drive back to the border. Drop at Bagdogra Airport or NJP Station. Tour ends with wonderful memories.",
      },
    ],
  },
  {
    id: "bhutan-private",
    name: "Bhutan Private Tour",
    destination: "Bhutan",
    duration: "6N / 7D",
    price: "₹43,000",
    priceNote: "per person",
    pickup: "Bagdogra Airport / NJP Station",
    highlight: "Private Vehicle & Personalised Service",
    itinerary: [
      {
        day: "Day 1",
        title: "Pickup → Phuentsholing",
        details:
          "Private pickup from Bagdogra Airport or NJP Station → drive to Phuentsholing. Check-in, local sightseeing: Zangto Pelri Lhakhang, Karbandi Monastery. Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing → Thimphu",
        details:
          "Private drive to Thimphu. Visit Buddha Dordenma Statue, Takin Preserve, Memorial Chorten, Changangkha Lhakhang, Folk Heritage Museum. Overnight stay in Thimphu.",
      },
      {
        day: "Day 3",
        title: "Thimphu Sightseeing",
        details:
          "Visit Dochula Pass (108 chortens), National Museum, Tashichho Dzong, Simply Bhutan Museum. Flexible itinerary as per your schedule. Overnight stay in Thimphu.",
      },
      {
        day: "Day 4",
        title: "Thimphu → Punakha",
        details:
          "Private drive to Punakha. Visit Punakha Dzong, Chimi Lhakhang Fertility Temple, Suspension Bridge, Mo Chhu River. Overnight stay in Punakha.",
      },
      {
        day: "Day 5",
        title: "Punakha → Paro",
        details:
          "Private drive to Paro. Visit Rinpung Dzong, National Museum, Paro Town Market. Overnight stay in Paro.",
      },
      {
        day: "Day 6",
        title: "Tiger's Nest Hike",
        details:
          "Hike to Taktsang Palphug Monastery (Tiger's Nest). Visit Drukgyel Dzong ruins, Kyichu Lhakhang. Personalized pace. Overnight stay in Paro.",
      },
      {
        day: "Day 7",
        title: "Paro → Drop",
        details:
          "After breakfast, private vehicle drop at Bagdogra Airport or NJP Station. Tour concludes with exceptional memories.",
      },
    ],
  },
  {
    id: "darjeeling",
    name: "Darjeeling Tour",
    destination: "Darjeeling",
    duration: "4N / 5D",
    price: "₹8,500",
    priceNote: "per person",
    pickup: "NJP / Bagdogra Airport",
    highlight: "Tiger Hill Sunrise & Tea Gardens",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Darjeeling",
        details:
          "Pickup from NJP Station or Bagdogra Airport. Drive to Darjeeling through scenic mountain roads. Check-in and evening leisure. Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Tiger Hill & Monasteries",
        details:
          "Early morning (4am) visit to Tiger Hill for stunning Kanchenjunga & Everest sunrise. Visit Batasia Loop, Ghoom Monastery (oldest in Darjeeling), Peace Pagoda. Overnight stay.",
      },
      {
        day: "Day 3",
        title: "Tea Gardens & Attractions",
        details:
          "Visit Happy Valley Tea Estate, Himalayan Mountaineering Institute, Padmaja Naidu Zoological Park, Ropeway ride for aerial views. Overnight stay.",
      },
      {
        day: "Day 4",
        title: "Rock Garden & Shopping",
        details:
          "Visit Rock Garden (beautiful waterfalls & rock formations), Ganga Maya Park, Chowrasta Mall Road. Local market shopping. Overnight stay.",
      },
      {
        day: "Day 5",
        title: "Departure",
        details:
          "After breakfast, checkout and drive back to NJP Station or Bagdogra Airport. Tour ends.",
      },
    ],
  },
  {
    id: "sikkim",
    name: "Sikkim Tour",
    destination: "Sikkim",
    duration: "5N / 6D",
    price: "₹12,000",
    priceNote: "per person",
    pickup: "NJP / Bagdogra Airport",
    highlight: "Tsomgo Lake & Nathula Pass",
    itinerary: [
      {
        day: "Day 1",
        title: "NJP → Gangtok",
        details:
          "Pickup from NJP Station or Bagdogra Airport. Drive to Gangtok, the capital of Sikkim. Check-in and evening visit to MG Marg. Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Tsomgo & Nathula",
        details:
          "Visit Tsomgo Lake (glacial lake at 12,400 ft), Baba Mandir (soldier shrine), Nathula Pass (India-China border, permit required). Overnight stay in Gangtok.",
      },
      {
        day: "Day 3",
        title: "Gangtok Monasteries",
        details:
          "Visit Rumtek Monastery (largest in Sikkim), Enchey Monastery, Do-Drul Chorten stupa. Evening: Lal Bazaar shopping. Overnight stay.",
      },
      {
        day: "Day 4",
        title: "Gangtok → Pelling",
        details:
          "Drive to Pelling. Visit Rabdentse Ruins (ancient Sikkim capital), Pemayangtse Monastery (one of the oldest in Sikkim). Overnight stay in Pelling.",
      },
      {
        day: "Day 5",
        title: "Khecheopalri & Singshore",
        details:
          "Visit Khecheopalri Lake (sacred wish-fulfilling lake), Singshore Bridge (highest bridge in Sikkim, 98m). Overnight stay in Pelling.",
      },
      {
        day: "Day 6",
        title: "Pelling → NJP",
        details:
          "After breakfast, drive back to NJP Station or Bagdogra Airport. Tour concludes.",
      },
    ],
  },
  {
    id: "nepal",
    name: "Nepal Tour",
    destination: "Nepal",
    duration: "5N / 6D",
    price: "₹15,000",
    priceNote: "per person",
    pickup: "NJP / Bagdogra / Kathmandu",
    highlight: "Kathmandu, Pokhara & Fewa Lake",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Kathmandu",
        details:
          "Arrival at Kathmandu. Transfer to hotel. Evening visit to Thamel market. Welcome dinner. Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Kathmandu Temples",
        details:
          "Visit Pashupatinath Temple (sacred Hindu temple on Bagmati River), Boudhanath Stupa (largest stupa in Asia), Swayambhunath aka Monkey Temple. Overnight stay.",
      },
      {
        day: "Day 3",
        title: "Durbar Squares",
        details:
          "Visit Patan Durbar Square (UNESCO World Heritage Site with ancient palaces), Bhaktapur Durbar Square (medieval city of devotees). Overnight stay in Kathmandu.",
      },
      {
        day: "Day 4",
        title: "Kathmandu → Pokhara",
        details:
          "Drive or fly to Pokhara (7 hours by road). Arrive and visit Fewa Lake (boating optional), Davis Falls, Gupteshwor Cave. Overnight stay in Pokhara.",
      },
      {
        day: "Day 5",
        title: "Pokhara Sightseeing",
        details:
          "Early morning Sarangkot sunrise viewpoint (Annapurna range). Phewa Lake boating, World Peace Pagoda (Japanese pagoda). Evening in Lakeside market. Overnight stay.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details:
          "Morning leisure. Transfer to airport or bus station for return journey. Tour ends.",
      },
    ],
  },
  {
    id: "manali",
    name: "Manali Tour",
    destination: "Manali",
    duration: "5N / 6D",
    price: "₹13,500",
    priceNote: "per person",
    pickup: "Delhi / Chandigarh",
    highlight: "Rohtang Pass & Solang Valley",
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi/Chandigarh → Manali",
        details:
          "Overnight journey from Delhi or Chandigarh to Manali by Volvo bus or private vehicle. Arrive and check-in. Evening rest.",
      },
      {
        day: "Day 2",
        title: "Rohtang Pass & Solang Valley",
        details:
          "Early morning excursion to Rohtang Pass (13,050 ft) – snow activities, paragliding. Visit Solang Valley for skiing/zorbing. Overnight stay.",
      },
      {
        day: "Day 3",
        title: "Manali Local Sightseeing",
        details:
          "Visit Hadimba Temple (iconic wooden temple), Manu Temple, Old Manali village, Club House (river-side activities), Vashisht Hot Springs. Overnight stay.",
      },
      {
        day: "Day 4",
        title: "Naggar & Bijli Mahadev",
        details:
          "Visit Naggar Castle (heritage hotel & museum), Roerich Art Gallery (famous Russian painter's home), Bijli Mahadev Temple (sacred high-altitude temple, 2-km trek). Overnight stay.",
      },
      {
        day: "Day 5",
        title: "Adventure & Shopping",
        details:
          "River rafting on Beas River, local handicraft shopping, Mall Road Manali. Farewell dinner. Overnight stay.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details:
          "After breakfast, departure from Manali. Drive back to Delhi or Chandigarh. Tour ends.",
      },
    ],
  },
  {
    id: "shimla",
    name: "Shimla Tour",
    destination: "Shimla",
    duration: "4N / 5D",
    price: "₹10,000",
    priceNote: "per person",
    pickup: "Delhi / Chandigarh",
    highlight: "Mall Road & Kufri Snow Point",
    itinerary: [
      {
        day: "Day 1",
        title: "Delhi/Chandigarh → Shimla",
        details:
          "Depart from Delhi or Chandigarh. Arrive Shimla, check-in. Evening walk on Mall Road. Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Kufri & Chail",
        details:
          "Day trip to Kufri (snow activities, Himalayan wildlife park), Fagu viewpoint, Green Valley, Chail (world's highest cricket ground). Overnight stay in Shimla.",
      },
      {
        day: "Day 3",
        title: "Shimla City Tour",
        details:
          "Visit The Ridge (open air space with Himalayan panorama), Mall Road shopping, Christ Church (neo-Gothic architecture), Jakhu Temple (ancient Hanuman temple, 2.5 km trek). Overnight stay.",
      },
      {
        day: "Day 4",
        title: "Mashobra & Tattapani",
        details:
          "Visit Mashobra village (apple orchards), Naldehra Golf Course (one of the oldest in India), Tattapani (hot sulphur springs). Overnight stay.",
      },
      {
        day: "Day 5",
        title: "Departure",
        details:
          "After breakfast, checkout. Drive back to Delhi or Chandigarh. Tour concludes.",
      },
    ],
  },
  {
    id: "kashmir",
    name: "Kashmir Tour",
    destination: "Kashmir",
    duration: "6N / 7D",
    price: "₹18,000",
    priceNote: "per person",
    pickup: "Srinagar Airport",
    highlight: "Dal Lake Houseboat & Gulmarg Gondola",
    itinerary: [
      {
        day: "Day 1",
        title: "Srinagar Arrival",
        details:
          "Arrival at Srinagar Airport. Transfer to houseboat on Dal Lake. Evening Shikara ride on Dal Lake. Overnight stay on houseboat.",
      },
      {
        day: "Day 2",
        title: "Gulmarg",
        details:
          "Day excursion to Gulmarg (Meadow of Flowers). Gondola ride (Phase 1 & 2) up to 14,000 ft. Snow activities, skiing. Return to Srinagar. Overnight stay.",
      },
      {
        day: "Day 3",
        title: "Pahalgam",
        details:
          "Day trip to Pahalgam (Valley of Shepherds). Visit Betaab Valley (Bollywood filming location), Chandanwari, Aru Valley. River-side picnic. Return to Srinagar. Overnight stay.",
      },
      {
        day: "Day 4",
        title: "Srinagar Local",
        details:
          "Visit Shankaracharya Temple (hilltop Hindu shrine), Mughal Gardens (Nishat, Shalimar, Chashme Shahi), local market for Pashmina shawls & dry fruits. Overnight stay.",
      },
      {
        day: "Day 5",
        title: "Sonmarg",
        details:
          "Day excursion to Sonmarg (Meadow of Gold). Visit Thajiwas Glacier (accessible by pony/trek). Panoramic Himalayan views. Return to Srinagar. Overnight stay.",
      },
      {
        day: "Day 6",
        title: "Srinagar → Jammu",
        details:
          "Drive from Srinagar to Jammu via scenic Banihal Pass. Enroute stop at Vaishno Devi (optional). Overnight stay in Jammu.",
      },
      {
        day: "Day 7",
        title: "Departure",
        details:
          "After breakfast, transfer to Jammu Airport/Railway Station. Tour concludes.",
      },
    ],
  },
  {
    id: "mathura",
    name: "Mathura Tour",
    destination: "Mathura",
    duration: "2N / 3D",
    price: "₹7,000",
    priceNote: "per person",
    pickup: "Agra / Mathura Region",
    highlight: "Krishna Janmabhoomi & ISKCON Vrindavan",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Mathura",
        details:
          "Arrive at Mathura. Check-in at hotel. Visit Krishna Janmabhoomi (birthplace of Lord Krishna), Dwarkadhish Temple, Vishram Ghat (evening aarti on Yamuna river). Overnight stay.",
      },
      {
        day: "Day 2",
        title: "Vrindavan",
        details:
          "Full day in Vrindavan (land of Lord Krishna). Visit ISKCON Temple (world-famous, grand architecture), Banke Bihari Temple, Prem Mandir (illuminated at night), Govardhan Hill (parikrama route). Overnight stay.",
      },
      {
        day: "Day 3",
        title: "Barsana → Departure",
        details:
          "Morning visit to Barsana, birthplace of Radha Rani. Visit Radha Rani Temple (hilltop temple). Return to Mathura. Tour ends with divine blessings.",
      },
    ],
  },
];

const REVIEWS = [
  {
    name: "Rahul S.",
    city: "Kolkata",
    destination: "Bhutan",
    text: "Amazing Bhutan trip! Everything was perfectly arranged from pickup at NJP to drop back. Professional guides, comfortable stay, and a truly memorable experience. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya M.",
    city: "Delhi",
    destination: "Sikkim",
    text: "The Sikkim tour was breathtaking. Professional service and great value for money. Tsomgo Lake and Nathula Pass were absolutely stunning. Will book again!",
    rating: 5,
  },
  {
    name: "Amit K.",
    city: "Mumbai",
    destination: "Kashmir",
    text: "Kashmir tour was a dream come true. Dal Lake houseboat was unforgettable. Excellent hospitality and smooth arrangements throughout the trip.",
    rating: 5,
  },
  {
    name: "Sunita D.",
    city: "West Bengal",
    destination: "Darjeeling",
    text: "Darjeeling package was perfect for a family trip. Kids absolutely loved Tiger Hill sunrise. Tea garden visit was a great experience. Thank you Travellers Points!",
    rating: 5,
  },
];

const SERVICES = [
  {
    id: "flights",
    icon: Plane,
    title: "Flight Bookings",
    short: "Best fares for domestic & international flights",
    details:
      "We help you book domestic and international flights at competitive rates. Our team searches multiple airlines to find you the best price and schedule. From Bagdogra to any destination — we handle everything.",
  },
  {
    id: "hotels",
    icon: Hotel,
    title: "Hotel Bookings",
    short: "Budget to luxury stay options at every destination",
    details:
      "From budget guesthouses to luxury resorts, we book accommodations across all our tour destinations. We ensure comfortable, clean, and well-located stays for every budget and preference.",
  },
  {
    id: "packages",
    icon: PackageIcon,
    title: "Custom Tour Packages",
    short: "Tailored group & private tour experiences",
    details:
      "Can't find a package that fits? We create fully customized group and private tour packages to match your schedule, budget, and preferences. Tell us where you want to go and we'll design your perfect trip.",
  },
  {
    id: "insurance",
    icon: Shield,
    title: "Travel Insurance",
    short: "Travel protection for international & domestic trips",
    details:
      "We assist with travel insurance for both international and domestic tours. Travel with peace of mind knowing you're covered for medical emergencies, trip cancellations, and lost baggage.",
  },
];

const TAXI_ROUTES = [
  {
    from: "Jaigaon",
    to: "Siliguri",
    duration: "~2.5 hrs",
    note: "Convenient and comfortable transfer",
  },
  {
    from: "Jaigaon",
    to: "Darjeeling",
    duration: "~3.5 hrs",
    note: "Scenic hill road journey",
  },
  {
    from: "Jaigaon",
    to: "Gangtok (Sikkim)",
    duration: "~5 hrs",
    note: "Door-to-door service available",
  },
];

// ─── Hero Tagline Component ────────────────────────────────────────────────────
const TAGLINES = [
  "Your Dream Journey Begins With Us",
  "Where Every Trip Becomes a Timeless Memory",
  "Explore the Himalayas, Discover Yourself",
  "From Jaigaon to the World — We Take You There",
];

function HeroTagline() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % TAGLINES.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-10 h-8 flex items-center justify-center">
      <p
        className="text-gold font-display text-lg md:text-xl font-semibold italic transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        ✦ {TAGLINES[idx]} ✦
      </p>
    </div>
  );
}

// ─── App Component ─────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const [serviceModal, setServiceModal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleItinerary = (id: string) => {
    setExpandedPackage((prev) => (prev === id ? null : id));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Travellers Points! I am ${formData.name} (${formData.email}). ${formData.message}`;
    window.open(waLink(msg), "_blank");
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const activeService = SERVICES.find((s) => s.id === serviceModal);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Packages", href: "#packages" },
    { label: "Services", href: "#services" },
    { label: "Taxi", href: "#taxi" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* SEO Meta */}
      <title>
        Travellers Points – Best Tour Packages from Jaigaon | Bhutan,
        Darjeeling, Sikkim, Kashmir
      </title>

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy shadow-luxury" : "bg-navy/95"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3"
              data-ocid="nav.link"
            >
              <img
                src="/assets/uploads/image_b1a1f18a-1.png"
                alt="Travellers Points Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-cream font-display text-lg font-bold leading-tight hidden sm:block">
                Travellers Points
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-cream/90 hover:text-gold transition-colors duration-200 font-medium text-sm"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waLink(
                  "Hi Travellers Points! I would like to enquire about your tour packages.",
                )}
                target="_blank"
                rel="noreferrer"
                className="btn-gold text-sm px-4 py-2"
                data-ocid="nav.primary_button"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-cream p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-navy-light/30">
              <div className="flex flex-col gap-2 pt-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-cream/90 hover:text-gold px-2 py-2 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        {/* ── Hero with Slideshow ── */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.09 150) 0%, oklch(0.25 0.09 150) 40%, oklch(0.28 0.10 170) 70%, oklch(0.22 0.09 160) 100%)",
          }}
        >
          {/* Sliding background images */}
          {HERO_SLIDES.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.label}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === heroSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Slide label badge */}
          <div className="absolute top-24 right-6 z-20">
            <div className="bg-gold/90 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              {HERO_SLIDES[heroSlide].label}
            </div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
            <div className="inline-flex items-center gap-2 bg-gold/25 border border-gold/40 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <MapPin className="w-4 h-4" />
              Based in Jaigaon, West Bengal
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Explore the World with
              <span className="block text-gold mt-1">Travellers Points</span>
            </h1>

            <p className="text-white/90 text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Premium Tour Packages from Jaigaon, West Bengal — crafting
              extraordinary Himalayan journeys.
            </p>

            {/* Rotating taglines */}
            <HeroTagline />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#packages"
                className="btn-gold text-base px-8 py-4"
                data-ocid="hero.primary_button"
              >
                <PackageIcon className="w-5 h-5" /> View Packages
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
              {[
                { label: "Tour Packages", value: "9+" },
                { label: "Happy Clients", value: "500+" },
                { label: "Destinations", value: "8+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-gold font-display text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide dot indicators */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setHeroSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === heroSlide
                    ? "bg-gold w-8 h-3"
                    : "bg-white/50 w-3 h-3 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${slide.label}`}
                data-ocid="hero.toggle"
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="packages" className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Our Tour Packages</h2>
              <p className="section-subtitle">
                Expertly curated packages for unforgettable journeys across the
                Himalayas
              </p>
            </div>

            <div
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              data-ocid="packages.list"
            >
              {PACKAGES.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-2xl shadow-card overflow-hidden card-hover flex flex-col"
                  data-ocid={`packages.item.${idx + 1}`}
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-navy to-navy-light p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge className="bg-gold text-white text-xs font-semibold border-0">
                        {pkg.destination}
                      </Badge>
                      <Badge className="bg-gold text-white text-xs font-bold border-0 px-2 py-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {pkg.duration}
                      </Badge>
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-white/80 text-xs">{pkg.highlight}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-display font-bold text-navy">
                          {pkg.price}
                        </span>
                        <span className="text-slate-600 text-sm ml-1">
                          {pkg.priceNote}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Pickup</div>
                        <div className="text-xs font-medium text-charcoal">
                          {pkg.pickup}
                        </div>
                      </div>
                    </div>

                    {/* Expand Itinerary */}
                    <button
                      type="button"
                      onClick={() => toggleItinerary(pkg.id)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-navy border border-navy/20 rounded-lg px-4 py-2.5 hover:bg-navy/5 transition-colors mb-4"
                      data-ocid={`packages.item.${idx + 1}.toggle`}
                    >
                      <span>View Itinerary</span>
                      {expandedPackage === pkg.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Itinerary Details */}
                    {expandedPackage === pkg.id && (
                      <div className="mb-4 space-y-3 max-h-72 overflow-y-auto pr-1">
                        {pkg.itinerary.map((day) => (
                          <div
                            key={day.day}
                            className="border-l-2 border-gold pl-3"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs bg-gold/20 text-gold-dark font-bold px-2 py-0.5 rounded-full">
                                {day.day}
                              </span>
                              <span className="text-sm font-semibold text-charcoal">
                                {day.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {day.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Book Button */}
                    <div className="mt-auto space-y-2">
                      <a
                        href={waLink(
                          `Hi, I am interested in the ${pkg.name} (${pkg.duration}). Please share details and availability.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-whatsapp w-full justify-center text-sm py-3"
                        data-ocid={`packages.item.${idx + 1}.primary_button`}
                      >
                        <MessageCircle className="w-4 h-4" /> Book on Request
                      </a>
                      <a
                        href={waLink(
                          `Hi, I would like to customize the ${pkg.name}. Please help me create a custom itinerary.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full justify-center text-sm py-2.5 border-2 border-gold/50 text-gold-dark rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-gold/10 transition-colors"
                        data-ocid={`packages.item.${idx + 1}.secondary_button`}
                      >
                        <Settings className="w-4 h-4" /> Customize Package on
                        Request
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Taxi Service ── */}
        <section id="taxi" className="py-20 bg-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Local Taxi Services</h2>
              <p className="section-subtitle">
                Reliable transfers from Jaigaon to nearby destinations
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3" data-ocid="taxi.list">
              {TAXI_ROUTES.map((route, idx) => (
                <div
                  key={route.to}
                  className="bg-white rounded-2xl shadow-card p-6 text-center card-hover"
                  data-ocid={`taxi.item.${idx + 1}`}
                >
                  <div className="w-14 h-14 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-7 h-7 text-navy" />
                  </div>
                  <div className="text-sm text-slate-600 mb-1">
                    From {route.from}
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">
                    → {route.to}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-1">
                    <Clock className="w-4 h-4" /> {route.duration}
                  </div>
                  <p className="text-sm text-slate-600 mb-5">{route.note}</p>
                  <a
                    href={waLink(
                      `Hi, I need a taxi from ${route.from} to ${route.to}. Please share details.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp w-full justify-center text-sm"
                    data-ocid={`taxi.item.${idx + 1}.primary_button`}
                  >
                    <MessageCircle className="w-4 h-4" /> Book Taxi on WhatsApp
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                End-to-end travel solutions for your perfect journey
              </p>
            </div>

            <div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              data-ocid="services.list"
            >
              {SERVICES.map((svc, idx) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setServiceModal(svc.id)}
                  className="bg-white rounded-2xl shadow-card p-6 text-left card-hover group focus:outline-none focus:ring-2 focus:ring-navy/40"
                  data-ocid={`services.item.${idx + 1}.button`}
                >
                  <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-navy group-hover:text-cream transition-colors">
                    <svc.icon className="w-7 h-7 text-navy group-hover:text-cream transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-slate-600">{svc.short}</p>
                  <div className="mt-4 text-xs font-semibold text-navy flex items-center gap-1">
                    Click for details{" "}
                    <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Service Modal */}
        <Dialog
          open={!!serviceModal}
          onOpenChange={(o) => !o && setServiceModal(null)}
        >
          <DialogContent className="max-w-md" data-ocid="services.dialog">
            {activeService && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-display text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
                      <activeService.icon className="w-5 h-5 text-navy" />
                    </div>
                    {activeService.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeService.details}
                </p>
                <div className="flex gap-3 mt-2">
                  <a
                    href={waLink(
                      `Hi, I want to enquire about your ${activeService.title} service.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp flex-1 justify-center"
                    data-ocid="services.dialog.primary_button"
                  >
                    <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                  </a>
                  <Button
                    variant="outline"
                    onClick={() => setServiceModal(null)}
                    data-ocid="services.dialog.close_button"
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* ── Reviews ── */}
        <section id="reviews" className="py-20 bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                Client Reviews
              </h2>
              <p className="text-white/80 text-lg">
                What our travellers say about us
              </p>
            </div>

            <div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              data-ocid="reviews.list"
            >
              {REVIEWS.map((review, reviewIdx) => (
                <div
                  key={review.name}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 card-hover"
                  data-ocid={`reviews.item.${reviewIdx + 1}`}
                >
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <Star className="w-4 h-4 fill-gold text-gold" />
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="border-t border-white/20 pt-3">
                    <div className="font-semibold text-white text-sm">
                      {review.name}
                    </div>
                    <div className="text-white/70 text-xs">
                      {review.city} • {review.destination}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-20 bg-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">
                Get in touch to plan your dream trip
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">
              {/* Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-navy mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">
                          Address
                        </div>
                        <div className="text-slate-600 text-sm">
                          Jaigaon, Alipurduar, West Bengal, India
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-navy" />
                      </div>
                      <div>
                        <div className="font-semibold text-charcoal">
                          WhatsApp / Phone
                        </div>
                        <a
                          href={waLink("Hi Travellers Points!")}
                          target="_blank"
                          rel="noreferrer"
                          className="text-navy hover:text-gold transition-colors text-sm font-medium"
                        >
                          +91 7319076862
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-navy rounded-2xl p-6 text-white">
                  <h4 className="font-display text-lg font-bold mb-2 text-white">
                    Quick WhatsApp Enquiry
                  </h4>
                  <p className="text-white/80 text-sm mb-4">
                    For fastest response, message us directly on WhatsApp
                  </p>
                  <a
                    href={waLink(
                      "Hi Travellers Points! I would like to enquire about a tour package.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp w-full justify-center bg-amber-500 hover:bg-amber-600"
                    data-ocid="contact.primary_button"
                  >
                    <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleFormSubmit}
                className="bg-white rounded-2xl shadow-card p-8 space-y-5"
              >
                <h3 className="font-display text-xl font-bold text-charcoal">
                  Send a Message
                </h3>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium text-charcoal"
                    htmlFor="contact-name"
                  >
                    Your Name
                  </label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Full name"
                    required
                    className="border-border focus:ring-navy"
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium text-charcoal"
                    htmlFor="contact-email"
                  >
                    Email Address
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    required
                    className="border-border focus:ring-navy"
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-sm font-medium text-charcoal"
                    htmlFor="contact-message"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your travel plans..."
                    required
                    rows={4}
                    className="border-border focus:ring-navy resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy-dark text-white py-3"
                  data-ocid="contact.submit_button"
                >
                  {formSent ? (
                    <span data-ocid="contact.success_state">
                      ✓ Message Sent via WhatsApp!
                    </span>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 mr-2" /> Send via
                      WhatsApp
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-charcoal text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/assets/uploads/image_b1a1f18a-1.png"
                  alt="Travellers Points"
                  className="h-10 w-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="font-display text-xl font-bold text-white">
                  Travellers Points
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4 max-w-xs text-white/70">
                Premium tour packages from Jaigaon, West Bengal. Bhutan,
                Darjeeling, Sikkim, Nepal & more.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                Jaigaon, Alipurduar, West Bengal
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <Phone className="w-4 h-4 text-gold" />
                +91 7319076862
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  ["#home", "Home"],
                  ["#packages", "Packages"],
                  ["#services", "Services"],
                  ["#taxi", "Taxi"],
                  ["#reviews", "Reviews"],
                  ["#contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:text-gold transition-colors"
                      data-ocid="footer.link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="text-white font-semibold mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Bhutan",
                  "Darjeeling",
                  "Sikkim",
                  "Nepal",
                  "Manali",
                  "Shimla",
                  "Kashmir",
                  "Mathura",
                ].map((d) => (
                  <li key={d}>
                    <a
                      href="#packages"
                      className="hover:text-gold transition-colors"
                      data-ocid="footer.link"
                    >
                      {d}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-white/60">
              © {new Date().getFullYear()} Travellers Points. All rights
              reserved.
            </p>
            <p className="text-white/50">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={waLink(
          "Hi Travellers Points! I would like to enquire about your tour packages.",
        )}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-luxury transition-all duration-200 hover:scale-110"
        aria-label="Chat on WhatsApp"
        data-ocid="nav.primary_button"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
