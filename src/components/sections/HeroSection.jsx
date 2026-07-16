"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

import {
  Phone,
  Star,
  Award,
  Truck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { useBanners } from "@/hooks/usebanner";

export default function HeroSection() {
  const router = useRouter();
  const { banners, loading } = useBanners();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration flickering by checking mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use the backend banner image if it exists, otherwise use your static asset fallback
  const heroBanner = banners?.[0];
  const heroImage = heroBanner?.image_url || "/surgimage.png";

  const handlechange = () => {
    router.push("/products");
  };

  const handleWhatsApp = () => {
    const phone = "919885161899";
    const message = encodeURIComponent(
      "Hi, I'm interested in your surgical & medical products."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const handleBannerClick = () => {
    if (heroBanner?.redirect_url) {
      router.push(heroBanner.redirect_url);
    }
  };

  return (
    <section className="py-15 lg:py-20">
      <Container className="max-w-[1700px] px-6 lg:px-10 xl:px-12">
        <div className="grid lg:grid-cols-[60%_40%] gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 mb-6">
              <span>🏥</span>
              <span className="text-text-primary text-sm font-medium">
                India's Trusted Medical Store
              </span>
            </div>

            <Text as="h1" variant="display" className="text-black max-w-3xl">
              One stop for{" "}
              <span className="text-text-primary">
                All your surgical & medical
              </span>{" "}
              Equiments
            </Text>

            <Text className="mt-6 max-w-xl text-lg text-paragraph">
              Over 25 years of excellence supplying surgical & medical
              equipment to hospitals, clinics, and homes across Andhra
              Pradesh.
            </Text>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handlechange}
                className="bg-text-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
              >
                Shop Now →
              </button>

              <button
                onClick={handleWhatsApp}
                className="border border-accent text-accent px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-accent hover:text-white transition"
              >
                <FaWhatsapp size={18} />
                WhatsApp Us
              </button>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="font-bold text-black">4.9/5</span>
              <span className="text-paragraph">by 2,400+ customers</span>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[32px] bg-[#dfe7ff] min-h-[500px] shadow-xl cursor-pointer"
              onClick={heroBanner?.redirect_url ? handleBannerClick : undefined}
            >
              <div className="relative h-[500px] w-full">
                {/* 
                  Only show the loading skeletons while the component mounts or fetches. 
                  Once ready, it smoothly handles dynamic image vs static fallback link structures.
                */}
                {!mounted || loading ? (
                  <div className="absolute inset-0 animate-pulse bg-gray-200" />
                ) : (
                  <Image
                    src={heroImage}
                    alt={heroBanner?.title || "Surgical Equipment"}
                    fill
                    priority
                    unoptimized={heroImage === "/surgimage.png"}
                    className="object-cover"
                  />
                )}
              </div>
            </div>

            {/* Floating Call Button */}
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={handleWhatsApp}
                className="bg-accent text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-2 font-semibold"
              >
                <FaWhatsapp size={20} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}