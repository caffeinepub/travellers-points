import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ItineraryDay {
  day: string;
  title: string;
  details: string;
}

interface Package {
  id: string;
  name: string;
  duration: string;
  price: string;
  pickup: string;
  image: string;
  inclusions: string[];
  itinerary: ItineraryDay[];
}

interface Service {
  icon: string;
  name: string;
  description: string;
  detail: string;
}

interface Review {
  text: string;
  author: string;
  location: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  "/assets/generated/bhutan-tigers-nest-hero.dim_1920x1080.jpg",
  "/assets/generated/kashmir-dal-lake-hero.dim_1920x1080.jpg",
  "/assets/generated/darjeeling-tea-hills-hero.dim_1920x1080.jpg",
  "/assets/generated/sikkim-kanchenjunga-hero.dim_1920x1080.jpg",
  "/assets/generated/himalaya-golden-hour.dim_1920x1080.jpg",
  "/assets/generated/manali-mountains.dim_1920x1080.jpg",
  "/assets/generated/sikkim-tsomgo-lake.dim_1920x1080.jpg",
  "/assets/generated/bhutan-punakha-dzong-hero.dim_1920x1080.jpg",
  "/assets/generated/manali-rohtang-hero.dim_1920x1080.jpg",
  "/assets/generated/nepal-everest-hero.dim_1920x1080.jpg",
];

