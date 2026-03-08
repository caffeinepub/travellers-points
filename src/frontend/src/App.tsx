import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Award,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Loader2,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  Phone,
  Plane,
  Play,
  Search,
  ShieldCheck,
  Star,
  Tag,
  Twitter,
  Users,
  Video,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// =============================================
// DATA
// =============================================

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Deals", href: "#deals" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const DESTINATIONS = [
  {
    name: "Bhutan",
    country: "Land of Thunder Dragon",
    image: "/assets/generated/dest-bhutan.dim_600x400.jpg",
    description:
      "Mystical monasteries, pristine Himalayan landscapes, and a kingdom that measures happiness. Group tours from ₹25,000 with Bagdogra/NJP pickup.",
    price: "From ₹25,000",
    duration: "6N / 7D",
  },
  {
    name: "Darjeeling",
    country: "West Bengal, India",
    image: "/assets/generated/darjeeling-tea.dim_800x500.jpg",
    description:
      "The Queen of Hills — iconic toy train, sunrise over Kangchenjunga, lush tea gardens, and vibrant local culture.",
    price: "From ₹14,999",
    duration: "5N / 6D",
  },
  {
    name: "Sikkim",
    country: "India",
    image: "/assets/generated/dest-sikkim.dim_600x400.jpg",
    description:
      "Enchanting monasteries, the pristine Tsomgo Lake, Nathu La Pass, and the vibrant MG Marg boulevard in Gangtok.",
    price: "From ₹14,999",
    duration: "5N / 6D",
  },
];

const SERVICES = [
  {
    icon: Plane,
    title: "Flights",
    description:
      "Best fares to 200+ destinations worldwide with flexible booking options",
    color: "ocean",
  },
  {
    icon: Building2,
    title: "Hotels",
    description:
      "Curated accommodations from budget-friendly to ultra-luxury resorts",
    color: "gold",
  },
  {
    icon: MapIcon,
    title: "Tour Packages",
    description:
      "All-inclusive guided tour packages tailored to your interests and budget",
    color: "coral",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    description:
      "Comprehensive coverage so you can explore with complete peace of mind",
    color: "ocean",
  },
];

const WHY_US = [
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description:
      "We match any price and ensure you get the best deal every time",
    stat: "Price Match",
  },
  {
    icon: Award,
    title: "Expert Local Guides",
    description:
      "Handpicked guides with deep local knowledge for authentic experiences",
    stat: "500+ Guides",
  },
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance wherever you are in the world",
    stat: "Always On",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description:
      "Over 50,000 happy travelers trust us with their dream vacations",
    stat: "50K+ Trips",
  },
];

const DEALS = [
  {
    badge: "Group Tour Deal",
    destination: "Bhutan Group Tour",
    country: "Bagdogra / NJP Pickup",
    nights: 6,
    originalPrice: "₹30,000",
    currentPrice: "₹25,000",
    savings: "Save 17%",
    image: "/assets/generated/dest-bhutan.dim_600x400.jpg",
  },
  {
    badge: "Himalayan Special",
    destination: "Bhutan Private Tour",
    country: "Land of Thunder Dragon",
    nights: 6,
    originalPrice: "₹34,999",
    currentPrice: "₹28,999",
    savings: "Save 17%",
    image: "/assets/generated/bhutan-tigers-nest.dim_800x500.jpg",
  },
  {
    badge: "Hill Station Getaway",
    destination: "Sikkim & Darjeeling",
    country: "India",
    nights: 5,
    originalPrice: "₹18,999",
    currentPrice: "₹14,999",
    savings: "Save 21%",
    image: "/assets/generated/dest-sikkim.dim_600x400.jpg",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul S.",
    initials: "RS",
    rating: 5,
    text: "The Bhutan trip was a life-changing experience. Tiger's Nest, Punakha Dzong — every moment was magical. Thank you Travellers Points!",
    destination: "Bhutan",
  },
  {
    name: "Anjali D.",
    initials: "AD",
    rating: 5,
    text: "Sikkim Darjeeling tour was perfectly organized. The sunrise at Tiger Hill was breathtaking. Will book again!",
    destination: "Sikkim & Darjeeling",
  },
  {
    name: "Amit & Kavya R.",
    initials: "AK",
    rating: 5,
    text: "Our Bhutan group tour from Bagdogra pickup was absolutely seamless. Dochula Pass with 108 chortens left us speechless. Highly recommend this tour!",
    destination: "Bhutan Group Tour",
  },
  {
    name: "Sunita M.",
    initials: "SM",
    rating: 5,
    text: "Darjeeling toy train ride through the misty mountains — a dream come true! The tea garden walk and Tiger Hill sunrise made this the best trip of my life.",
    destination: "Darjeeling",
  },
  {
    name: "Vikram N.",
    initials: "VN",
    rating: 5,
    text: "Tsomgo Lake and Nathu La Pass were breathtaking. The Gangtok MG Marg food scene was amazing. Travellers Points handled everything perfectly!",
    destination: "Sikkim",
  },
];

