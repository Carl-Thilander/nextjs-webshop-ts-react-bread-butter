import { Prisma, Product } from "@prisma/client";

/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
interface ProductMock extends Product {
  categories: (typeof categories)[number]["name"][];
}

export const categories = [
  {
    name: "Coffee",

    imageURL:
      "https://media.istockphoto.com/id/501597744/sv/foto/coffee-beans.jpg?b=1&s=612x612&w=0&k=20&c=D7CtuIkak7WxgydtU_75dqwYE1f0PGln2Lizuld5raI=",
  },
  {
    name: "Tea",

    imageURL:
      "https://media.istockphoto.com/id/501597744/sv/foto/coffee-beans.jpg?b=1&s=612x612&w=0&k=20&c=D7CtuIkak7WxgydtU_75dqwYE1f0PGln2Lizuld5raI=",
  },
  {
    name: "Decaf",

    imageURL:
      "https://media.istockphoto.com/id/501597744/sv/foto/coffee-beans.jpg?b=1&s=612x612&w=0&k=20&c=D7CtuIkak7WxgydtU_75dqwYE1f0PGln2Lizuld5raI=",
  },
  {
    name: "Sale",
    imageURL:
      "https://media.istockphoto.com/id/501597744/sv/foto/coffee-beans.jpg?b=1&s=612x612&w=0&k=20&c=D7CtuIkak7WxgydtU_75dqwYE1f0PGln2Lizuld5raI=",
  },
] as const satisfies Prisma.CategoryCreateInput[];