const PACKAGES: Package[] = [
  {
    id: "bhutan-group",
    name: "Bhutan Group Tour",
    duration: "6 Nights / 7 Days",
    price: "₹24,500/person",
    pickup: "Bagdogra Airport or NJP Railway Station",
    image: "/assets/generated/bhutan-tigers-nest.dim_1920x1080.jpg",
    inclusions: [
      "Accommodation (6 nights)",
      "All meals (Breakfast + Dinner)",
      "AC vehicle",
      "Bhutan entry permit & visa",
      "SDF fee",
      "Sightseeing as per itinerary",
      "Tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Check-in hotel. Evening local sightseeing: Zangto Pelri Lhakhang, Crocodile Breeding Centre, Market area.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu (165km, 5–6hrs)",
        details:
          "Visit Chuzom confluence, Buddha Dordenma statue, National Memorial Chorten, Tashichho Dzong.",
      },
      {
        day: "Day 3",
        title: "Thimphu to Punakha (77km, 3hrs)",
        details:
          "Dochu La Pass (108 chortens), Punakha Dzong, Suspension Bridge, Chimi Lhakhang (Fertility Temple).",
      },
      {
        day: "Day 4",
        title: "Punakha to Paro (125km, 4hrs)",
        details:
          "National Museum of Bhutan, Rinpung Dzong, Paro town sightseeing.",
      },
      {
        day: "Day 5",
        title: "Paro — Tiger's Nest",
        details:
          "Tiger's Nest Monastery (Taktshang) hike (3–4hrs). Visit Kyichu Lhakhang temple.",
      },
      {
        day: "Day 6",
        title: "Paro to Phuentsholing (165km)",
        details: "Shopping, overnight Phuentsholing.",
      },
      {
        day: "Day 7",
        title: "Departure",
        details: "Drop to Bagdogra Airport or NJP Railway Station.",
      },
    ],
  },
  {
    id: "bhutan-private",
    name: "Bhutan Private Tour",
    duration: "6 Nights / 7 Days",
    price: "₹43,000/person",
    pickup: "Bagdogra Airport or NJP Railway Station",
    image: "/assets/generated/bhutan-punakha-dzong.dim_800x600.jpg",
    inclusions: [
      "Accommodation (6 nights)",
      "All meals (Breakfast + Dinner)",
      "Private AC vehicle",
      "Bhutan entry permit & visa",
      "SDF fee",
      "Sightseeing as per itinerary",
      "Personal tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Check-in hotel. Evening local sightseeing: Zangto Pelri Lhakhang, Crocodile Breeding Centre, Market area.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu (165km, 5–6hrs)",
        details:
          "Visit Chuzom confluence, Buddha Dordenma statue, National Memorial Chorten, Tashichho Dzong.",
      },
      {
        day: "Day 3",
        title: "Thimphu to Punakha (77km, 3hrs)",
        details:
          "Dochu La Pass (108 chortens), Punakha Dzong, Suspension Bridge, Chimi Lhakhang (Fertility Temple).",
      },
      {
        day: "Day 4",
        title: "Punakha to Paro (125km, 4hrs)",
        details:
          "National Museum of Bhutan, Rinpung Dzong, Paro town sightseeing.",
      },
      {
        day: "Day 5",
        title: "Paro — Tiger's Nest",
        details:
          "Tiger's Nest Monastery (Taktshang) hike (3–4hrs). Visit Kyichu Lhakhang temple.",
      },
      {
        day: "Day 6",
        title: "Paro to Phuentsholing (165km)",
        details: "Shopping, overnight Phuentsholing.",
      },
      {
        day: "Day 7",
        title: "Departure",
        details: "Drop to Bagdogra Airport or NJP Railway Station.",
      },
    ],
  },
  {
    id: "darjeeling",
    name: "Darjeeling Tour",
    duration: "3 Nights / 4 Days",
    price: "₹8,500/person",
    pickup: "NJP Railway Station or Bagdogra Airport",
    image: "/assets/generated/darjeeling-tea-garden.dim_1920x1080.jpg",
    inclusions: [
      "3 nights hotel",
      "Breakfast",
      "AC vehicle",
      "All sightseeing",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Darjeeling",
        details: "Check-in, Mall Road, Chowrasta, Nehru Road evening walk.",
      },
      {
        day: "Day 2",
        title: "Tiger Hill & Beyond",
        details:
          "Tiger Hill sunrise (4am), Ghoom Monastery, Batasia Loop, Rock Garden, Mirik Lake.",
      },
      {
        day: "Day 3",
        title: "Tea Gardens & Culture",
        details:
          "Tea Garden visit, Happy Valley Tea Estate, Himalayan Mountaineering Institute, Zoo, Ropeway.",
      },
      {
        day: "Day 4",
        title: "Departure",
        details: "Drop to NJP Railway Station or Bagdogra Airport.",
      },
    ],
  },
  {
    id: "sikkim",
    name: "Sikkim Tour",
    duration: "5 Nights / 6 Days",
    price: "₹12,500/person",
    pickup: "NJP Railway Station or Bagdogra Airport",
    image: "/assets/generated/sikkim-tsomgo-lake.dim_1920x1080.jpg",
    inclusions: ["5 nights hotel", "Breakfast", "AC vehicle", "All permits"],
    itinerary: [
      {
        day: "Day 1",
        title: "NJP/Bagdogra to Gangtok (4hrs)",
        details: "Check-in, MG Marg evening stroll.",
      },
      {
        day: "Day 2",
        title: "Tsomgo Lake & Nathula",
        details:
          "Tsomgo Lake (12,400 ft), Baba Mandir, Nathula Pass (subject to permit).",
      },
      {
        day: "Day 3",
        title: "Gangtok Local Sightseeing",
        details:
          "Rumtek Monastery, Enchey Monastery, Namgyal Institute of Tibetology, Flower Exhibition Centre.",
      },
      {
        day: "Day 4",
        title: "Gangtok to Pelling (3hrs)",
        details: "Rabdentse Ruins, Pemayangtse Monastery.",
      },
      {
        day: "Day 5",
        title: "Pelling Sightseeing",
        details: "Khecheopalri Lake, Kanchenjunga viewpoint, Singshore Bridge.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details: "Drop to NJP Railway Station or Bagdogra Airport.",
      },
    ],
  },
  {
    id: "nepal",
    name: "Nepal Tour",
    duration: "5 Nights / 6 Days",
    price: "₹15,000/person",
    pickup: "Bagdogra Airport (flight to Kathmandu) or direct road",
    image: "/assets/generated/nepal-kathmandu.dim_800x600.jpg",
    inclusions: [
      "5 nights hotel",
      "Breakfast",
      "All sightseeing",
      "Tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Kathmandu",
        details: "Pashupatinath Temple, Bouddhanath Stupa.",
      },
      {
        day: "Day 2",
        title: "Kathmandu Valley",
        details:
          "Swayambhunath (Monkey Temple), Patan Durbar Square, Patan Museum.",
      },
      {
        day: "Day 3",
        title: "Kathmandu to Pokhara (7hrs)",
        details: "Fewa Lake boat ride, Tal Barahi Temple.",
      },
      {
        day: "Day 4",
        title: "Pokhara Sightseeing",
        details:
          "Sarangkot sunrise, World Peace Pagoda, Devi's Fall, Gupteshwor Cave.",
      },
      {
        day: "Day 5",
        title: "Pokhara to Kathmandu",
        details: "Manakamana Cable Car.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details: "Transfer to airport for departure.",
      },
    ],
  },
  {
    id: "manali",
    name: "Manali Tour",
    duration: "5 Nights / 6 Days",
    price: "₹14,000/person",
    pickup: "Chandigarh or Delhi (own arrangement)",
    image: "/assets/generated/manali-rohtang.dim_800x600.jpg",
    inclusions: [
      "5 nights hotel",
      "Breakfast",
      "All sightseeing",
      "AC vehicle",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Manali",
        details: "Check-in, Mall Road, Hadimba Temple evening.",
      },
      {
        day: "Day 2",
        title: "Solang Valley",
        details: "Snow activities, Rohtang Pass permit arrangements.",
      },
      {
        day: "Day 3",
        title: "Rohtang Pass (13,050 ft)",
        details: "Beas Kund, snow activities (seasonal).",
      },
      {
        day: "Day 4",
        title: "Local Sightseeing",
        details:
          "Naggar Castle, Nicholas Roerich Art Gallery, Old Manali market.",
      },
      {
        day: "Day 5",
        title: "Parvati Valley",
        details: "Manikaran Sahib Gurudwara, Kasol village, Parvati Valley.",
      },
      { day: "Day 6", title: "Departure", details: "Drop to Chandigarh." },
    ],
  },
  {
    id: "shimla",
    name: "Shimla Tour",
    duration: "3 Nights / 4 Days",
    price: "₹9,500/person",
    pickup: "Chandigarh or Delhi (own arrangement)",
    image: "/assets/generated/shimla-mall-road.dim_800x600.jpg",
    inclusions: [
      "3 nights hotel",
      "Breakfast",
      "All sightseeing",
      "AC vehicle",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Shimla",
        details: "The Ridge, Mall Road, Christ Church, Lakkar Bazaar.",
      },
      {
        day: "Day 2",
        title: "Kufri Excursion",
        details:
          "Fun World, Himalayan Wildlife Zoo, Indira Tourist Park, horse riding.",
      },
      {
        day: "Day 3",
        title: "Local Sightseeing",
        details:
          "Jakhoo Temple, Summer Hill, Prospect Hill, Chadwick Falls, Glen Forest.",
      },
      { day: "Day 4", title: "Departure", details: "Drop to Chandigarh." },
    ],
  },
  {
    id: "kashmir",
    name: "Kashmir Tour",
    duration: "5 Nights / 6 Days",
    price: "₹18,000/person",
    pickup: "Srinagar Airport",
    image: "/assets/generated/darjeeling-tea-garden.dim_1920x1080.jpg",
    inclusions: [
      "5N houseboat + hotel",
      "Breakfast + Dinner",
      "Shikara ride",
      "AC vehicle",
      "All sightseeing",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Srinagar",
        details: "Shikara ride Dal Lake, houseboat check-in.",
      },
      {
        day: "Day 2",
        title: "Gulmarg (8,694 ft)",
        details: "Gondola cable car, meadows, skiing (seasonal).",
      },
      {
        day: "Day 3",
        title: "Pahalgam",
        details: "Betaab Valley, Aru Valley, Chandanwari.",
      },
      {
        day: "Day 4",
        title: "Srinagar Local",
        details:
          "Mughal Gardens (Nishat, Shalimar), Shankaracharya Temple, Hazratbal Shrine.",
      },
      {
        day: "Day 5",
        title: "Sonamarg",
        details: "Thajiwas Glacier, pony rides, scenic drive.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details: "Drop to Srinagar Airport.",
      },
    ],
  },
  {
    id: "mathura",
    name: "Mathura Tour",
    duration: "2 Nights / 3 Days",
    price: "₹6,500/person",
    pickup: "Mathura Railway Station or Agra",
    image: "/assets/generated/mathura-krishna-temple.dim_800x600.jpg",
    inclusions: [
      "2 nights hotel",
      "Breakfast",
      "All sightseeing",
      "AC vehicle",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival Mathura",
        details:
          "Krishna Janmabhoomi Temple, Dwarkadhish Temple, Vishram Ghat (evening aarti).",
      },
      {
        day: "Day 2",
        title: "Vrindavan",
        details: "ISKCON Temple, Banke Bihari Temple, Prem Mandir, Rang Bhumi.",
      },
      {
        day: "Day 3",
        title: "Govardhan & Departure",
        details: "Govardhan Parikrama (partial), Radha Kund, Departure.",
      },
    ],
  },
];

