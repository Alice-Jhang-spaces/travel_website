export type Listing = {
  id: string;
  title: string;
  location: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
};

export const CATEGORIES = [
  { id: "all", label: "All", icon: "Globe" },
  { id: "amazing-views", label: "Amazing views", icon: "Mountain" },
  { id: "beach", label: "Beach", icon: "Waves" },
  { id: "cabins", label: "Cabins", icon: "TreePine" },
  { id: "tiny-homes", label: "Tiny homes", icon: "Home" },
  { id: "castles", label: "Castles", icon: "Castle" },
  { id: "pools", label: "Amazing pools", icon: "Droplets" },
  { id: "tropical", label: "Tropical", icon: "Palmtree" },
  { id: "lakefront", label: "Lakefront", icon: "Sailboat" },
  { id: "design", label: "Design", icon: "Palette" },
  { id: "countryside", label: "Countryside", icon: "Wheat" },
  { id: "trending", label: "Trending", icon: "Flame" },
  { id: "skiing", label: "Skiing", icon: "Snowflake" },
  { id: "islands", label: "Islands", icon: "Map" },
];

const img = (id: string, n: number) =>
  Array.from({ length: 4 }, (_, i) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80&ixid=${n}-${i}`
  );

export const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Malibu, California",
    location: "Malibu, California",
    distance: "29 kilometres away",
    dates: "5 – 10 May",
    price: 412,
    rating: 4.92,
    images: img("1568605114967-8130f3a36994", 1),
    category: "beach",
  },
  {
    id: "2",
    title: "Aspen, Colorado",
    location: "Aspen, Colorado",
    distance: "1,240 kilometres away",
    dates: "12 – 17 Jun",
    price: 689,
    rating: 4.87,
    images: img("1449844908441-8829872d2607", 2),
    category: "skiing",
  },
  {
    id: "3",
    title: "Lake Tahoe, Nevada",
    location: "Lake Tahoe, Nevada",
    distance: "780 kilometres away",
    dates: "1 – 6 Jul",
    price: 325,
    rating: 4.95,
    images: img("1502602898657-3e91760cbb34", 3),
    category: "lakefront",
  },
  {
    id: "4",
    title: "Joshua Tree, California",
    location: "Joshua Tree, California",
    distance: "210 kilometres away",
    dates: "8 – 13 Aug",
    price: 198,
    rating: 4.81,
    images: img("1469854523086-cc02fe5d8800", 4),
    category: "tiny-homes",
  },
  {
    id: "5",
    title: "Loire Valley, France",
    location: "Loire Valley, France",
    distance: "8,400 kilometres away",
    dates: "20 – 25 Sep",
    price: 945,
    rating: 4.99,
    images: img("1564013799919-ab600027ffc6", 5),
    category: "castles",
  },
  {
    id: "6",
    title: "Tulum, Mexico",
    location: "Tulum, Mexico",
    distance: "3,100 kilometres away",
    dates: "14 – 19 Oct",
    price: 287,
    rating: 4.88,
    images: img("1582719508461-905c673771fd", 6),
    category: "tropical",
  },
  {
    id: "7",
    title: "Big Sur, California",
    location: "Big Sur, California",
    distance: "470 kilometres away",
    dates: "3 – 8 Nov",
    price: 521,
    rating: 4.93,
    images: img("1470770841072-f978cf4d019e", 7),
    category: "amazing-views",
  },
  {
    id: "8",
    title: "Reykjavik, Iceland",
    location: "Reykjavik, Iceland",
    distance: "6,800 kilometres away",
    dates: "11 – 16 Dec",
    price: 364,
    rating: 4.86,
    images: img("1531168556467-80aace0d0144", 8),
    category: "design",
  },
  {
    id: "9",
    title: "Tuscany, Italy",
    location: "Tuscany, Italy",
    distance: "9,200 kilometres away",
    dates: "2 – 7 Jan",
    price: 612,
    rating: 4.97,
    images: img("1523906834658-6e24ef2386f9", 9),
    category: "countryside",
  },
  {
    id: "10",
    title: "Santorini, Greece",
    location: "Santorini, Greece",
    distance: "10,400 kilometres away",
    dates: "18 – 23 May",
    price: 478,
    rating: 4.94,
    images: img("1570077188670-e3a8d69ac5ff", 10),
    category: "islands",
  },
  {
    id: "11",
    title: "Ubud, Bali",
    location: "Ubud, Bali",
    distance: "13,500 kilometres away",
    dates: "9 – 14 Feb",
    price: 156,
    rating: 4.91,
    images: img("1537996194471-e657df975ab4", 11),
    category: "pools",
  },
  {
    id: "12",
    title: "Banff, Canada",
    location: "Banff, Canada",
    distance: "2,800 kilometres away",
    dates: "22 – 27 Mar",
    price: 398,
    rating: 4.89,
    images: img("1486870591958-9b9d0d1dda99", 12),
    category: "cabins",
  },
];
