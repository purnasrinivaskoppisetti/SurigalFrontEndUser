"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Zap,
  MapPin,
  Stethoscope,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const stats = [
  {
    value: "25+",
    label: "Years In Business",
  },
  {
    value: "10,000+",
    label: "Happy Customers",
  },
  {
    value: "500+",
    label: "Products In Stock",
  },
  {
    value: "5",
    label: "Store Locations",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Doctor-Approved Products",
    desc: "All items reviewed by medical professionals",
  },
  {
    icon: BadgeCheck,
    title: "Certified Quality",
    desc: "ISO-compliant sourcing from authorized manufacturers",
  },
  {
    icon: Zap,
    title: "Fast & Reliable Service",
    desc: "Same-day dispatch & 24-hour delivery in Guntur",
  },
];

const locations = [
  "Guntur",
  "Vijayawada",
  "Ponnur",
  "Eluru",
  "Tirupati",
];

export default function AboutPage() {
  const router=useRouter();
  const handlechange=()=>{
    router.push("/products")

}

  return (
    <div>
      {/* Hero */}

      <section className="bg-gradient-to-r from-cyan-700 to-cyan-500 py-16 text-center">
        <Container>
          <Text
            as="h1"
            variant="h2"
            className="text-white"
          >
            About Surgical World
          </Text>

          <Text className="mt-3 text-white/90">
            25+ years of trusted healthcare
            solutions across Andhra Pradesh
          </Text>

          <Button
            variant="success"
            className="mt-6"
             onClick={handlechange}
            
          >
            Explore Our Products →
          </Button>
        </Container>
      </section>

      {/* Story */}

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="flex aspect-square items-center justify-center rounded-3xl bg-blue-50">
              <Stethoscope
                size={120}
                className="text-[var(--color-text-primary)]"
              />
            </div>

            <div>
              <Text
                variant="h3"
                className="text-black"
              >
                Our Journey Since 1999
              </Text>

              <Text className="mt-5">
                Surgical World was founded in
                1999 with a single mission:
                delivering quality surgical and
                medical equipment across Andhra
                Pradesh.
              </Text>

              <Text className="mt-4">
                Over the years, we have grown
                from a small storefront in
                Guntur into a trusted healthcare
                supplier serving hospitals,
                clinics, nursing homes,
                diagnostic centers and
                independent practitioners.
              </Text>

              <Text className="mt-4">
                We believe healthcare should
                never be compromised by cost or
                availability. Every product we
                stock is carefully sourced and
                quality checked before reaching
                our customers.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}

      <section className="border-y bg-white py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label}>
                <Text
                  variant="h3"
                  className="text-[var(--color-text-primary)]"
                >
                  {item.value}
                </Text>

                <Text variant="caption">
                  {item.label}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Trust Us */}

      <section className="py-16">
        <Container>
          <Text
            variant="h3"
            className="mb-10 text-center text-black"
          >
            Why Trust Us
          </Text>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-6 text-center"
              >
                <item.icon
                  size={38}
                  className="mx-auto text-[var(--color-text-primary)]"
                />

                <Text
                  variant="h6"
                  className="mt-4 text-black"
                >
                  {item.title}
                </Text>

                <Text
                  variant="bodySmall"
                  className="mt-2"
                >
                  {item.desc}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Locations */}

      <section className="pb-16">
        <Container>
          <Text
            variant="h4"
            className="mb-8 text-center text-black"
          >
            Find Us Across Andhra Pradesh
          </Text>

          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((city) => (
              <div
                key={city}
                className="
                  rounded-full
                  bg-blue-50
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-[var(--color-text-primary)]
                "
              >
                {city}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Map */}

      <section className="pb-20">
        <Container>
          <Text
            variant="h4"
            className="mb-6 text-center text-black"
          >
            Visit Our Main Store — Guntur
          </Text>

          <div className="overflow-hidden rounded-2xl border bg-white">
            <iframe
              title="Surgical World"
              src="https://maps.google.com/maps?q=guntur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[400px] w-full"
              loading="lazy"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}