const SERVICES: Service[] = [
  {
    icon: "✈️",
    name: "Flights",
    description: "Domestic & international flight bookings",
    detail:
      "We assist with domestic and international flight bookings for all your tour destinations. Get best rates for Bagdogra, Kolkata, Delhi, Srinagar, Kathmandu routes. Contact us on WhatsApp for availability and current pricing.",
  },
  {
    icon: "🏨",
    name: "Hotels",
    description: "Premium hotel & resort bookings",
    detail:
      "Premium hotel and resort bookings across all destinations — Bhutan, Darjeeling, Sikkim, Nepal, Manali, Shimla, Kashmir. Handpicked properties ensuring comfort and value for your stay.",
  },
  {
    icon: "🗺️",
    name: "Tour Packages",
    description: "Complete customizable tour packages",
    detail:
      "Complete tour packages with accommodation, meals, transport, and guided sightseeing. All our packages are fully customizable as per your requirements. Group and private options available for all budgets.",
  },
  {
    icon: "🛡️",
    name: "Travel Insurance",
    description: "Trip protection & travel insurance",
    detail:
      "Travel insurance guidance for domestic and international tours. Protect your trip against cancellations, medical emergencies, and travel delays. We help you choose the right coverage for peace of mind.",
  },
];

const REVIEWS: Review[] = [
  {
    text: "Amazing Bhutan trip organized by Travellers Points! Everything was perfectly arranged — hotels, transport, guide. Highly recommended!",
    author: "Rahul S.",
    location: "Kolkata",
  },
  {
    text: "Our Darjeeling and Sikkim package was excellent. Very professional team, great value for money.",
    author: "Priya M.",
    location: "West Bengal",
  },
  {
    text: "Kashmir trip was absolutely breathtaking. Travellers Points made the whole experience stress-free and memorable.",
    author: "Amit K.",
    location: "Delhi",
  },
  {
    text: "Best Bhutan Group Tour! Met wonderful people, saw amazing places. Will definitely book again.",
    author: "Sneha D.",
    location: "Siliguri",
  },
  {
    text: "Nepal tour was perfectly planned. All temples and viewpoints covered. Great guide provided.",
    author: "Rohan B.",
    location: "Kolkata",
  },
];

const TAXI_ROUTES = [
  { from: "Jaigaon", to: "Siliguri" },
  { from: "Jaigaon", to: "Darjeeling" },
  { from: "Jaigaon", to: "Gangtok (Sikkim)" },
  { from: "Jaigaon", to: "Bagdogra Airport" },
  { from: "Jaigaon", to: "NJP Railway Station" },
];

