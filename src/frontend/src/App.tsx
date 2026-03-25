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
  exclusions?: string[];
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
        title: "Arrival and Phuentsholing",
        details:
          "Pick-up from Bagdogra Airport (IXB) or New Jalpaiguri (NJP) and drive to Phuentsholing. Check in to the hotel and spend the evening exploring Phuentsholing's monasteries, parks, and nightlife.",
      },
      {
        day: "Day 2",
        title: "Journey to Thimphu",
        details:
          "After breakfast and immigration, drive to Thimphu. Stopovers at Kharbandi Gumpa, Chukha Waterfall, Chukha Dam, and Dharma Kaya Stupas. Evening guided walk around Thimphu's Clock Tower Square.",
      },
      {
        day: "Day 3",
        title: "Excursion to Punakha",
        details:
          "Drive to Punakha with stops at Dochula Pass and the Suspension Bridge. Visit Punakha Dzong and the Two Rivers viewpoint. Optional activities: River rafting and riverside lunch. Return to Thimphu for the night.",
      },
      {
        day: "Day 4",
        title: "Thimphu Sightseeing & Drive to Paro",
        details:
          "Morning sightseeing in Thimphu: Simtokha Dzong, Buddha Dordenma, Tashichho Dzong, Simply Bhutan, and the Takin Preserve Zoo. Drive to Paro, stopping at the historic Tachogang Lhakhang iron chain bridge. Evening free time to explore Paro local market and nightlife.",
      },
      {
        day: "Day 5",
        title: "Hike to Tiger's Nest",
        details:
          "Early morning hike to Taktshang Lhakhang (Tiger's Nest). Stop at the canteen halfway for views and rest. Optional: Relaxing hot stone bath in Paro.",
      },
      {
        day: "Day 6",
        title: "Paro Sightseeing & Drive back to Phuentsholing",
        details:
          "Visit Paro Ta Dzong in the morning. Sightseeing en route while driving back to Phuentsholing. Free evening in Phuentsholing.",
      },
      {
        day: "Day 7",
        title: "Departure",
        details:
          "Drive from Phuentsholing to Bagdogra Airport or New Jalpaiguri (NJP) for your flight home.",
      },
    ],
    exclusions: [
      "Air/train tickets",
      "Personal expenses",
      "Adventure activities (rafting, etc.)",
      "Travel insurance",
      "Any item not mentioned in inclusions",
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
      "Premium hotel and resort bookings across all destinations — Bhutan, Darjeeling, Sikkim. Handpicked properties ensuring comfort and value for your stay.",
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
  {
    icon: "🎫",
    name: "Flight Booking",
    description: "Hassle-free flight ticket booking",
    detail:
      "Book domestic and international flight tickets with ease. We handle seat selection, check-in assistance, and the best available fares for all routes including Bagdogra (IXB), Kolkata, Delhi, Srinagar, Kathmandu, and more. Get special group fares for tour packages. Contact us on WhatsApp for instant quotes.",
  },
  {
    icon: "🚂",
    name: "Tatkal Train Booking",
    description: "Tatkal & regular train ticket booking",
    detail:
      "We assist with Tatkal and regular IRCTC train ticket bookings. Fast confirmation on Tatkal quota for NJP (New Jalpaiguri), Alipurduar, Kolkata, and other major routes. No more waiting in queues — just WhatsApp us with your travel details for prompt booking assistance.",
  },
];