// =============================================
// CLIENT REVIEWS DATA
// =============================================

const CLIENT_REVIEWS = [
  {
    id: 1,
    name: "Rohit & Priya Sharma",
    destination: "Bhutan",
    tag: "Bhutan",
    photo: "/assets/generated/client-bhutan-1.dim_400x400.jpg",
    rating: 5,
    text: "The Tiger's Nest hike was the most magical experience of our lives! Travellers Points handled everything perfectly — from Bagdogra pickup to the farewell dinner with cultural show. Highly recommend this trip!",
    tripLabel: "Bhutan 6N/7D",
    videoEmbed: "https://www.youtube.com/embed/8P7RYphq23s",
    hasVideo: true,
  },
  {
    id: 2,
    name: "The Mehta Family",
    destination: "Bhutan",
    tag: "Bhutan",
    photo: "/assets/generated/client-bhutan-2.dim_400x400.jpg",
    rating: 5,
    text: "We traveled as a family of 5 and Travellers Points made it stress-free. The kids loved the Punakha Dzong, the suspension bridge, and Bhutanese food. Best family trip ever!",
    tripLabel: "Bhutan Group Tour",
    hasVideo: false,
  },
  {
    id: 3,
    name: "Ananya Bose",
    destination: "Darjeeling",
    tag: "Darjeeling",
    photo: "/assets/generated/client-darjeeling-1.dim_400x400.jpg",
    rating: 5,
    text: "The tea garden visit and the toy train joy ride in Darjeeling were absolutely dreamy! Everything was well-organized and our guide was so knowledgeable. The hotel views were stunning!",
    tripLabel: "Sikkim & Darjeeling 5N/6D",
    videoEmbed: "https://www.youtube.com/embed/5AkVaB8HgC0",
    hasVideo: true,
  },
  {
    id: 4,
    name: "Vikram Nair",
    destination: "Darjeeling",
    tag: "Darjeeling",
    photo: "/assets/generated/client-darjeeling-2.dim_400x400.jpg",
    rating: 5,
    text: "Waking up at 4am for the Tiger Hill sunrise was 100% worth it — Kanchenjunga glowing pink at dawn is something I'll never forget. Travellers Points made this trip seamless!",
    tripLabel: "Sikkim & Darjeeling 5N/6D",
    hasVideo: false,
  },
  {
    id: 5,
    name: "Delhi Group Tour",
    destination: "Bhutan",
    tag: "Bhutan",
    photo: "/assets/generated/client-bhutan-3.dim_400x400.jpg",
    rating: 5,
    text: "Dochula Pass with the 108 chortens backdrop was surreal! Our group of 12 had an amazing time — the guide was fantastic, food was great, and the whole Bhutan experience was life-changing.",
    tripLabel: "Bhutan Group Tour",
    hasVideo: false,
  },
  {
    id: 6,
    name: "Sunita & Raj Kapoor",
    destination: "Darjeeling",
    tag: "Darjeeling",
    photo: "/assets/generated/client-darjeeling-3.dim_400x400.jpg",
    rating: 5,
    text: "Riding the Darjeeling Himalayan Railway was a dream come true! The UNESCO toy train through mountain mist and green tea gardens — pure bliss. Thank you Travellers Points for an unforgettable trip!",
    tripLabel: "Sikkim & Darjeeling 5N/6D",
    hasVideo: false,
  },
];

// =============================================
// PACKAGE DATA
// =============================================

const BHUTAN_ITINERARY = [
  {
    day: 1,
    title: "Arrival in Paro",
    desc: "Arrive at Paro International Airport, transfer to hotel. Evening walk to Paro town. Welcome dinner with traditional Bhutanese cuisine.",
  },
  {
    day: 2,
    title: "Paro Sightseeing",
    desc: "Visit Rinpung Dzong, Drukgyal Dzong ruins, National Museum of Bhutan. Evening stroll along Paro Chhu river at leisure.",
  },
  {
    day: 3,
    title: "Tiger's Nest Hike",
    desc: "Morning hike to Paro Taktsang (Tiger's Nest) Monastery — one of Bhutan's most iconic sites perched 900m above the valley. Lunch at hillside café.",
  },
  {
    day: 4,
    title: "Paro to Thimphu",
    desc: "Drive to Thimphu (1 hr). Visit Buddha Dordenma statue, Tashichho Dzong, Folk Heritage Museum. Evening explore Thimphu night market.",
  },
  {
    day: 5,
    title: "Thimphu to Punakha",
    desc: "Cross the scenic Dochula Pass (3,100m) with 108 memorial chortens — stunning Himalayan panorama. Visit Punakha Dzong and suspension bridge.",
  },
  {
    day: 6,
    title: "Punakha to Paro",
    desc: "Drive back through Dochula Pass. Traditional hot stone bath experience. Cultural show and farewell dinner with Bhutanese folk performances.",
  },
  {
    day: 7,
    title: "Departure",
    desc: "Morning transfer to Paro Airport. Bid farewell to the Land of Happiness with memories that last a lifetime.",
  },
];