/* Lägg till era produkter här */
export const products: ProductMock[] = [
  {
    id: "cuid1",
    articleNumber: "cuid1",
    image: "/images/velvet-andes.png",
    title: "Velvet Andes",
    description:
      "A silky and balanced cup from the highlands of Colombia. Velvet Andes brings together creamy chocolate tones with a touch of caramel sweetness and a red berry finish. A refined everyday coffee with a velvety feel.",
    price: 399,
    stock: 6,
    categories: ["Coffee"],
  },
  {
    id: "cuid2",
    articleNumber: "cuid2",
    image: "/images/midnight-bloom.png",
    title: "Midnight Bloom",
    description:
      "Floral and enchanting, Midnight Bloom unfolds with delicate jasmine aromas and bright peach notes. Its citrus elegance is perfect for those who seek complexity and clarity in every sip.",
    price: 399,
    stock: 10,
    categories: ["Coffee", "Sale"],
  },
  {
    id: "cuid3",
    articleNumber: "cuid3",
    image: "/images/golden-savannah.png",
    title: "Golden Savannah",
    description:
      "Lively and juicy, Golden Savannah offers vibrant acidity balanced with the sweetness of brown sugar. A spirited cup that brings sunshine to every morning.",
    price: 399,
    stock: 5,
    categories: ["Coffee"],
  },
  {
    id: "cuid4",
    articleNumber: "cuid4",
    image: "/images/ember-dusk.png",
    title: "Ember Dusk",
    description:
      "Rich and bold with a smooth smoky finish. Ember Dusk captures the deep warmth of dark chocolate and molasses, rounded out with a roasted almond depth. Made for lovers of intensity.",
    price: 399,
    stock: 3,
    categories: ["Coffee", "Sale"],
  },
  {
    id: "cuid5",
    articleNumber: "cuid5",
    image: "/images/solstice-earth.png",
    title: "Solstice Earth",
    description:
      "Grounded and bold, Solstice Earth is a deep-bodied coffee with earthy and spicy undertones. Hints of dried fruit add complexity, creating a cup that feels timeless and rooted..",
    price: 399,
    stock: 8,
    categories: ["Coffee"],
  },
  {
    id: "cuid6",
    articleNumber: "cuid6",
    image: "/images/aurora-cradle.png",
    title: "Aurora Cradle",
    description:
      "Soft, bright, and uplifting. Aurora Cradle is a harmonious blend with a gentle sweetness of honey and vanilla, ending with a subtle stone fruit brightness. A smooth start to any day.",
    price: 399,
    stock: 7,
    categories: ["Coffee", "Sale"],
  },
  {
    id: "cuid7",
    articleNumber: "cuid7",
    image: "/images/jade-blossom.png",
    title: "Jade Blossom",
    description:
      "A delicate green tea infused with freshly blossomed jasmine flowers. Smooth, floral, and calming — a timeless classic in a modern robe.",
    price: 399,
    stock: 9,
    categories: ["Tea"],
  },
  {
    id: "cuid8",
    articleNumber: "cuid8",
    image: "/images/peachy-dream.png",
    title: "Peachy Dream",
    description:
      "An elegant oolong with juicy notes of summer peach and a buttery smooth texture. Lightly oxidized and hand-rolled for a luxurious experience.",
    price: 299,
    stock: 12,
    categories: ["Tea", "Sale"],
  },
  {
    id: "cuid9",
    articleNumber: "cuid9",
    image: "/images/arctic-mint.png",
    title: "Arctic Mint",
    description:
      "A naturally caffeine-free infusion of wild Moroccan mint, eucalyptus, and a hint of lemongrass. Crisp, refreshing, and cleansing.",
    price: 299,
    stock: 6,
    categories: ["Tea", "Sale"],
  },
  {
    id: "cuid10",
    articleNumber: "cuid10",
    image: "/images/moonlight-earl.png",
    title: "Moonlight Earl",
    description:
      "A luxurious take on the classic Earl Grey, with smooth vanilla and creamy notes dancing with bold citrus bergamot.",
    price: 299,
    stock: 4,
    categories: ["Tea"],
  },
  {
    id: "cuid11",
    articleNumber: "cuid11",
    image: "/images/rosewood-chai.png",
    title: "Rosewood Chai",
    description:
      "A bold and aromatic chai with a romantic twist — rose petals, cardamom, and warm spices over rich Assam black tea.",
    price: 299,
    stock: 4,
    categories: ["Tea", "Sale"],
  },
  {
    id: "cuid12",
    articleNumber: "cuid12",
    image: "/images/kyoto-dew.png",
    title: "Kyoto Dew",
    description:
      "Stone-ground ceremonial matcha from Uji, Japan. Bright, vegetal, and serene — a meditative cup for modern rituals.",
    price: 299,
    stock: 4,
    categories: ["Tea"],
  },
  {
    id: "cuid13",
    articleNumber: "cuid13",
    image: "/images/morning-mist-decaf.png",
    title: "Morning Mist Decaf",
    description:
      "A bright and delicate decaf with subtle fruit and floral notes — light on caffeine but full of character.",
    price: 349,
    stock: 4,
    categories: ["Tea", "Decaf"],
  },
  {
    id: "cuid14",
    articleNumber: "cuid14",
    image: "/images/morning-drift-decaf.png",
    title: "Morning Drift Decaf",
    description:
      "A mellow, golden roast with a gentle sweetness — crafted for easy mornings and cozy afternoons. All the flavor, none of the jitters.",
    price: 349,
    stock: 4,
    categories: ["Tea", "Decaf"],
  },
  {
    id: "cuid15",
    articleNumber: "cuid15",
    image: "/images/lavender-haze-decaf.png",
    title: "Lavender Haze",
    description:
      "A calming and floral infusion designed to soothe the senses — perfect for winding down with notes of cool mint and dreamy lavender.",
    price: 349,
    stock: 4,
    categories: ["Tea", "Decaf"],
  },
  {
    id: "cuid16",
    articleNumber: "cuid16",
    image: "/images/velvet-sunrise-decaf.png",
    title: "Velvet Sunrise",
    description:
      "A smooth and uplifting blend that captures the warmth of a morning sun — naturally sweet rooibos, bright citrus, and a whisper of vanilla for a velvety finish. Perfect for a gentle start or a calming evening unwind.",
    price: 349,
    stock: 4,
    categories: ["Tea", "Decaf"],
  },
];
