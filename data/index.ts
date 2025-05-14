/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
export interface Product {
  id: string;
  articleNumber: string;
  image: string;
  title: string;
  description: string;
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "cuid1",
    articleNumber: "cuid1",
    image: "https://www.pexels.com/sv-se/foto/904616/",
    title: "Moonlight Jasmine Oolong",
    description:
      "A silky smooth oolong harvested under the full moon and scented with night-blooming jasmine. Perfect for introspective evenings and mysterious glances.",
    price: 120,
    stock: 6,
  },
  {
    id: "cuid2",
    articleNumber: "cuid2",
    image:
      "https://www.pexels.com/sv-se/foto/hander-kvinna-avslappning-te-8329306/",
    title: "Velvet Earl Grey Supreme",
    description:
      "Not your average Earl! This bold black tea is blended with Italian bergamot and a hint of vanilla. Regal, refined, and just a little scandalous.",
    price: 95,
    stock: 10,
  },
  {
    id: "cuid3",
    articleNumber: "cuid3",
    image:
      "https://images.pexels.com/photos/1660416/pexels-photo-1660416.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Kyoto Dewdrop Sencha",
    description:
      "A first-flush Japanese sencha kissed by early morning dew. Grassy, vibrant, and perfect for turning your kitchen into a Zen garden.",
    price: 110,
    stock: 5,
  },
  {
    id: "cuid4",
    articleNumber: "cuid4",
    image:
      "https://images.pexels.com/photos/1833316/pexels-photo-1833316.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Smoky Himalayan Whisper",
    description:
      "Dark, mysterious, and slightly smoky, this black tea from the Himalayan foothills is a secret best shared with an old book and a cozy blanket.",
    price: 105,
    stock: 3,
  },
  {
    id: "cuid5",
    articleNumber: "cuid5",
    image:
      "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Ruby Chai Carnival",
    description:
      "A wild dance of Ceylon black tea, cinnamon, cardamom, and pink peppercorns. Sweet, spicy, and ready to party in your teacup.",
    price: 100,
    stock: 8,
  },
  {
    id: "cuid6",
    articleNumber: "cuid6",
    image:
      "https://images.pexels.com/photos/6508126/pexels-photo-6508126.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Lavender Cream Darjeeling",
    description:
      "An elegant twist on a classic. Delicate second-flush Darjeeling meets soothing lavender and a swirl of cream flavor. Afternoon tea just got an upgrade.",
    price: 115,
    stock: 7,
  },
  {
    id: "cuid7",
    articleNumber: "cuid7",
    image:
      "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Dragon’s Breath Green",
    description:
      "A fierce and fiery green tea with ginger and citrus peel. Like a dragon waking up slowly... and then roaring with zest.",
    price: 90,
    stock: 9,
  },
  {
    id: "cuid8",
    articleNumber: "cuid8",
    image: "https://www.pexels.com/sv-se/foto/1772124/",
    title: "Rose Gold Rooibos",
    description:
      "A caffeine-free South African rooibos with rose petals and a dash of gold luster. For glamorous nights in and golden sunsets.",
    price: 85,
    stock: 12,
  },
  {
    id: "cuid9",
    articleNumber: "cuid9",
    image:
      "https://images.pexels.com/photos/1627958/pexels-photo-1627958.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Blueberry Basil Bliss",
    description:
      "An herbal infusion that pairs juicy blueberries with fresh basil for a sweet-savory surprise. It's like a garden party in your mug.",
    price: 80,
    stock: 6,
  },
  {
    id: "cuid10",
    articleNumber: "cuid10",
    image:
      "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Midnight Matcha Mystique",
    description:
      "A ceremonial-grade matcha that’s as dark and smooth as a velvet cloak. Earthy, deep, and ideal for late-night creative sparks.",
    price: 130,
    stock: 4,
  },
];
