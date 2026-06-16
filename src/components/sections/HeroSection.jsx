"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

import {
  Phone,
  Star,
  Award,
  Truck,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  const handlechange = () => {
    router.push("/products");
  };

  // 📞 Call Function
  const handleCall = () => {
    window.location.href =
      "tel:+919390072900";
  };

  return (
    <section className="py-12 lg:py-20">
      <Container>
        <div className="grid lg:grid-cols-[60%_40%] gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 mb-6">
              <span>🏥</span>

              <span className="text-text-primary text-sm font-medium">
                India's Trusted Medical Store
              </span>
            </div>

            <Text
              as="h1"
              variant="display"
              className="text-black max-w-3xl"
            >
              Serving Healthcare with{" "}
              <span className="text-text-primary">
                Trusted Quality
              </span>{" "}
              Products
            </Text>

            {/* Description */}
            <Text className="mt-6 max-w-xl text-lg text-paragraph">
              Over 25 years of excellence
              supplying surgical & medical
              equipment to hospitals,
              clinics, and homes across
              Andhra Pradesh.
            </Text>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                "ISO Certified",
                "10,000+ Customers",
                "25 Yr Warranty Support",
              ].map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 rounded-full border bg-white text-black text-sm font-medium shadow-sm"
                >
                  ✓ {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handlechange}
                className="
                  bg-text-primary
                  text-white
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                  hover:opacity-90
                  transition
                  shadow-lg
                "
              >
                Shop Now →
              </button>

              {/* Call Button */}
              <button
                onClick={handleCall}
                className="
                  border
                  border-accent
                  text-accent
                  px-8
                  py-4
                  rounded-xl
                  font-semibold
                  flex
                  items-center
                  gap-2
                  hover:bg-accent
                  hover:text-white
                  transition
                "
              >
                <Phone size={18} />
                Call Now
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="font-bold text-black">
                4.9/5
              </span>

              <span className="text-paragraph">
                by 2,400+ customers
              </span>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative">
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-[#dfe7ff]
                min-h-[500px]
                shadow-xl
              "
            >
              {/* Free Delivery */}
              

              {/* IMAGE */}
              <div className="relative h-[500px] w-full">
                <Image
                  src="/surgimage.png"
                  alt="Surgical Equipment"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Bottom Badge */}
             
                

               
             
            </div>

            {/* Floating Call Button */}
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={handleCall}
                className="
                  bg-accent
                  text-white
                  px-6
                  py-4
                  rounded-full
                  shadow-xl
                  flex
                  items-center
                  gap-2
                  font-semibold
                "
              >
                <Phone size={20} />
                Call Now
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}