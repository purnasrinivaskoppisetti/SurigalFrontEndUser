"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Plus,
  Menu,
} from "lucide-react";

import Container from "./Container";
import clsx from "clsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        scrolled && "shadow-lg"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <button className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Plus size={22} />
            </button>

            <h1 className="font-bold text-blue-600 text-xl lg:text-3xl">
              Surgical World
            </h1>
          </div>

          {/* Search Desktop */}

          <div className="hidden md:flex flex-1 max-w-3xl mx-8">
            <div className="flex w-full overflow-hidden rounded-xl border border-gray-300">
              <input
                type="text"
                placeholder="Search surgical instruments..."
                className="flex-1 px-5 h-12 outline-none"
              />

              <button className="bg-blue-600 text-white w-16 flex items-center justify-center">
                <Search size={22} />
              </button>
            </div>
          </div>

          {/* Desktop Icons */}

          <div className="hidden md:flex items-center gap-6">
            <button className="relative">
              <Heart size={28} />

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            <button className="relative">
              <ShoppingCart size={28} />

              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                1
              </span>
            </button>

            <button>
              <User size={28} />
            </button>
          </div>

          {/* Mobile Menu */}

          <button className="md:hidden">
            <Menu size={28} />
          </button>
        </div>
      </Container>

      {/* Desktop Navigation */}

      <div className="hidden md:block border-t">
        <Container>
          <nav className="flex gap-10 h-14 items-center">
            <a href="/" className="text-blue-600 font-medium">
              Home
            </a>

            <a href="/shop">Shop</a>

            <a href="/categories">Categories</a>

            <a href="/about">About</a>

            <a href="/contact">Contact</a>
          </nav>
        </Container>
      </div>
    </header>
  );
}