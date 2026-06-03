"use client";

import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import useCategories from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  HeartPulse,
  Pill,
  Thermometer,
  Accessibility,
  Bed,
  ShieldPlus,
  Syringe,
  Microscope,
  Scissors,
} from "lucide-react";

const categoryIcons = {
  Diagnostics: Microscope,
  Nebulizers: HeartPulse,
  "BP Monitors": Stethoscope,
  Aids: Accessibility,
  "Gloves & PPE": ShieldPlus,
  Wheelchairs: Accessibility,
  Surgical: Syringe,
  "OT Equipment": Scissors,
  Thermometers: Thermometer,
  Medicines: Pill,
  Furniture: Bed,
};

export default function CategorySection() {
  const router = useRouter();
  const {
    categories,
    loading,
    error,
  } = useCategories();

  if (loading) {
    return (
      <section className="py-12">
        <Container>
          <Text>
            Loading categories...
          </Text>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <Container>
          <Text className="text-red-500">
            Failed to load categories
          </Text>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12">
      <Container>
        <div className="mb-6">
          <Text
            as="h2"
            variant="h3"
            className="text-black"
          >
            Shop by Category
          </Text>

          <Text className="mt-1 text-sm text-gray-500">
            Find exactly what you need
          </Text>
        </div>

        <div
          className="
            flex
            gap-4
            overflow-x-auto
            scroll-smooth
            pb-3
            scrollbar-hide
          "
        >
          {categories.map(
            (item) => {
              const Icon =
                categoryIcons[
                item.name
                ] ||
                Microscope;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sessionStorage.setItem(
                      "selectedCategory",
                      item.id
                    );

                    router.push("/products");
                  }}
                  className="
                    min-w-[130px]
                    sm:min-w-[150px]
                    md:min-w-[170px]
                    lg:min-w-[180px]
                    flex-shrink-0

                    bg-white
                    border
                    border-gray-200
                    rounded-2xl

                    p-4

                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-3

                    cursor-pointer

                    hover:border-[var(--color-text-primary)]
                    hover:shadow-lg

                    transition-all
                    duration-300
                  "
                >
                  <div
                    className="
                      h-14
                      w-14
                      rounded-full

                      flex
                      items-center
                      justify-center

                      bg-blue-50
                    "
                  >
                    {item.icon}
                  </div>
                  <Text
                    variant="bodySmall"
                    className="
                      text-center
                      font-medium
                      text-black
                      line-clamp-2
                    "
                  >
                    {item.name}
                  </Text>
                </div>
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
}