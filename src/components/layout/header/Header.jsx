"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  Plus,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Container, Text, AuthModal } from "@/components";
export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useSelector(
    (state) => state.user.user
  );
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled && "shadow-md"
      )}
    >
      <Container>
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-text-primary)] text-white">
              <Plus size={22} />
            </div>
            <Text
              as="h1"
              variant="h4"
              className="text-[var(--color-text-primary)]"
            >
              Surgical World
            </Text>
          </Link>
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full overflow-hidden rounded-xl border bg-white">
              <input
                type="text"
                placeholder="Search products..."
                className="h-12 flex-1 px-4 outline-none"
              />

              <button className="flex w-14 items-center justify-center bg-[var(--color-text-primary)] text-white">
                <Search size={20} />
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {/* Wishlist */}
            <button className="relative">
              <Heart size={24} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-reddish)] text-xs text-white">
                2
              </span>
            </button>
            <button className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs text-white">
                1
              </span>
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                  <User
                    size={16}
                    className="text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">
                    Welcome
                  </span>

                  <span className="max-w-[120px] truncate text-sm font-semibold text-[var(--color-black)]">
                    {user.full_name}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition hover:border-[var(--color-text-primary)] hover:bg-blue-50"
              >
                <User
                  size={18}
                  className="text-[var(--color-text-primary)]"
                />

                <span className="text-sm font-medium text-[var(--color-black)]">
                  Login
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <button className="relative">
              <ShoppingCart size={22} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] text-white">
                1
              </span>
            </button>
            <button>
              <Menu size={26} />
            </button>
          </div>
        </div>
      </Container>

      {/* Navigation Desktop */}

      <div className="hidden border-t md:block">
        <Container>
          <nav className="flex h-14 items-center gap-4">
            <NavLink href="/">
              Home
            </NavLink>

            <NavLink href="/products">
              Products
            </NavLink>
            <NavLink href="/about">
              About
            </NavLink>

            <NavLink href="/contact">
              Contact
            </NavLink>
          </nav>
        </Container>
      </div>
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href}>
      <Text
        as="span"
        variant="body"
        className="font-medium text-[var(--color-black)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        {children}
      </Text>
    </Link>
  );
}