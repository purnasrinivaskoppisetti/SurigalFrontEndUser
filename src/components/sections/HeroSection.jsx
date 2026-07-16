"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Text from "@/components/ui/Text";

import {
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { useBanners } from "@/hooks/usebanner";

export default function HeroSection() {
  const router = useRouter();
  const { banners, loading } = useBanners();
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Touch handlers for mobile swipe gestures
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe fallback to static asset if backend returns nothing or is loading
  const bannerList = banners && banners.length > 0 
    ? banners 
    : [{ image_url: "/surgimage.png", title: "Surgical Equipment", redirect_url: null }];

  const totalSlides = bannerList.length;

  // Infinite Auto-Scrolling Logic
  useEffect(() => {
    if (!mounted || loading || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 4000); // Slides advance every 4 seconds

    return () => clearInterval(interval);
  }, [mounted, loading, totalSlides]);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

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

  const handleBannerClick = (banner) => {
    if (banner?.redirect_url) {
      router.push(banner.redirect_url);
    }
  };

  return (
    <section className="py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-white">
      <Container className="max-w-[1700px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid lg:grid-cols-[55%_45%] gap-10 lg:gap-8 xl:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 border border-indigo-100/50 transition-all duration-300 hover:bg-indigo-50/80">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase">
                🏥 India's Trusted Medical Store
              </span>
            </div>

                <Text as="h1" variant="display" className="text-black max-w-3xl">

              One stop for{" "}

              <span className="text-text-primary">

                All your surgical & medical

              </span>{" "}

              Equiments

            </Text>



            <Text className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-paragraph leading-relaxed">
              Over 25 years of excellence supplying surgical & medical
              equipment to hospitals, clinics, and homes across Andhra
              Pradesh.
            </Text>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handlechange}
                className="w-full sm:w-auto bg-text-primary text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
              >
                Shop Now →
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full sm:w-auto border border-accent text-accent px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all duration-200 active:scale-[0.99]"
              >
                <FaWhatsapp size={18} />
                WhatsApp Us
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" className="drop-shadow-xs" />
                ))}
              </div>
              <span className="text-sm font-bold text-black border-l border-gray-200 pl-3">4.9/5 Rating</span>
              <span className="text-sm text-paragraph font-medium">by 2,400+ customers</span>
            </div>
          </div>

          {/* RIGHT CAROUSEL CARD */}
          <div className="relative group/carousel w-full max-w-[600px] lg:max-w-none mx-auto">
            {/* Background glowing halo design accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-blue-500/5 rounded-[36px] blur-xl scale-105 pointer-events-none" />
            
            <div
              className="relative overflow-hidden rounded-[32px] bg-[#dfe7ff] h-[380px] sm:h-[480px] xl:h-[500px] shadow-2xl border border-white/40"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* SKELETON LOADING STATE */}
              {!mounted || loading ? (
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
              ) : (
                <>
                  {/* Sliding Container Wrapper */}
                  <div 
                    className="flex h-full transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {bannerList.map((banner, index) => {
                      const isFallback = !banner?.image_url;
                      const imageSrc = banner?.image_url || "/surgimage.png";

                      return (
                        <div 
                          key={banner?.id || index} 
                          className="min-w-full h-full relative cursor-pointer overflow-hidden group/slide"
                          onClick={() => handleBannerClick(banner)}
                        >
                          <Image
                            src={imageSrc}
                            alt={banner?.title || "Surgical Equipment"}
                            fill
                            priority={index === 0}
                            unoptimized={isFallback}
                            className="object-cover transform transition-transform duration-700 group-hover/slide:scale-[1.03] pointer-events-none select-none"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP CONTROLS: Arrow navigation triggers */}
                  {totalSlides > 1 && (
                    <>
                      {/* Left Arrow Button */}
                      <button
                        onClick={prevSlide}
                        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-black items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 z-10 active:scale-90"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {/* Right Arrow Button */}
                      <button
                        onClick={nextSlide}
                        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-black items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 z-10 active:scale-90"
                        aria-label="Next slide"
                      >
                        <ChevronRight size={20} />
                      </button>

                      {/* Pagination Indicator Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-black/15 px-3 py-1.5 rounded-full backdrop-blur-xs">
                        {bannerList.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentSlide(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              currentSlide === index ? "w-5 bg-white" : "w-2 bg-white/50"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Floating Call Button */}
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={handleWhatsApp}
                className="bg-accent text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-2 font-semibold hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <FaWhatsapp size={20} />
              </button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}