const WA_NUMBER = "917719264029";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function waLink(msg: string) {
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Packages", href: "#packages" },
    { label: "Services", href: "#services" },
    { label: "Taxi", href: "#taxi" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-luxury border-b border-gold/10"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3"
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/image_b1a1f18a-1.png"
              alt="Travellers Points"
              className="h-10 w-auto"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-display text-lg font-semibold text-gold hidden sm:block">
              Travellers Points
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link text-sm font-body font-medium tracking-wide"
                data-ocid={"nav.link"}
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink("Hi, I would like to enquire about tour packages.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gold text-charcoal font-body font-semibold text-sm rounded-sm tracking-wide hover:bg-gold-light transition-colors duration-200"
              data-ocid="nav.primary_button"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-cream p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <div
              className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-charcoal border-t border-gold/10 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block px-4 py-3 text-cream-dark hover:text-gold hover:bg-charcoal-light transition-colors font-body"
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Slides */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="hero-slide"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <p className="font-body text-gold tracking-[0.3em] text-sm md:text-base mb-4 uppercase">
          Welcome to
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-gold-gradient mb-6 leading-tight">
          TRAVELLERS
          <br />
          <span className="italic font-normal">Points</span>
        </h1>
        <div className="gold-divider mx-auto mb-6" />
        <p className="font-display text-xl md:text-2xl text-cream italic mb-3">
          From your dream to the world.
        </p>
        <p className="font-body text-cream-dark text-sm md:text-base tracking-widest mb-10">
          Expert tours to
          Bhutan&nbsp;•&nbsp;Darjeeling&nbsp;•&nbsp;Sikkim&nbsp;•&nbsp;Nepal&nbsp;•&nbsp;Kashmir
        </p>
        <a
          href="#packages"
          className="inline-block px-10 py-4 border border-gold text-gold font-body font-medium tracking-widest text-sm uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
          data-ocid="hero.primary_button"
        >
          Explore Packages
        </a>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {HERO_IMAGES.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setCurrent(i)}
            className={`w-8 h-0.5 transition-all duration-300 ${
              i === current ? "bg-gold" : "bg-white/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Bhutan Sub-Packages ────────────────────────────────────────────────────────
const BHUTAN_PACKAGES: Package[] = [
  {
    id: "bhutan-4n5d",
    name: "Bhutan 4 Nights 5 Days",
    duration: "4 Nights / 5 Days",
    price: "On Request",
    pickup: "Bagdogra Airport or NJP Railway Station",
    image: "/assets/generated/bhutan-tigers-nest.dim_1920x1080.jpg",
    inclusions: [
      "Accommodation (4 nights)",
      "All meals (Breakfast + Dinner)",
      "AC vehicle",
      "Bhutan entry permit & visa",
      "SDF fee",
      "Sightseeing as per itinerary",
      "Tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Arrive at Phuentsholing (Bhutan border town). Check-in hotel. Evening local sightseeing: Zangto Pelri Lhakhang, Crocodile Breeding Centre, Market area.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu (165km, 5–6hrs)",
        details:
          "Proceed to Thimphu, Bhutan's capital. Visit Chuzom confluence, Buddha Dordenma statue, National Memorial Chorten, Tashichho Dzong. Overnight Thimphu.",
      },
      {
        day: "Day 3",
        title: "Thimphu to Punakha (77km, 3hrs)",
        details:
          "Cross Dochu La Pass (108 chortens, Himalayan views). Visit Punakha Dzong, Suspension Bridge, Chimi Lhakhang (Fertility Temple). Overnight Punakha.",
      },
      {
        day: "Day 4",
        title: "Punakha to Paro (125km, 4hrs)",
        details:
          "Drive to Paro. Visit National Museum of Bhutan, Rinpung Dzong, Paro town sightseeing. Overnight Paro.",
      },
      {
        day: "Day 5",
        title: "Paro Departure",
        details:
          "Morning at leisure. Drop to Bagdogra Airport or NJP Railway Station. Tour ends with sweet memories of Bhutan.",
      },
    ],
  },
  {
    id: "bhutan-5n6d",
    name: "Bhutan 5 Nights 6 Days",
    duration: "5 Nights / 6 Days",
    price: "On Request",
    pickup: "Bagdogra Airport or NJP Railway Station",
    image: "/assets/generated/bhutan-punakha-dzong.dim_800x600.jpg",
    inclusions: [
      "Accommodation (5 nights)",
      "All meals (Breakfast + Dinner)",
      "AC vehicle",
      "Bhutan entry permit & visa",
      "SDF fee",
      "Sightseeing as per itinerary",
      "Tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Arrive at Phuentsholing. Check-in hotel. Evening local sightseeing: Zangto Pelri Lhakhang, Crocodile Breeding Centre, Market area.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu (165km, 5–6hrs)",
        details:
          "Drive to Thimphu via Chuzom confluence. Visit Buddha Dordenma statue, National Memorial Chorten, Tashichho Dzong. Overnight Thimphu.",
      },
      {
        day: "Day 3",
        title: "Thimphu to Punakha (77km, 3hrs)",
        details:
          "Cross Dochu La Pass. Visit Punakha Dzong, Suspension Bridge, Chimi Lhakhang. Overnight Punakha.",
      },
      {
        day: "Day 4",
        title: "Punakha to Paro (125km, 4hrs)",
        details:
          "Drive to Paro. Visit National Museum, Rinpung Dzong, Paro town. Overnight Paro.",
      },
      {
        day: "Day 5",
        title: "Paro — Tiger's Nest Hike",
        details:
          "Full day Tiger's Nest Monastery (Taktshang) hike (3–4hrs, 900m ascent). Visit Kyichu Lhakhang temple. Overnight Paro.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details:
          "Morning at leisure. Drop to Bagdogra Airport or NJP Railway Station. Tour ends.",
      },
    ],
  },
  {
    id: "bhutan-group-6n7d",
    name: "Bhutan Group Tour",
    duration: "6 Nights / 7 Days",
    price: "₹24,500/person",
    pickup: "Bagdogra Airport or NJP Railway Station",
    image: "/assets/generated/bhutan-tigers-nest.dim_1920x1080.jpg",
    inclusions: [
      "Accommodation (6 nights)",
      "All meals (Breakfast + Dinner)",
      "AC vehicle",
      "Bhutan entry permit & visa",
      "SDF fee",
      "Sightseeing as per itinerary",
      "Tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Check-in hotel. Evening local sightseeing: Zangto Pelri Lhakhang, Crocodile Breeding Centre, Market area.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu (165km, 5–6hrs)",
        details:
          "Visit Chuzom confluence, Buddha Dordenma statue, National Memorial Chorten, Tashichho Dzong.",
      },
      {
        day: "Day 3",
        title: "Thimphu to Punakha (77km, 3hrs)",
        details:
          "Dochu La Pass (108 chortens), Punakha Dzong, Suspension Bridge, Chimi Lhakhang (Fertility Temple).",
      },
      {
        day: "Day 4",
        title: "Punakha to Paro (125km, 4hrs)",
        details:
          "National Museum of Bhutan, Rinpung Dzong, Paro town sightseeing.",
      },
      {
        day: "Day 5",
        title: "Paro — Tiger's Nest",
        details:
          "Tiger's Nest Monastery (Taktshang) hike (3–4hrs). Visit Kyichu Lhakhang temple.",
      },
      {
        day: "Day 6",
        title: "Paro to Phuentsholing (165km)",
        details: "Shopping, overnight Phuentsholing.",
      },
      {
        day: "Day 7",
        title: "Departure",
        details: "Drop to Bagdogra Airport or NJP Railway Station.",
      },
    ],
  },
  {
    id: "bhutan-7n8d",
    name: "Bhutan 7 Nights 8 Days",
    duration: "7 Nights / 8 Days",
    price: "On Request",
    pickup: "Bagdogra Airport or NJP Railway Station",
    image: "/assets/generated/bhutan-punakha-dzong.dim_800x600.jpg",
    inclusions: [
      "Accommodation (7 nights)",
      "All meals (Breakfast + Dinner)",
      "AC vehicle",
      "Bhutan entry permit & visa",
      "SDF fee",
      "Sightseeing as per itinerary",
      "Tour guide",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Arrive at Phuentsholing. Check-in hotel. Evening local sightseeing: Zangto Pelri Lhakhang, Crocodile Breeding Centre, Market area.",
      },
      {
        day: "Day 2",
        title: "Phuentsholing to Thimphu (165km, 5–6hrs)",
        details:
          "Drive to Thimphu. Visit Chuzom confluence, Buddha Dordenma statue, National Memorial Chorten, Tashichho Dzong. Overnight Thimphu.",
      },
      {
        day: "Day 3",
        title: "Thimphu — Dochula Pass & Punakha",
        details:
          "Morning city tour: Folk Heritage Museum, Textile Museum, Motithang Takin Preserve. Cross Dochu La Pass (3,100m). Punakha Dzong, Suspension Bridge. Overnight Punakha.",
      },
      {
        day: "Day 4",
        title: "Wangdue Phodrang Exploration",
        details:
          "Visit Wangdue Phodrang Dzong (restored 17th-century fortress), Gangtey Gonpa (Black-necked Crane Sanctuary), Phobjikha Valley scenic drive. Overnight Punakha/Wangdue.",
      },
      {
        day: "Day 5",
        title: "Punakha to Paro (125km, 4hrs)",
        details:
          "Drive to Paro. Visit National Museum of Bhutan, Rinpung Dzong, Paro town sightseeing. Overnight Paro.",
      },
      {
        day: "Day 6",
        title: "Paro — Tiger's Nest Hike",
        details:
          "Full day Tiger's Nest Monastery (Taktshang) hike (3–4hrs). Visit Kyichu Lhakhang temple. Overnight Paro.",
      },
      {
        day: "Day 7",
        title: "Paro Local Sightseeing",
        details:
          "Visit Drukgyal Dzong (ruins of ancient fortress), Chelela Pass (highest motorable road, 3,810m), Bondey Village. Evening leisure in Paro market. Overnight Phuentsholing.",
      },
      {
        day: "Day 8",
        title: "Departure",
        details:
          "Drop to Bagdogra Airport or NJP Railway Station. Tour ends with unforgettable Bhutan memories.",
      },
    ],
  },
];

// ── Bhutan Packages Modal ──────────────────────────────────────────────────────
function BhutanSubPackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const [open, setOpen] = useState(false);

  const waMsg = encodeURIComponent(
    `Hi, I am interested in the ${pkg.name} (${pkg.duration}). Please share details and pricing.`,
  );
  const waLink = `https://wa.me/917719264029?text=${waMsg}`;

  return (
    <div
      className="bg-charcoal-light rounded-sm overflow-hidden shadow-card border border-gold/10 flex flex-col"
      data-ocid={`bhutan.item.${index + 1}`}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <span className="text-xs font-body text-cream-dark bg-black/60 px-2 py-0.5 rounded-sm">
            {pkg.duration}
          </span>
        </div>
      </div>

      <div
        className="px-4 pt-3 pb-2 border-b border-gold/20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.13 82 / 0.15), oklch(0.75 0.13 82 / 0.05))",
        }}
      >
        <h4 className="font-display text-base text-gold font-semibold">
          {pkg.name}
        </h4>
        <p className="font-body text-cream-dark text-xs mt-0.5">
          {pkg.duration}
        </p>
      </div>

      <div className="px-4 py-3 space-y-1.5 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-gold text-xs">💰</span>
          <span className="font-body text-cream font-semibold text-sm">
            {pkg.price}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gold text-xs mt-0.5">📍</span>
          <span className="font-body text-cream-dark text-xs">
            {pkg.pickup}
          </span>
        </div>
        <p className="font-body text-gold text-xs italic">
          Customized package available on request
        </p>
      </div>

      <div className="px-4 pb-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-1.5 px-3 border border-gold/30 text-gold text-xs font-body hover:bg-gold/10 transition-colors rounded-sm"
          data-ocid={`bhutan.toggle.${index + 1}`}
        >
          <span>{open ? "Hide Itinerary" : "View Itinerary"}</span>
          <span
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
      </div>

      {open && (
        <div className="px-4 pb-4 space-y-2.5 border-t border-gold/10 pt-3">
          {pkg.itinerary.map((day) => (
            <div key={day.day} className="flex gap-2">
              <div className="flex-shrink-0">
                <span className="inline-block bg-gold text-charcoal text-xs font-body font-semibold px-2 py-0.5 rounded-sm">
                  {day.day}
                </span>
              </div>
              <div>
                <p className="font-body text-cream text-xs font-medium">
                  {day.title}
                </p>
                <p className="font-body text-cream-dark text-xs mt-0.5 leading-relaxed">
                  {day.details}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-3 p-2.5 bg-charcoal/50 rounded-sm border border-gold/10">
            <p className="font-body text-gold text-xs font-semibold uppercase tracking-wider mb-1.5">
              Inclusions
            </p>
            <ul className="space-y-1">
              {pkg.inclusions.map((inc) => (
                <li
                  key={inc}
                  className="font-body text-cream-dark text-xs flex items-center gap-1.5"
                >
                  <span className="text-gold">✓</span> {inc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="px-4 pb-4 pt-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-sm font-body font-semibold text-white text-xs transition-all hover:opacity-90"
          style={{ backgroundColor: "#25D366" }}
          data-ocid={`bhutan.primary_button.${index + 1}`}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-3.5 h-3.5 fill-current"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Book on Request
        </a>
      </div>
    </div>
  );
}

function BhutanPackagesModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl w-full bg-charcoal border border-gold/30 text-cream max-h-[90vh] overflow-y-auto"
        data-ocid="bhutan.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-gold text-center">
            Bhutan Tour Packages
          </DialogTitle>
          <p className="font-body text-cream-dark text-sm text-center mt-1">
            Choose from our curated Bhutan experiences — from quick getaways to
            immersive journeys
          </p>
          <div className="gold-divider" />
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-2">
          {BHUTAN_PACKAGES.map((pkg, i) => (
            <BhutanSubPackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
        <div className="text-center mt-4 pt-4 border-t border-gold/20">
          <p className="font-body text-cream-dark text-xs">
            All packages include Bhutan entry permits, SDF fee, accommodation,
            meals & guided sightseeing.
            <br />
            For custom itineraries, contact us on WhatsApp.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Package Card ───────────────────────────────────────────────────────────────
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const [open, setOpen] = useState(false);
  const [bhutanModalOpen, setBhutanModalOpen] = useState(false);
  const isBhutan = pkg.id === "bhutan-group" || pkg.id === "bhutan-private";

  return (
    <div
      className="package-card bg-charcoal-light rounded-sm overflow-hidden shadow-card border border-gold/10"
      data-ocid={`packages.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-xs font-body text-cream-dark bg-black/50 px-2 py-1 rounded-sm">
            {pkg.duration}
          </span>
        </div>
      </div>

      {/* Header */}
      <div
        className="px-5 pt-4 pb-3 border-b border-gold/20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.13 82 / 0.15), oklch(0.75 0.13 82 / 0.05))",
        }}
      >
        <h3 className="font-display text-lg text-gold font-semibold">
          {pkg.name}
        </h3>
        <p className="font-body text-cream-dark text-sm mt-0.5">
          {pkg.duration}
        </p>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gold text-sm">💰</span>
          <span className="font-body text-cream font-semibold">
            {pkg.price}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-gold text-sm mt-0.5">📍</span>
          <span className="font-body text-cream-dark text-sm">
            {pkg.pickup}
          </span>
        </div>
        <p className="font-body text-gold text-xs italic mt-2">
          Customized package available on request
        </p>
      </div>

      {/* Toggle itinerary */}
      <div className="px-5 pb-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-2 px-3 border border-gold/30 text-gold text-sm font-body hover:bg-gold/10 transition-colors rounded-sm"
          data-ocid={`packages.toggle.${index + 1}`}
        >
          <span>{open ? "Hide Itinerary" : "View Itinerary"}</span>
          <span
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
      </div>

      {/* Itinerary */}
      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-gold/10 pt-4">
          {pkg.itinerary.map((day) => (
            <div key={day.day} className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="inline-block bg-gold text-charcoal text-xs font-body font-semibold px-2 py-0.5 rounded-sm">
                  {day.day}
                </span>
              </div>
              <div>
                <p className="font-body text-cream text-sm font-medium">
                  {day.title}
                </p>
                <p className="font-body text-cream-dark text-xs mt-0.5 leading-relaxed">
                  {day.details}
                </p>
              </div>
            </div>
          ))}

          {/* Inclusions */}
          <div className="mt-4 p-3 bg-charcoal/50 rounded-sm border border-gold/10">
            <p className="font-body text-gold text-xs font-semibold uppercase tracking-wider mb-2">
              Inclusions
            </p>
            <ul className="space-y-1">
              {pkg.inclusions.map((inc) => (
                <li
                  key={inc}
                  className="font-body text-cream-dark text-xs flex items-center gap-1.5"
                >
                  <span className="text-gold">✓</span> {inc}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp book button */}
          <a
            href={waLink(
              `Hi, I am interested in booking the ${pkg.name} tour package. Please share details.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-sm font-body font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
            data-ocid={`packages.primary_button.${index + 1}`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-4 h-4 fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Book on Request
          </a>
        </div>
      )}

      {/* Bhutan Packages CTA */}
      {isBhutan && (
        <div className="px-5 pb-5 pt-2 border-t border-gold/20">
          <button
            type="button"
            onClick={() => setBhutanModalOpen(true)}
            className="w-full py-3 px-4 bg-gold text-charcoal font-body font-bold text-sm rounded-sm hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
            data-ocid={`packages.open_modal_button.${index + 1}`}
          >
            <span>🏔️</span>
            View All Bhutan Packages
          </button>
          <BhutanPackagesModal
            open={bhutanModalOpen}
            onClose={() => setBhutanModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

// ── Packages Section ───────────────────────────────────────────────────────────
const PKG_BG_IMAGES = [
  "/assets/generated/bg-bhutan-tigers-nest.dim_1920x1080.jpg",
  "/assets/generated/bg-darjeeling-tea-hills.dim_1920x1080.jpg",
  "/assets/generated/bg-sikkim-tsomgo-lake.dim_1920x1080.jpg",
];

function PackagesSection() {
  const [pkgBg, setPkgBg] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setPkgBg((p) => (p + 1) % PKG_BG_IMAGES.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <section id="packages" className="py-20 relative overflow-hidden">
      {/* Sliding background */}
      {PKG_BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 overflow-hidden"
          style={{
            opacity: i === pkgBg ? 1 : 0,
            zIndex: 0,
          }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            aria-hidden="true"
          />
        </div>
      ))}
      {/* Dark overlay so text & cards remain readable */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            Our Tour Packages
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Service Modal ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group bg-charcoal-light border border-gold/10 rounded-sm p-8 text-center hover:border-gold/40 hover:shadow-glow transition-all duration-300 w-full"
        data-ocid={`services.open_modal_button.${index + 1}`}
      >
        <span className="text-5xl block mb-4">{service.icon}</span>
        <h3 className="font-display text-xl text-gold mb-2">{service.name}</h3>
        <p className="font-body text-cream-dark text-sm">
          {service.description}
        </p>
        <span className="inline-block mt-4 text-xs font-body text-gold/60 group-hover:text-gold transition-colors">
          Click for details →
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-charcoal-light border border-gold/20 text-cream max-w-md"
          data-ocid={`services.dialog.${index + 1}`}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gold flex items-center gap-3">
              <span>{service.icon}</span> {service.name}
            </DialogTitle>
          </DialogHeader>
          <p className="font-body text-cream-dark leading-relaxed text-sm">
            {service.detail}
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href={waLink(
                `Hi, I would like to enquire about your ${service.name} service.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-sm font-body font-semibold text-white text-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25D366" }}
              data-ocid={`services.primary_button.${index + 1}`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enquire on WhatsApp
            </a>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gold/30 text-cream hover:bg-gold/10"
              data-ocid={`services.close_button.${index + 1}`}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20"
      style={{ background: "oklch(0.16 0.02 250)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            Our Services
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Taxi Section ───────────────────────────────────────────────────────────────
function TaxiSection() {
  return (
    <section id="taxi" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Transportation
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            Local Taxi Services
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-cream-dark mt-4 text-sm">
            Reliable taxi services from Jaigaon to key destinations
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {TAXI_ROUTES.map((route) => (
            <div
              key={route.to}
              className="bg-charcoal-light border border-gold/10 rounded-sm p-5 flex items-center gap-4 hover:border-gold/30 transition-colors"
            >
              <span className="text-3xl">🚗</span>
              <div>
                <p className="font-body text-cream font-medium text-sm">
                  {route.from} → {route.to}
                </p>
                <p className="font-body text-gold text-xs mt-1">
                  Contact for pricing
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={waLink(
              "Hi, I would like to enquire about taxi services from Jaigaon.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#25D366" }}
            data-ocid="taxi.primary_button"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-5 h-5 fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enquire About Pricing
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Reviews Section ────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-20"
      style={{ background: "oklch(0.16 0.02 250)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            What Our Travellers Say
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.author}
              className="bg-charcoal-light border border-gold/10 rounded-sm p-6 hover:border-gold/30 transition-all duration-300"
              data-ocid={`reviews.item.${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {["1", "2", "3", "4", "5"].map((s) => (
                  <span key={s} className="text-gold text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-body text-cream-dark text-sm leading-relaxed italic mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                  <span className="font-display text-gold text-sm font-semibold">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body text-cream text-sm font-medium">
                    {review.author}
                  </p>
                  <p className="font-body text-cream-dark text-xs">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact Section ────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name} (${form.phone}). ${form.message}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
            Contact Us
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-cream-dark mt-4 text-sm">
            Contact us to plan your dream tour
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-gold mb-6">
                Travellers Points
              </h3>
              <p className="font-body text-cream-dark text-sm leading-relaxed">
                Your trusted travel partner for unforgettable journeys to
                Bhutan, Darjeeling, Sikkim, Nepal, Manali, Shimla, Kashmir, and
                Mathura. From your dream to the world.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value: "Jaigaon, Alipurduar, West Bengal",
                },
                { icon: "📞", label: "Phone", value: "7719264029" },
                { icon: "💬", label: "WhatsApp", value: "7719264029" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-body text-gold text-xs font-semibold uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-body text-cream text-sm mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={waLink(
                "Hi, I would like to plan a tour with Travellers Points.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#25D366" }}
              data-ocid="contact.primary_button"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-charcoal-light border border-gold/10 rounded-sm p-8"
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="font-body text-cream-dark text-xs uppercase tracking-wider"
              >
                Your Name
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter your name"
                className="bg-charcoal border-gold/20 text-cream placeholder:text-cream-dark/60 focus:border-gold/50 focus:ring-0"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="font-body text-cream-dark text-xs uppercase tracking-wider"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                className="bg-charcoal border-gold/20 text-cream placeholder:text-cream-dark/60 focus:border-gold/50 focus:ring-0"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="font-body text-cream-dark text-xs uppercase tracking-wider"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="Enter your phone number"
                className="bg-charcoal border-gold/20 text-cream placeholder:text-cream-dark/60 focus:border-gold/50 focus:ring-0"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="message"
                className="font-body text-cream-dark text-xs uppercase tracking-wider"
              >
                Message
              </Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                placeholder="Tell us about your dream trip..."
                rows={4}
                className="bg-charcoal border-gold/20 text-cream placeholder:text-cream-dark/60 focus:border-gold/50 focus:ring-0 resize-none"
                data-ocid="contact.textarea"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-charcoal font-body font-semibold tracking-widest text-sm uppercase hover:bg-gold-light transition-colors duration-200 rounded-sm"
              data-ocid="contact.submit_button"
            >
              {sent ? "Message Sent! ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-12 border-t border-gold/10"
      style={{ background: "oklch(0.12 0.02 250)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/image_b1a1f18a-1.png"
                alt="Travellers Points"
                className="h-10 w-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="font-display text-lg text-gold">
                Travellers Points
              </span>
            </div>
            <p className="font-display text-cream-dark text-sm italic">
              From your dream to the world.
            </p>
            <p className="font-body text-cream-dark/90 text-xs mt-3 leading-relaxed">
              Expert travel agency specializing in tours to Bhutan, Darjeeling,
              Sikkim, Nepal, Manali, Shimla, Kashmir, and Mathura.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-gold text-xs uppercase tracking-wider font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Packages",
                "Services",
                "Taxi",
                "Reviews",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-cream-dark text-sm hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-gold text-xs uppercase tracking-wider font-semibold mb-4">
              Contact
            </h4>
            <address className="not-italic space-y-2">
              <p className="font-body text-cream-dark text-sm">
                Jaigaon, Alipurduar
              </p>
              <p className="font-body text-cream-dark text-sm">
                West Bengal, India
              </p>
              <p className="font-body text-cream-dark text-sm mt-2">
                <a
                  href="tel:7719264029"
                  className="hover:text-gold transition-colors"
                >
                  📞 7719264029
                </a>
              </p>
              <p className="font-body text-cream-dark text-sm">
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  💬 WhatsApp: 7719264029
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-cream-dark/80 text-xs">
            © {year} Travellers Points. All rights reserved.
          </p>
          <p className="font-body text-cream-dark/60 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Float ─────────────────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a
      href={WA_BASE}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-luxury hover:scale-110 transition-transform duration-200"
      style={{ backgroundColor: "#25D366" }}
      data-ocid="whatsapp.button"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="w-7 h-7 fill-white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <PackagesSection />
        <ServicesSection />
        <TaxiSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
