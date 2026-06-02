"use client";
import { Container,ProductCard,Text } from "..";
const products = [
  {
    id: 1,
    name: "Omron NE-C28 Compressor Nebulizer",
    price: 1799,
    oldPrice: 2999,
    save: 1200,
    rating: 4.8,
    reviews: 1240,
    badge: "40% OFF",
    image: "💨",
  },
  {
    id: 2,
    name: "Omron HEM-7120 BP Monitor",
    price: 1599,
    oldPrice: 2499,
    save: 900,
    rating: 4.9,
    reviews: 3105,
    badge: "36% OFF",
    image: "🩺",
  },
  {
    id: 3,
    name: "Accucheck Active Glucose Monitor",
    price: 999,
    oldPrice: 1499,
    save: 500,
    rating: 4.7,
    reviews: 890,
    badge: "33% OFF",
    image: "🩸",
  },
  {
    id: 4,
    name: "Romsons Air Mattress With Pump",
    price: 2499,
    oldPrice: 3999,
    save: 1500,
    rating: 4.8,
    reviews: 540,
    badge: "38% OFF",
    image: "🛏️",
  },
  {
    id: 5,
    name: "3M Nitrile Examination Gloves",
    price: 449,
    oldPrice: 699,
    save: 250,
    rating: 4.8,
    reviews: 3210,
    badge: "20% OFF",
    image: "🧤",
  },
  {
    id: 6,
    name: "Surgicare Folding Wheelchair",
    price: 7499,
    oldPrice: 11999,
    save: 4500,
    rating: 4.7,
    reviews: 412,
    badge: "38% OFF",
    image: "♿",
  },
  {
    id: 7,
    name: "Stainless Steel Surgical Scissor Set",
    price: 599,
    oldPrice: 999,
    save: 400,
    rating: 4.8,
    reviews: 820,
    badge: "40% OFF",
    image: "🔬",
  },
  {
    id: 8,
    name: "Premium Knee Support Brace",
    price: 549,
    oldPrice: 899,
    save: 350,
    rating: 4.5,
    reviews: 670,
    badge: "30% OFF",
    image: "🦴",
  },
];

export default function BestSellingSection() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-8 text-center">
          <Text
            as="h2"
            variant="h2"
            className="text-black"
          >
            Best Selling Products
          </Text>

          <Text className="mt-2 max-w-2xl mx-auto">
            Trusted healthcare essentials chosen by thousands
            of customers across India.
          </Text>
        </div>

        {/* Mobile Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 w-max pb-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[280px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
         
        </div>
      </Container>
    </section>
  );
}