const REVIEWS: Review[] = [
  {
    text: "Amazing Bhutan trip organized by Traveller Point! Everything was perfectly arranged — hotels, transport, guide. Highly recommended!",
    author: "Rahul S.",
    location: "Kolkata",
  },
  {
    text: "Our Darjeeling and Sikkim package was excellent. Very professional team, great value for money.",
    author: "Priya M.",
    location: "West Bengal",
  },
  {
    text: "Best Bhutan Group Tour! Met wonderful people, saw amazing places. Will definitely book again.",
    author: "Sneha D.",
    location: "Siliguri",
  },
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
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Flights", href: "#flights" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1f1f1f]/95 backdrop-blur-md shadow-md border-b border-gold/10"
          : "bg-black/20 backdrop-blur-sm"
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
              alt="Traveller Point"
              className="h-10 w-auto"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="font-display text-lg font-semibold text-orange-500 hidden sm:block">
              Traveller Point
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`nav-link text-sm font-body font-medium tracking-wide ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
                data-ocid={"nav.link"}
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink("Hi, I would like to enquire about tour packages.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-gold text-white font-body font-semibold text-sm rounded-sm tracking-wide hover:bg-gold/90 transition-colors duration-200"
              data-ocid="nav.primary_button"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={`md:hidden p-2 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-current transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1f1f1f] border-t border-gold/10 py-4 shadow-md">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block px-4 py-3 text-foreground/80 hover:text-gold hover:bg-gold/10 transition-colors font-body"
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
          TRAVELLER
          <br />
          <span className="italic font-normal">Point</span>
        </h1>
        <div className="gold-divider mx-auto mb-6" />
        <p className="font-display text-xl md:text-2xl text-white italic mb-3">
          From your dream to the world.
        </p>
        <p className="font-body text-white/80 text-sm md:text-base tracking-widest mb-10">
          Expert tours to Bhutan&nbsp;•&nbsp;Darjeeling&nbsp;•&nbsp;Sikkim
        </p>
        <a
          href="#packages"
          className="inline-block px-10 py-4 border border-gold text-gold font-body font-medium tracking-widest text-sm uppercase hover:bg-gold hover:text-white transition-all duration-300"
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
// ── Package Card ───────────────────────────────────────────────────────────────
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-md border border-gold/30"
      data-ocid={`packages.item.${index + 1}`}
    >
      {/* Circular Image */}
      <div className="w-full h-56 rounded-xl overflow-hidden border-4 border-gold/30 shadow-lg mb-4">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h3 className="font-display text-lg text-gold font-semibold mb-1">
        {pkg.name}
      </h3>
      <p className="font-body text-foreground/60 text-sm mb-2">
        {pkg.duration}
      </p>

      {/* Pickup */}
      <div className="flex items-center gap-1.5 justify-center mb-2">
        <span className="text-gold text-xs">📍</span>
        <span className="font-body text-foreground/60 text-xs">
          {pkg.pickup}
        </span>
      </div>

      <p className="font-body text-gold text-xs italic mb-4">
        Customized package available on request
      </p>

      {/* Toggle itinerary */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 px-3 border border-gold/30 text-gold text-sm font-body hover:bg-gold/10 transition-colors rounded-lg"
        data-ocid={`packages.toggle.${index + 1}`}
      >
        <span>{open ? "Hide Itinerary" : "View Itinerary"}</span>
        <span
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* Itinerary */}
      {open && (
        <div className="w-full text-left mt-4 space-y-3 border-t border-gold/10 pt-4">
          {pkg.itinerary.map((day) => (
            <div key={day.day} className="flex gap-3">
              <div className="flex-shrink-0">
                <span className="inline-block bg-gold text-white text-xs font-body font-semibold px-2 py-0.5 rounded-sm">
                  {day.day}
                </span>
              </div>
              <div>
                <p className="font-body text-foreground text-sm font-medium">
                  {day.title}
                </p>
                <p className="font-body text-foreground/70 text-xs mt-0.5 leading-relaxed">
                  {day.details}
                </p>
              </div>
            </div>
          ))}

          {/* Inclusions */}
          <div className="mt-4 p-3 bg-[#333] rounded-sm border border-gold/20">
            <p className="font-body text-gold text-xs font-semibold uppercase tracking-wider mb-2">
              Inclusions
            </p>
            <ul className="space-y-1">
              {pkg.inclusions.map((inc) => (
                <li
                  key={inc}
                  className="font-body text-foreground/70 text-xs flex items-center gap-1.5"
                >
                  <span className="text-gold">✓</span> {inc}
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          {pkg.exclusions && pkg.exclusions.length > 0 && (
            <div className="mt-3 p-3 bg-[#333] rounded-sm border border-gold/20">
              <p className="font-body text-red-500 text-xs font-semibold uppercase tracking-wider mb-2">
                Exclusions
              </p>
              <ul className="space-y-1">
                {pkg.exclusions.map((exc) => (
                  <li
                    key={exc}
                    className="font-body text-foreground/70 text-xs flex items-center gap-1.5"
                  >
                    <span className="text-red-400">✗</span> {exc}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
    </div>
  );
}

// ── Flight Booking Section ──────────────────────────────────────────────────────
function FlightBookingSection() {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState("Economy");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const returnPart =
      tripType === "roundtrip" ? `, Return: ${returnDate}` : "";
    const msg = `Hi, I want to book a flight. From: ${from} To: ${to}, Date: ${departDate}${returnPart}, Passengers: ${passengers}, Class: ${flightClass}, Name: ${name}, Phone: ${phone}`;
    window.open(waLink(msg), "_blank");
  }

  function handleCleartrip() {
    const cleartripBase = "https://www.cleartrip.com/flights/results";
    const tripParam = tripType === "roundtrip" ? "roundtrip" : "oneway";
    const url = `${cleartripBase}?adults=${passengers}&childs=0&infants=0&class=${flightClass.toLowerCase()}&depart_date=${departDate}&return_date=${returnDate}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&intl=n&sd=1&trip_type=${tripParam}`;
    window.open(url, "_blank");
  }

  return (
    <section
      id="flights"
      className="py-16 px-4"
      style={{ background: "#181818" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Book Your <span style={{ color: "#D4AF37" }}>Flight</span>
          </h2>
          <div className="gold-divider mx-auto mb-4" />
          <p className="text-gray-300 text-base">
            Search and book flights instantly — we handle the rest
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 md:p-8 space-y-5"
          style={{
            background: "#2a2a2a",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          {/* Trip Type Toggle */}
          <div className="flex gap-3" data-ocid="flights.toggle">
            {(["oneway", "roundtrip"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTripType(t)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  tripType === t
                    ? { background: "#D4AF37", color: "#1f1f1f" }
                    : {
                        background: "transparent",
                        color: "#D4AF37",
                        border: "1px solid #D4AF37",
                      }
                }
              >
                {t === "oneway" ? "One Way" : "Round Trip"}
              </button>
            ))}
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">From</Label>
              <Input
                data-ocid="flights.input"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Departure City e.g. Kolkata"
                className="text-white placeholder:text-gray-500"
                style={{
                  background: "#1f1f1f",
                  borderColor: "rgba(212,175,55,0.3)",
                }}
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">To</Label>
              <Input
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Destination City e.g. Bagdogra"
                className="text-white placeholder:text-gray-500"
                style={{
                  background: "#1f1f1f",
                  borderColor: "rgba(212,175,55,0.3)",
                }}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">
                Departure Date
              </Label>
              <Input
                required
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="text-white"
                style={{
                  background: "#1f1f1f",
                  borderColor: "rgba(212,175,55,0.3)",
                  colorScheme: "dark",
                }}
              />
            </div>
            {tripType === "roundtrip" && (
              <div>
                <Label className="text-gray-300 mb-1 block text-sm">
                  Return Date
                </Label>
                <Input
                  required
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="text-white"
                  style={{
                    background: "#1f1f1f",
                    borderColor: "rgba(212,175,55,0.3)",
                    colorScheme: "dark",
                  }}
                />
              </div>
            )}
          </div>

          {/* Passengers + Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">
                Passengers
              </Label>
              <Input
                required
                type="number"
                min={1}
                max={20}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="text-white"
                style={{
                  background: "#1f1f1f",
                  borderColor: "rgba(212,175,55,0.3)",
                }}
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">Class</Label>
              <select
                data-ocid="flights.select"
                value={flightClass}
                onChange={(e) => setFlightClass(e.target.value)}
                className="w-full rounded-md px-3 py-2 text-sm text-white"
                style={{
                  background: "#1f1f1f",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
            </div>
          </div>

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">
                Passenger Name
              </Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="text-white placeholder:text-gray-500"
                style={{
                  background: "#1f1f1f",
                  borderColor: "rgba(212,175,55,0.3)",
                }}
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-1 block text-sm">
                Phone Number
              </Label>
              <Input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="text-white placeholder:text-gray-500"
                style={{
                  background: "#1f1f1f",
                  borderColor: "rgba(212,175,55,0.3)",
                }}
              />
            </div>
          </div>

          <Button
            data-ocid="flights.submit_button"
            type="submit"
            className="w-full py-3 text-base font-bold rounded-xl text-white"
            style={{ background: "#D4AF37", color: "#1f1f1f" }}
          >
            ✈ Send Booking Request via WhatsApp
          </Button>
        </form>

        {/* Cleartrip search button */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm mb-3">
            Or search real-time flight prices directly on Cleartrip
          </p>
          <button
            type="button"
            onClick={handleCleartrip}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "#E8523A", border: "none" }}
          >
            ✈ Search Flights on Cleartrip
          </button>
          <p className="text-gray-500 text-xs mt-2">
            You will be taken to Cleartrip.com to view prices and complete
            booking
          </p>
        </div>
      </div>
    </section>
  );
}

// ── About Section ──────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      className="py-20"
      style={{ background: "var(--section-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="font-playfair text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "#d97706" }}
            >
              About Traveller Point
            </h2>
            <p className="text-foreground/80 mb-4 text-base leading-relaxed">
              Traveller Point is a premier travel agency based in Jaigaon,
              Alipurduar, West Bengal — your gateway to the enchanting kingdoms
              of Bhutan, the misty hills of Darjeeling, the scenic valleys of
              Sikkim, and beyond.
            </p>
            <p className="text-foreground/80 mb-4 text-base leading-relaxed">
              With years of experience in organising memorable tours, we
              specialise in customised group and private packages to Bhutan,
              Darjeeling, and Sikkim. Our expert team ensures every journey is
              seamless — from pickup at NJP/Bagdogra to your final destination.
            </p>
            <p className="text-foreground/80 mb-6 text-base leading-relaxed">
              We are committed to giving every traveller the best experience at
              the most affordable rates, with round-the-clock WhatsApp support.
            </p>
            <p className="font-bold text-foreground/80 mb-6 italic text-lg">
              "From your dream to the world."
            </p>
            <a
              href="https://wa.me/917719264029?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Traveller%20Point."
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.primary_button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
              style={{ background: "#25d366" }}
            >
              💬 Chat With Us
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <img
              src="/assets/uploads/image_b1a1f18a-1.png"
              alt="Traveller Point Logo"
              className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)", padding: "1rem" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Packages Section ───────────────────────────────────────────────────────────

// ── Bhutan Tour Card (with sub-packages modal) ──────────────────────────────
const BHUTAN_SUB_PACKAGES = [
  {
    id: "4n5d",
    duration: "4 Nights / 5 Days",
    price: "Contact for pricing",
    summary: "Phuentsholing → Thimphu → Paro → Departure",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Pick-up from Bagdogra Airport or NJP. Check-in and explore Phuentsholing.",
      },
      {
        day: "Day 2",
        title: "Drive to Thimphu",
        details:
          "Immigration, drive to Thimphu via Kharbandi Gumpa, Chukha Dam. Evening at Clock Tower Square.",
      },
      {
        day: "Day 3",
        title: "Thimphu & Drive to Paro",
        details:
          "Buddha Dordenma, Tashichho Dzong, Simply Bhutan. Drive to Paro via iron chain bridge.",
      },
      {
        day: "Day 4",
        title: "Tiger's Nest Hike",
        details:
          "Early morning hike to Taktshang Lhakhang (Tiger's Nest). Optional hot stone bath.",
      },
      {
        day: "Day 5",
        title: "Departure",
        details:
          "Drive back to Phuentsholing and then to Bagdogra Airport or NJP.",
      },
    ],
  },
  {
    id: "5n6d",
    duration: "5 Nights / 6 Days",
    price: "Contact for pricing",
    summary:
      "Phuentsholing → Thimphu → Punakha excursion → Paro → Tiger's Nest → Departure",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Pick-up from Bagdogra Airport or NJP. Check-in and explore Phuentsholing.",
      },
      {
        day: "Day 2",
        title: "Drive to Thimphu",
        details:
          "Immigration, drive to Thimphu via Kharbandi Gumpa, Chukha Waterfall.",
      },
      {
        day: "Day 3",
        title: "Punakha Excursion",
        details:
          "Dochula Pass, Punakha Dzong, Two Rivers viewpoint. Return to Thimphu.",
      },
      {
        day: "Day 4",
        title: "Thimphu & Drive to Paro",
        details:
          "Simtokha Dzong, Buddha Dordenma, Tashichho Dzong. Drive to Paro.",
      },
      {
        day: "Day 5",
        title: "Tiger's Nest Hike",
        details:
          "Early morning hike to Taktshang Lhakhang (Tiger's Nest). Optional hot stone bath.",
      },
      {
        day: "Day 6",
        title: "Departure",
        details: "Drive back to Phuentsholing then to Bagdogra Airport or NJP.",
      },
    ],
  },
  {
    id: "6n7d",
    duration: "6 Nights / 7 Days (Group Tour)",
    price: "₹24,500/person",
    summary:
      "Full group tour: Phuentsholing → Thimphu → Punakha → Paro → Tiger's Nest → Departure",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and Phuentsholing",
        details:
          "Pick-up from Bagdogra Airport (IXB) or NJP and drive to Phuentsholing. Check in and explore monasteries, parks, and nightlife.",
      },
      {
        day: "Day 2",
        title: "Journey to Thimphu",
        details:
          "After breakfast and immigration, drive to Thimphu. Stopovers at Kharbandi Gumpa, Chukha Waterfall, Chukha Dam, and Dharma Kaya Stupas. Evening guided walk around Clock Tower Square.",
      },
      {
        day: "Day 3",
        title: "Excursion to Punakha",
        details:
          "Drive to Punakha with stops at Dochula Pass and Suspension Bridge. Visit Punakha Dzong and Two Rivers viewpoint. Optional river rafting and riverside lunch.",
      },
      {
        day: "Day 4",
        title: "Thimphu Sightseeing & Drive to Paro",
        details:
          "Morning sightseeing: Simtokha Dzong, Buddha Dordenma, Tashichho Dzong, Simply Bhutan, Takin Preserve Zoo. Drive to Paro stopping at Tachogang Lhakhang iron chain bridge.",
      },
      {
        day: "Day 5",
        title: "Hike to Tiger's Nest",
        details:
          "Early morning hike to Taktshang Lhakhang (Tiger's Nest). Stop at canteen halfway for views and rest. Optional relaxing hot stone bath in Paro.",
      },
      {
        day: "Day 6",
        title: "Paro Sightseeing & Drive to Phuentsholing",
        details:
          "Visit Paro Ta Dzong in the morning. Sightseeing en route while driving back to Phuentsholing.",
      },
      {
        day: "Day 7",
        title: "Departure",
        details:
          "Drive from Phuentsholing to Bagdogra Airport or NJP for your flight home.",
      },
    ],
  },
  {
    id: "7n8d",
    duration: "7 Nights / 8 Days",
    price: "Contact for pricing",
    summary: "Extended tour with extra day in Paro and Haa Valley exploration",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Phuentsholing",
        details:
          "Pick-up from Bagdogra Airport or NJP. Check-in and explore Phuentsholing.",
      },
      {
        day: "Day 2",
        title: "Drive to Thimphu",
        details:
          "Immigration, drive to Thimphu via Kharbandi Gumpa, Chukha Waterfall, Chukha Dam.",
      },
      {
        day: "Day 3",
        title: "Punakha Excursion",
        details:
          "Dochula Pass, Punakha Dzong, Two Rivers viewpoint. Return to Thimphu.",
      },
      {
        day: "Day 4",
        title: "Thimphu Sightseeing",
        details:
          "Simtokha Dzong, Buddha Dordenma, Tashichho Dzong, Simply Bhutan, Takin Preserve Zoo.",
      },
      {
        day: "Day 5",
        title: "Drive to Paro & Haa Valley",
        details:
          "Drive to Paro via iron chain bridge. Afternoon excursion to scenic Haa Valley.",
      },
      {
        day: "Day 6",
        title: "Tiger's Nest Hike",
        details:
          "Early morning hike to Taktshang Lhakhang (Tiger's Nest). Optional hot stone bath.",
      },
      {
        day: "Day 7",
        title: "Paro Sightseeing",
        details:
          "Visit Paro Ta Dzong, Rinpung Dzong, and local market. Drive back to Phuentsholing.",
      },
      {
        day: "Day 8",
        title: "Departure",
        details:
          "Drive from Phuentsholing to Bagdogra Airport or NJP for your flight home.",
      },
    ],
  },
];