const SIKKIM_ITINERARY = [
  {
    day: 1,
    title: "Arrival in Gangtok",
    desc: "Arrive NJP / Bagdogra, scenic transfer to Gangtok (4 hrs). Check-in and evening stroll on MG Marg — the vibrant pedestrian boulevard.",
  },
  {
    day: 2,
    title: "Gangtok Sightseeing",
    desc: "Visit Rumtek Monastery, Enchey Monastery, Namgyal Institute of Tibetology, and Flower Exhibition Centre. Evening at MG Marg with local food.",
  },
  {
    day: 3,
    title: "Tsomgo Lake & Nathu La Pass",
    desc: "Excursion to Tsomgo Lake (12,400 ft), Baba Mandir, and Nathu La Pass (14,140 ft) — the India-China border (permit required). Return to Gangtok.",
  },
  {
    day: 4,
    title: "Gangtok to Darjeeling",
    desc: "Morning drive to Darjeeling (3.5 hrs). Check-in. Evening visit Batasia Loop with Gorkha War Memorial and tea garden stroll at sunset.",
  },
  {
    day: 5,
    title: "Tiger Hill Sunrise & Darjeeling Sightseeing",
    desc: "Pre-dawn drive to Tiger Hill for the legendary sunrise over Kangchenjunga. Visit Ghoom Monastery, Darjeeling Himalayan Railway joy ride, Happy Valley Tea Estate, and Himalayan Mountaineering Institute.",
  },
  {
    day: 6,
    title: "Departure",
    desc: "Morning at leisure. Transfer to NJP / Bagdogra for onward journey, carrying the scent of tea and the memory of mountain peaks.",
  },
];

const BHUTAN_GROUP_ITINERARY = [
  {
    day: 1,
    title: "Bagdogra / NJP Pickup → Phuentsholing",
    desc: "Pick up from Bagdogra Airport or NJP Railway Station. Drive to Phuentsholing (approx. 4 hrs) — the gateway town on the India-Bhutan border. Check-in at hotel. Evening walk along the border town. Overnight at Phuentsholing.",
  },
  {
    day: 2,
    title: "Phuentsholing → Thimphu",
    desc: "Complete border immigration and permits. Drive to Thimphu (5–6 hrs) through scenic Himalayan valleys and Chuzom confluence. Check-in at Thimphu hotel. Evening stroll at Thimphu clock tower and local market. Dinner together.",
  },
  {
    day: 3,
    title: "Thimphu Full Day Sightseeing",
    desc: "Visit Buddha Dordenma statue (the world's largest sitting Buddha), Tashichho Dzong, Folk Heritage Museum, Changangkha Lhakhang, National Memorial Chorten, and Takin Preserve. Evening at Thimphu Night Market with street food.",
  },
  {
    day: 4,
    title: "Thimphu → Punakha via Dochula Pass",
    desc: "Drive over the scenic Dochula Pass (3,100m) featuring 108 memorial chortens and panoramic Himalayan views on clear days. Visit Punakha Dzong — the most beautiful Dzong in Bhutan, where the Pho Chhu and Mo Chhu rivers meet. Explore the famous Punakha suspension bridge.",
  },
  {
    day: 5,
    title: "Punakha → Paro",
    desc: "Morning at leisure in Punakha. Drive to Paro (4 hrs) through mountain roads. Visit Rinpung Dzong and National Museum of Bhutan (Ta Dzong). Evening walk along Paro Chhu river. Traditional Bhutanese hot stone bath experience (optional). Overnight in Paro.",
  },
  {
    day: 6,
    title: "Paro — Tiger's Nest Monastery Hike",
    desc: "Early morning hike to Paro Taktsang (Tiger's Nest) — the iconic monastery perched 900m above the Paro Valley. The 4-5 hour round-trip hike is one of Bhutan's most rewarding adventures. Lunch at hillside café with valley views. Evening cultural show with farewell dinner and Bhutanese folk performances.",
  },
  {
    day: 7,
    title: "Paro → Drop at Bagdogra Airport or NJP",
    desc: "After breakfast, check-out and drive back from Paro/Phuentsholing to Bagdogra Airport or NJP Railway Station (approx. 6–7 hrs). Group drop at Bagdogra Airport or NJP Station as per your onward journey. Bid farewell to the Land of Happiness carrying memories of monasteries, mountains, and mountain magic.",
  },
];

