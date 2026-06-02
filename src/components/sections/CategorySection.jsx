"use client";

import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import useCategories from "@/hooks/useCategories";

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
  const {
    categories,
    loading,
    error,
  } = useCategories();

  if (loading) {
    return (
      <section className="py-12">
        <Container>
          <Text>Loading categories...</Text>
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
    <section className="py-12">
      <Container>

        <div className="mb-8">
          <Text
            as="h2"
            variant="h3"
            className="text-black"
          >
            Shop by Category
          </Text>

          <Text className="mt-1 text-sm">
            Find exactly what you need
          </Text>
        </div>

        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide

            lg:grid
            lg:grid-cols-5
            xl:grid-cols-6
            lg:overflow-visible
          "
        >
          {categories.map((item) => {
            const Icon =
              categoryIcons[item.name] ||
              Microscope;

            return (
              <div
                key={item.id}
                className=" min-w-[110px] lg:min-w-0 bg-white border  border-border rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-text-primary  hover:shadow-md  transition-all duration-300  cursor-pointer"
              >
                <div
                  className="
      h-12
      w-12
      rounded-full

      bg-primary-soft

      flex
      items-center
      justify-center
    "
                >
                  <Icon
                    size={24}
                    className="text-text-primary"
                  />
                </div>

                <Text
                  variant="bodySmall"
                  className="
      text-center
      text-black
      font-medium
    "
                >
                  {item.name}
                </Text>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}