function BhutanTourCard() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-md border border-gold/30 cursor-pointer hover:border-gold/60 transition-all duration-300 w-full"
        onClick={() => setOpen(true)}
        data-ocid="bhutan_tour.open_modal_button"
      >
        {/* Circular Image */}
        <div className="w-full h-56 rounded-xl overflow-hidden border-4 border-gold/30 shadow-lg mb-4">
          <img
            src="/assets/generated/bhutan-tigers-nest.dim_1920x1080.jpg"
            alt="Bhutan Tour Packages"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-gold font-semibold mb-1">
          Bhutan Tour Packages
        </h3>
        <p className="font-body text-foreground/60 text-sm mb-2">
          4N/5D · 5N/6D · 6N/7D · 7N/8D
        </p>

        {/* Pickup */}
        <div className="flex items-center gap-1.5 justify-center mb-2">
          <span className="text-gold text-xs">📍</span>
          <span className="font-body text-foreground/60 text-xs">
            Bagdogra Airport or NJP Railway Station
          </span>
        </div>

        <p className="font-body text-gold text-xs italic mb-4">
          Customized package available on request
        </p>

        <div className="w-full py-2 px-3 border border-gold/30 text-gold text-sm font-body text-center rounded-lg hover:bg-gold/10 transition-colors">
          View All Bhutan Packages ▶
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card text-foreground"
          data-ocid="bhutan_tour.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gold">
              Bhutan Tour Packages
            </DialogTitle>
            <p className="font-body text-foreground/70 text-sm">
              Choose your perfect Bhutan experience
            </p>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {BHUTAN_SUB_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="border border-gold/30 rounded-sm overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gold/10 transition-colors text-left"
                  onClick={() =>
                    setExpanded(expanded === pkg.id ? null : pkg.id)
                  }
                  data-ocid={`bhutan_tour.${pkg.id}.toggle`}
                >
                  <div>
                    <p className="font-display text-gold font-semibold">
                      {pkg.duration}
                    </p>
                    <p className="font-body text-foreground/60 text-xs mt-0.5">
                      {pkg.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="font-body text-orange-400 text-sm font-semibold">
                      {pkg.price}
                    </span>
                    <span
                      className={`transition-transform duration-300 text-gold ${expanded === pkg.id ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </div>
                </button>
                {expanded === pkg.id && (
                  <div className="px-4 pb-4 bg-[#333] border-t border-gold/20">
                    <div className="space-y-3 mt-3">
                      {pkg.itinerary.map((day) => (
                        <div key={day.day} className="flex gap-3">
                          <span className="font-body text-gold text-xs font-semibold shrink-0 w-12">
                            {day.day}
                          </span>
                          <div>
                            <p className="font-body text-foreground text-sm font-medium">
                              {day.title}
                            </p>
                            <p className="font-body text-foreground/70 text-xs mt-0.5 leading-relaxed">
                              {day.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gold/10">
                      <a
                        href={waLink(
                          `Hi, I am interested in the Bhutan ${pkg.duration} package. Please share details and availability.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-semibold text-white hover:opacity-90 transition-opacity text-sm"
                        style={{ backgroundColor: "#25D366" }}
                        data-ocid={`bhutan_tour.${pkg.id}.primary_button`}
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PackagesSection() {
  return (
    <section id="packages" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Our Tour Packages
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BhutanTourCard />
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
        className="group bg-card border border-gold/20 rounded-sm p-8 text-center hover:border-gold/50 hover:shadow-md transition-all duration-300 w-full"
        data-ocid={`services.open_modal_button.${index + 1}`}
      >
        <span className="text-5xl block mb-4">{service.icon}</span>
        <h3 className="font-display text-xl text-gold mb-2">{service.name}</h3>
        <p className="font-body text-foreground/70 text-sm">
          {service.description}
        </p>
        <span className="inline-block mt-4 text-xs font-body text-gold/60 group-hover:text-gold transition-colors">
          Click for details →
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-card border border-gold/30 text-foreground max-w-md"
          data-ocid={`services.dialog.${index + 1}`}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gold flex items-center gap-3">
              <span>{service.icon}</span> {service.name}
            </DialogTitle>
          </DialogHeader>
          <p className="font-body text-foreground/70 leading-relaxed text-sm">
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
              className="border-gold/30 text-foreground/80 hover:bg-gold/10"
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
    <section id="services" className="py-20" style={{ background: "#1f1f1f" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
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

// ── Reviews Section ────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section id="reviews" className="py-20" style={{ background: "#1f1f1f" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            What Our Travellers Say
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.author}
              className="bg-card border border-gold/20 rounded-sm p-6 hover:border-gold/40 transition-all duration-300 shadow-sm"
              data-ocid={`reviews.item.${i + 1}`}
            >
              <div className="flex gap-1 mb-4">
                {["1", "2", "3", "4", "5"].map((s) => (
                  <span key={s} className="text-gold text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-body text-foreground/70 text-sm leading-relaxed italic mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="pt-4 border-t border-gold/10">
                <p className="font-body text-foreground text-sm font-medium">
                  {review.author}
                </p>
                <p className="font-body text-foreground/70 text-xs">
                  {review.location}
                </p>
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
    <section
      id="contact"
      style={{ background: "var(--section-bg)" }}
      className="py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-gold tracking-[0.25em] text-sm uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Contact Us
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-foreground/70 mt-4 text-sm">
            Contact us to plan your dream tour
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl text-orange-500 mb-6">
                Traveller Point
              </h3>
              <p className="font-body text-foreground/70 text-sm leading-relaxed">
                Your trusted travel partner for unforgettable journeys to
                Bhutan, Darjeeling, and Sikkim. From your dream to the world.
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
                { icon: "📞", label: "Phone", value: "9046497766" },
                { icon: "💬", label: "WhatsApp", value: "7719264029" },
              ].map((item) => (
                <div key={item.value} className="flex items-start gap-4">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-body text-gold text-xs font-semibold uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="font-body text-foreground text-sm mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={waLink(
                "Hi, I would like to plan a tour with Traveller Point.",
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
            className="space-y-5 bg-card border border-gold/30 rounded-sm p-8 shadow-sm"
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="font-body text-foreground/70 text-xs uppercase tracking-wider"
              >
                Your Name
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Enter your name"
                className="bg-[#333] border-gold/30 text-foreground placeholder:text-white/40 focus:border-gold/60 focus:ring-0"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="font-body text-foreground/70 text-xs uppercase tracking-wider"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                className="bg-[#333] border-gold/30 text-foreground placeholder:text-white/40 focus:border-gold/60 focus:ring-0"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="font-body text-foreground/70 text-xs uppercase tracking-wider"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                placeholder="Enter your phone number"
                className="bg-[#333] border-gold/30 text-foreground placeholder:text-white/40 focus:border-gold/60 focus:ring-0"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="message"
                className="font-body text-foreground/70 text-xs uppercase tracking-wider"
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
                className="bg-[#333] border-gold/30 text-foreground placeholder:text-white/40 focus:border-gold/60 focus:ring-0 resize-none"
                data-ocid="contact.textarea"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-gold text-white font-body font-semibold tracking-widest text-sm uppercase hover:bg-gold/90 transition-colors duration-200 rounded-sm"
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
  return (
    <footer
      className="py-12 border-t border-gold/10"
      style={{ background: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/image_b1a1f18a-1.png"
                alt="Traveller Point"
                className="h-10 w-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="font-display text-lg text-orange-500">
                Traveller Point
              </span>
            </div>
            <p className="font-display text-cream-dark text-sm italic">
              From your dream to the world.
            </p>
            <p className="font-body text-cream-dark/90 text-xs mt-3 leading-relaxed">
              Expert travel agency specializing in tours to Bhutan, Darjeeling,
              and Sikkim.
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
                  href="tel:9046497766"
                  className="hover:text-gold transition-colors"
                >
                  📞 9046497766
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
              <p className="font-body text-cream-dark text-sm">
                <a
                  href="https://www.facebook.com/profile.php?id=61579447774652"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  📘 Facebook: Traveller Point
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-cream-dark/80 text-xs">
            © {year} Traveller Point. All rights reserved.
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
    <div className="min-h-screen" style={{ background: "#1f1f1f" }}>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <FlightBookingSection />
        <AboutSection />
        <PackagesSection />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