const TOUR_PACKAGES = [
  {
    id: "bhutan",
    name: "Bhutan — Land of the Thunder Dragon",
    tagline: "A kingdom that measures happiness",
    duration: "6 Nights / 7 Days",
    price: "₹28,999",
    priceLabel: "per person",
    heroImage: "/assets/generated/dest-bhutan.dim_600x400.jpg",
    galleryImages: [
      {
        src: "/assets/generated/bhutan-tigers-nest.dim_800x500.jpg",
        alt: "Tiger's Nest Monastery",
      },
      {
        src: "/assets/generated/bhutan-punakha.dim_800x500.jpg",
        alt: "Punakha Dzong",
      },
      {
        src: "/assets/generated/bhutan-thimphu.dim_800x500.jpg",
        alt: "Thimphu City",
      },
    ],
    highlights: [
      "Paro Taktsang (Tiger's Nest) Monastery hike",
      "Punakha Dzong & suspension bridge",
      "Thimphu city tour — Buddha Dordenma, Tashichho Dzong",
      "Traditional Bhutanese dinner with cultural show",
      "Hot stone bath experience",
      "Dochula Pass with 108 chortens",
    ],
    includes: [
      "Accommodation (3-star hotels)",
      "All meals (breakfast & dinner)",
      "Licensed English-speaking guide",
      "All transfers by private vehicle",
      "Bhutan SDF (Sustainable Development Fee)",
      "Entry tickets to all monuments",
    ],
    itinerary: BHUTAN_ITINERARY,
    accentColor: "from-amber-900/80 to-orange-900/60",
    badgeColor: "bg-amber-700",
  },
  {
    id: "sikkim",
    name: "Sikkim & Darjeeling",
    tagline: "Tea, mountains and the toy train",
    duration: "5 Nights / 6 Days",
    price: "₹14,999",
    priceLabel: "per person",
    heroImage: "/assets/generated/dest-sikkim.dim_600x400.jpg",
    galleryImages: [
      {
        src: "/assets/generated/sikkim-gangtok.dim_800x500.jpg",
        alt: "Gangtok City",
      },
      {
        src: "/assets/generated/darjeeling-tea.dim_800x500.jpg",
        alt: "Darjeeling Tea Garden",
      },
      {
        src: "/assets/generated/sikkim-tsomgo.dim_800x500.jpg",
        alt: "Tsomgo Lake",
      },
    ],
    highlights: [
      "Tsomgo (Changu) Lake & Nathu La Pass",
      "Gangtok city sightseeing — MG Marg, Rumtek Monastery",
      "Darjeeling toy train (UNESCO heritage)",
      "Tiger Hill sunrise over Kangchenjunga",
      "Batasia Loop & War Memorial",
      "Tea garden visit & tasting",
    ],
    includes: [
      "Accommodation (3-star hotels)",
      "Breakfast daily",
      "All transfers by private vehicle",
      "Licensed guide",
      "Nathu La permit",
      "Entry tickets to all monuments",
    ],
    itinerary: SIKKIM_ITINERARY,
    accentColor: "from-emerald-900/80 to-teal-900/60",
    badgeColor: "bg-emerald-700",
  },
  {
    id: "bhutan-group",
    name: "Bhutan Group Tour",
    tagline: "Bagdogra / NJP Pickup — Affordable Group Experience",
    duration: "6 Nights / 7 Days",
    price: "₹25,000",
    priceLabel: "per person (group)",
    heroImage: "/assets/generated/dest-bhutan.dim_600x400.jpg",
    galleryImages: [
      {
        src: "/assets/generated/bhutan-tigers-nest.dim_800x500.jpg",
        alt: "Tiger's Nest Monastery",
      },
      {
        src: "/assets/generated/bhutan-punakha.dim_800x500.jpg",
        alt: "Punakha Dzong",
      },
      {
        src: "/assets/generated/bhutan-thimphu.dim_800x500.jpg",
        alt: "Thimphu City",
      },
    ],
    highlights: [
      "Pickup & drop from Bagdogra Airport or NJP Railway Station",
      "Tiger's Nest (Taktsang) Monastery hike — Day 6",
      "Punakha Dzong & suspension bridge via Dochula Pass",
      "Thimphu full-day sightseeing — Buddha Dordenma, Tashichho Dzong",
      "Phuentsholing border crossing with permits",
      "Farewell cultural show & Bhutanese dinner",
    ],
    includes: [
      "Pickup & drop: Bagdogra Airport or NJP Station",
      "Accommodation (3-star hotels)",
      "All meals (breakfast & dinner daily)",
      "Licensed English-speaking group guide",
      "All transfers by shared group vehicle",
      "Bhutan SDF & entry tickets to all monuments",
      "Bhutan visa & border permits",
    ],
    itinerary: BHUTAN_GROUP_ITINERARY,
    accentColor: "from-yellow-900/80 to-amber-800/60",
    badgeColor: "bg-yellow-700",
  },
];

// =============================================
// ANIMATION VARIANTS
// =============================================

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// =============================================
// WHATSAPP BUTTON
// =============================================

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/917319076862"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 group"
    >
      {/* Label bubble */}
      <motion.span
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        className="bg-white text-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-sand-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
      >
        Chat with us
      </motion.span>

      {/* Button */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.div>
    </motion.a>
  );
}

// =============================================
// NAVBAR
// =============================================

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-md border-b border-sand-dark"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-2.5 group"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled ? "bg-ocean" : "bg-white/20 backdrop-blur-sm"
            }`}
          >
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span
            className={`font-display font-bold text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Travellers Points
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`nav.link.${i + 1}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "text-foreground hover:text-ocean hover:bg-ocean-pale"
                  : "text-white/90 hover:text-white hover:bg-white/15"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavClick("#contact")}
            className="ml-3 bg-gold text-white hover:bg-gold/90 font-semibold shadow-none border-0 rounded-xl"
            size="sm"
          >
            Book Now
          </Button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          data-ocid="nav.toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled
              ? "text-foreground hover:bg-sand-dark"
              : "text-white hover:bg-white/15"
          }`}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-sand-dark overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:text-ocean hover:bg-ocean-pale transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => handleNavClick("#contact")}
                className="mt-2 bg-gold text-white hover:bg-gold/90 rounded-xl"
              >
                Book Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// =============================================
// HERO SECTION
// =============================================

function HeroSection({ onSearch }: { onSearch: (q: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      const el = document.getElementById("destinations");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.jpg')`,
        }}
      />
      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean/30 via-transparent to-transparent" />

      {/* Bottom fade into page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-7"
        >
          {/* Eyebrow pill */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/12 backdrop-blur-md text-white/95 text-sm font-medium border border-white/25 shadow-lg">
              <Plane className="w-4 h-4 text-gold" />
              Your Dream Destination Awaits
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.92] tracking-tight"
          >
            Discover Your <span className="text-gold italic">Perfect</span>
            <br />
            Journey
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed font-body"
          >
            Explore the world with Travellers Points — where every trip is a
            story worth telling
          </motion.p>

          {/* Search Bar — polished */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto mt-8">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/12 backdrop-blur-xl rounded-2xl border border-white/25 shadow-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  data-ocid="hero.search_input"
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 h-13 bg-white border-0 text-foreground placeholder:text-muted-foreground text-base rounded-xl shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
                />
              </div>
              <Button
                data-ocid="hero.primary_button"
                onClick={handleSearch}
                className="h-12 px-8 bg-gold hover:bg-gold/90 text-white font-bold text-base rounded-xl transition-all hover:scale-[1.02] border-0 shadow-md"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            <p className="text-white/45 text-xs mt-2.5 text-center">
              Try: Bhutan, Darjeeling, Santorini, Bali…
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-10 mt-10 text-white"
          >
            {[
              { value: "200+", label: "Destinations" },
              { value: "50K+", label: "Happy Travelers" },
              { value: "15+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-white/65 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="w-5 h-8 border-2 border-white/25 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// =============================================
// DESTINATIONS SECTION
// =============================================

function DestinationsSection({ filter }: { filter: string }) {
  const filtered = filter
    ? DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(filter.toLowerCase()) ||
          d.country.toLowerCase().includes(filter.toLowerCase()),
      )
    : DESTINATIONS;

  const displayed = filtered.length > 0 ? filtered : DESTINATIONS;

  return (
    <section id="destinations" className="py-24 px-4 md:px-8 lg:px-16 bg-sand">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Explore the World
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Handpicked destinations that promise unforgettable memories
          </motion.p>
          {filter && filtered.length > 0 && (
            <motion.p variants={fadeUp} className="mt-2 text-ocean font-medium">
              Showing results for "{filter}"
            </motion.p>
          )}
          {filter && filtered.length === 0 && (
            <motion.p variants={fadeUp} className="mt-2 text-coral font-medium">
              No exact matches — showing all destinations
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {displayed.map((dest, i) => (
            <motion.div
              key={dest.name}
              variants={fadeUp}
              data-ocid={`destinations.item.${i + 1}`}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card card-hover cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                    {dest.country}
                  </span>
                  {dest.duration && (
                    <span className="px-2.5 py-1 bg-gold/90 text-white text-xs font-bold rounded-full">
                      {dest.duration}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      Starting
                    </span>
                    <div className="font-display text-lg font-bold text-ocean">
                      {dest.price}
                    </div>
                  </div>
                  <Button
                    data-ocid={`destinations.button.${i + 1}`}
                    size="sm"
                    className="bg-ocean text-white hover:bg-ocean/90 rounded-xl text-xs px-3 group/btn"
                    onClick={() => scrollToSection("#packages")}
                  >
                    Explore
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// TOUR PACKAGES SECTION
// =============================================

function PackageCard({ pkg }: { pkg: (typeof TOUR_PACKAGES)[0] }) {
  const [itineraryOpen, setItineraryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  return (
    <motion.div
      variants={fadeUp}
      className="bg-card rounded-3xl overflow-hidden shadow-card border border-sand-dark"
    >
      {/* Hero Image with gallery thumbnails */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={pkg.galleryImages[activeGalleryIndex].src}
          alt={pkg.galleryImages[activeGalleryIndex].alt}
          className="w-full h-full object-cover transition-all duration-700"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${pkg.accentColor}`}
        />

        {/* Duration badge */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span
            className={`${pkg.badgeColor} text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            {pkg.duration}
          </span>
          {pkg.id === "bhutan-group" && (
            <span className="bg-coral text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <Users className="w-3 h-3" />
              Group Tour
            </span>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute top-5 right-5 text-right">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
            <div className="text-white/70 text-xs">{pkg.priceLabel}</div>
            <div className="font-display text-2xl font-bold text-gold leading-tight">
              {pkg.price}
            </div>
          </div>
        </div>

        {/* Package title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">
            {pkg.tagline}
          </p>
          <h3 className="font-display text-2xl font-bold text-white">
            {pkg.name}
          </h3>
        </div>

        {/* Gallery thumbnails */}
        <div className="absolute bottom-5 right-5 flex gap-2">
          {pkg.galleryImages.map((img, idx) => (
            <button
              key={img.alt}
              type="button"
              onClick={() => setActiveGalleryIndex(idx)}
              className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                activeGalleryIndex === idx
                  ? "border-gold scale-110"
                  : "border-white/40 hover:border-white/80"
              }`}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="p-7">
        {/* Two-column: highlights + includes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Highlights */}
          <div>
            <h4 className="font-display font-bold text-foreground text-base mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-gold fill-gold" />
              Trip Highlights
            </h4>
            <ul className="space-y-2">
              {pkg.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-ocean shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div>
            <h4 className="font-display font-bold text-foreground text-base mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              Package Includes
            </h4>
            <ul className="space-y-2">
              {pkg.includes.map((inc) => (
                <li
                  key={inc}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Itinerary accordion */}
        <div className="border border-sand-dark rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setItineraryOpen(!itineraryOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-sand hover:bg-sand-dark transition-colors"
          >
            <span className="font-display font-bold text-foreground flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-ocean" />
              View Day-by-Day Itinerary
            </span>
            <motion.div
              animate={{ rotate: itineraryOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence>
            {itineraryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 py-4 space-y-0 divide-y divide-sand-dark">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="py-4 flex gap-4">
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            D{day.day}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground text-sm mb-1">
                          Day {day.day} — {day.title}
                        </h5>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {day.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            className="flex-1 h-12 bg-ocean text-white hover:bg-ocean/90 font-bold rounded-xl text-base"
            onClick={() => scrollToSection("#contact")}
          >
            Book This Package
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <a
            href="https://wa.me/917319076862"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-white shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function TourPackagesSection() {
  return (
    <section id="packages" className="py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Signature Experiences
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Our Tour Packages
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Meticulously crafted journeys with day-by-day itineraries — every
            detail taken care of
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 xl:grid-cols-2 gap-10"
        >
          {TOUR_PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// SERVICES SECTION
// =============================================

function ServicesSection() {
  const colorMap: Record<string, string> = {
    ocean: "bg-ocean text-white",
    gold: "bg-gold text-white",
    coral: "bg-coral text-white",
  };

  const bgHoverMap: Record<string, string> = {
    ocean: "group-hover:bg-ocean",
    gold: "group-hover:bg-gold",
    coral: "group-hover:bg-coral",
  };

  return (
    <section id="services" className="py-24 px-4 md:px-8 lg:px-16 bg-sand">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            What We Offer
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Everything you need for a seamless travel experience, all in one
            place
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                data-ocid={`services.item.${i + 1}`}
                className="group relative p-8 bg-white rounded-2xl border border-sand-dark hover:border-transparent transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-ocean/5 to-gold/5" />
                <div
                  className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${colorMap[service.color]} shadow-card`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                <div
                  className={`mt-5 text-sm font-semibold text-ocean flex items-center gap-1 transition-all duration-300 ${bgHoverMap[service.color]} group-hover:text-white px-3 py-1.5 rounded-lg w-fit`}
                >
                  Learn More
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// WHY CHOOSE US
// =============================================

function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.32 0.1 248) 0%, oklch(0.22 0.08 260) 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Our Advantage
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Why Choose Travellers Points
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-white/70 text-lg max-w-2xl mx-auto"
          >
            We go beyond booking — we craft experiences that stay with you
            forever
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                data-ocid={`why-us.item.${i + 1}`}
                className="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/30 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <div className="font-display text-2xl font-bold text-gold mb-1">
                  {item.stat}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// DEALS SECTION
// =============================================

function DealsSection() {
  return (
    <section id="deals" className="py-24 px-4 md:px-8 lg:px-16 bg-sand">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Limited Time
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Hot Deals & Offers
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Grab these incredible deals before they're gone — limited
            availability
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.destination}
              variants={fadeUp}
              data-ocid={`deals.item.${i + 1}`}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card card-hover"
            >
              {/* Deal Badge Ribbon */}
              <div className="absolute top-4 left-0 z-10">
                <div className="bg-coral text-white text-xs font-bold px-3 py-1.5 rounded-r-full shadow-md">
                  {deal.badge}
                </div>
              </div>

              {/* Savings Badge */}
              <div className="absolute top-4 right-3 z-10">
                <div className="bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {deal.savings}
                </div>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.destination}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="font-display text-base font-bold text-white leading-tight">
                    {deal.destination}
                  </h3>
                  <p className="text-white/75 text-xs">{deal.country}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Globe className="w-3.5 h-3.5 text-ocean" />
                  <span className="text-muted-foreground text-xs">
                    {deal.nights} nights
                  </span>
                </div>

                <div className="flex items-end gap-2 mb-4">
                  <div className="font-display text-2xl font-bold text-foreground">
                    {deal.currentPrice}
                  </div>
                  <div className="text-muted-foreground text-xs line-through pb-1">
                    {deal.originalPrice}
                  </div>
                </div>

                <Button
                  data-ocid={`deals.button.${i + 1}`}
                  className="w-full bg-ocean text-white hover:bg-ocean/90 rounded-xl font-semibold h-10 text-sm group/btn transition-all duration-200"
                  onClick={() => scrollToSection("#contact")}
                >
                  Book Now
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// TESTIMONIALS SECTION
// =============================================

function TestimonialsSection() {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Stories from the Road
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            What Our Travelers Say
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Real journeys, real memories — hear from those who've traveled with
            us
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              data-ocid={`testimonials.item.${i + 1}`}
              className="relative p-7 bg-sand rounded-2xl border border-sand-dark hover:border-gold/30 hover:shadow-card transition-all duration-300 group"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-5 right-5 font-display text-6xl text-gold/12 leading-none select-none">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star
                    key={`star-${t.name}-${j}`}
                    className="w-4 h-4 text-gold"
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed text-sm mb-5 relative z-10">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean flex items-center justify-center text-white font-bold font-body text-xs shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {t.destination}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// CLIENT REVIEWS SECTION
// =============================================

function ClientReviewsSection() {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Bhutan" | "Darjeeling"
  >("All");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? CLIENT_REVIEWS
      : CLIENT_REVIEWS.filter((r) => r.tag === activeFilter);

  const filters = ["All", "Bhutan", "Darjeeling"] as const;

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 lg:px-16 bg-sand">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Real Experiences
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Client Reviews & Stories
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Photos and videos from our happy travelers in Bhutan and Darjeeling
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center gap-2 mt-8"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                data-ocid={`reviews.tab.${f.toLowerCase()}`}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-ocean text-white shadow-md"
                    : "bg-white text-foreground border border-sand-dark hover:border-ocean hover:text-ocean"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Review Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              variants={fadeUp}
              data-ocid={`reviews.item.${i + 1}`}
              className="bg-white rounded-2xl border border-sand-dark shadow-card overflow-hidden group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              {/* Client Photo Banner */}
              <div className="relative h-52 overflow-hidden bg-sand">
                <img
                  src={review.photo}
                  alt={`${review.name} at ${review.destination}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Destination badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full text-white shadow-md ${
                      review.tag === "Bhutan"
                        ? "bg-amber-600"
                        : "bg-emerald-600"
                    }`}
                  >
                    {review.tripLabel}
                  </span>
                </div>
                {/* Video indicator */}
                {review.hasVideo && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-coral/90 text-white text-xs font-bold rounded-full shadow-md backdrop-blur-sm">
                      <Video className="w-3 h-3" />
                      Video
                    </span>
                  </div>
                )}
                {/* Client name over photo */}
                <div className="absolute bottom-3 left-4">
                  <p className="font-display font-bold text-white text-sm">
                    {review.name}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }, (_, j) => (
                    <Star
                      key={`rstar-${review.id}-${j}`}
                      className="w-4 h-4 text-gold"
                      fill="currentColor"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground/75 text-sm leading-relaxed line-clamp-3 mb-4">
                  "{review.text}"
                </p>

                {/* Video embed button */}
                {review.hasVideo && (
                  <div className="mt-1">
                    {activeVideo === review.id ? (
                      <div
                        className="relative rounded-xl overflow-hidden"
                        style={{ paddingTop: "56.25%" }}
                      >
                        <iframe
                          src={`${review.videoEmbed}?autoplay=1`}
                          title={`Review video by ${review.name}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full rounded-xl"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        data-ocid={`reviews.video.button.${i + 1}`}
                        onClick={() => setActiveVideo(review.id)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-coral/10 hover:bg-coral/20 text-coral border border-coral/30 hover:border-coral/60 rounded-xl font-semibold text-sm transition-all duration-200 group/btn"
                      >
                        <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </div>
                        Watch Video Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Want to share your travel story with us?
          </p>
          <a
            href="https://wa.me/917319076862?text=Hi%2C%20I%20want%20to%20share%20my%20travel%20experience%20with%20Travellers%20Points!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02] shadow-md"
            style={{ backgroundColor: "#25D366" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-white shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share Your Story on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================
// CONTACT SECTION
// =============================================

type FormState = "idle" | "loading" | "success" | "error";

function ContactSection() {
  const { actor } = useActor();
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setFormState("loading");
    try {
      if (!actor) throw new Error("Actor not ready");
      await actor.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.message,
      );
      setFormState("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      setFormState("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 lg:px-16 bg-sand">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Start Planning
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Ready to plan your next adventure? Our travel experts are here to
            help
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div variants={fadeUp}>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                We'd Love to Hear From You
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're dreaming of Bhutan monasteries, Darjeeling tea
                gardens, or exotic beaches — our team is ready to craft your
                perfect journey.
              </p>
            </motion.div>

            {/* WhatsApp CTA highlight */}
            <motion.a
              variants={fadeUp}
              href="https://wa.me/917319076862"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl text-white transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#25D366" }}
            >
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-white"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-sm">Chat on WhatsApp</div>
                <div className="text-white/85 text-xs">
                  +91 73190 76862 — Quick replies!
                </div>
              </div>
            </motion.a>

            {[
              {
                icon: MapPin,
                label: "Our Office",
                value: "Jaigaon, Alipurduar\nWest Bengal, India",
              },
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 73190 76862\nMon–Sat, 9am–7pm IST",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "hello@travellerspoints.com\nWe reply within 24 hours",
              },
            ].map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  variants={fadeUp}
                  className="flex gap-4 p-4 bg-white rounded-xl border border-sand-dark"
                >
                  <div className="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-0.5">
                      {info.label}
                    </div>
                    <div className="text-muted-foreground text-xs whitespace-pre-line">
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-card border border-sand-dark"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => setFormState("idle")}
                    className="bg-ocean text-white hover:bg-ocean/90"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <h4 className="font-display text-xl font-bold text-foreground mb-1">
                    Send Us a Message
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Full Name <span className="text-coral">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.input"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Rahul Sharma"
                        className={`h-11 ${errors.name ? "border-coral focus-visible:ring-coral" : ""}`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-coral">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Email Address <span className="text-coral">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        data-ocid="contact.email.input"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        className={`h-11 ${errors.email ? "border-coral focus-visible:ring-coral" : ""}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-coral">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Phone Number{" "}
                      <span className="text-muted-foreground text-xs">
                        (optional)
                      </span>
                    </label>
                    <Input
                      id="contact-phone"
                      data-ocid="contact.phone.input"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Message <span className="text-coral">*</span>
                    </label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your dream trip — destinations, dates, group size, and any special requests..."
                      rows={5}
                      className={`resize-none ${errors.message ? "border-coral focus-visible:ring-coral" : ""}`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-coral">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {formState === "error" && (
                    <div
                      data-ocid="contact.error_state"
                      className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-sm text-red-600 border border-red-100"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    data-ocid="contact.submit_button"
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full h-12 bg-ocean text-white hover:bg-ocean/90 font-semibold text-base rounded-xl transition-all duration-200 disabled:opacity-70"
                  >
                    {formState === "loading" ? (
                      <>
                        <Loader2
                          data-ocid="contact.loading_state"
                          className="w-4 h-4 mr-2 animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// FOOTER
// =============================================

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "Destinations", href: "#destinations" },
    { label: "Packages", href: "#packages" },
    { label: "Deals", href: "#deals" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer
      className="text-white"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 252) 0%, oklch(0.12 0.04 255) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Travellers Points
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Specializing in Bhutan, Sikkim, Darjeeling, and exotic
              international destinations. We craft journeys that become stories.
            </p>
            <div className="flex items-start gap-2 text-white/60 text-sm mb-4">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>Jaigaon, Alipurduar, West Bengal, India</span>
            </div>
            <p className="text-gold/80 font-display text-lg italic">
              Your journey begins here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-5">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {footerLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid={`footer.link.${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-white/60 hover:text-gold transition-colors text-sm flex items-center gap-1.5 group w-fit"
                >
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-lg mb-5">
              Stay Connected
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Follow us for travel inspiration, exclusive deals, and destination
              guides.
            </p>
            <div className="flex gap-3 mb-5">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    data-ocid={`footer.social.${i + 1}`}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-gold transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </a>
                );
              })}
            </div>
            {/* WhatsApp in footer */}
            <a
              href="https://wa.me/917319076862"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#25D366" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-white"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              +91 73190 76862
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Travellers Points. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with <span className="text-coral">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================
// APP ROOT
// =============================================

export default function App() {
  const [searchFilter, setSearchFilter] = useState("");
  const filterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (query: string) => {
    setSearchFilter(query);
    if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    filterTimeoutRef.current = setTimeout(() => setSearchFilter(""), 10000);
  };

  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection onSearch={handleSearch} />
        <DestinationsSection filter={searchFilter} />
        <TourPackagesSection />
        <ServicesSection />
        <WhyUsSection />
        <DealsSection />
        <TestimonialsSection />
        <ClientReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
