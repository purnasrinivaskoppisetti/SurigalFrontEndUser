"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import {
  Menu,
  Search,
  Heart,
  User,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { useSelector } from "react-redux";

import {
  Container,
  Text,
  AuthModal,
} from "@/components";

import useCartCount from "@/hooks/useCartCountHeader";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [searchText, setSearchText] =
    useState("");
  const [isAuthOpen, setIsAuthOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const user = useSelector(
    (state) => state.user.user
  );

  const { cartCount } =
    useCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 10
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);
  const handleSearch = () => {
    if (!searchText.trim()) return;

    router.push(
      `/products?search=${encodeURIComponent(
        searchText
      )}`
    );

    setSearchText("");
  };
  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled && "shadow-md"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
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

          {/* Search */}

          <div className="hidden max-w-2xl flex-1 md:flex">
            <div className="flex w-full overflow-hidden rounded-xl border bg-white">
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="h-12 flex-1 px-4 outline-none"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="flex w-14 items-center justify-center bg-[var(--color-text-primary)] text-white"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Desktop */}

          <div className="hidden items-center gap-6 md:flex">
            {/* Wishlist */}

            <button
              type="button"
              className="relative"
            >
              <Heart size={24} />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                2
              </span>
            </button>

            {/* Cart */}

            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingCart size={24} />

              {mounted &&
                cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-xs font-semibold text-white">
                    {cartCount}
                  </span>
                )}
            </Link>

            {/* User */}

            {!mounted ? (
              <div className="h-10 w-24 rounded-lg bg-gray-100 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                <User
                  size={18}
                  className="text-[var(--color-text-primary)]"
                />

                <span className="max-w-[120px] truncate text-sm font-medium text-black">
                  {user.full_name}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setIsAuthOpen(true)
                }
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition hover:border-[var(--color-text-primary)]"
              >
                <User
                  size={18}
                  className="text-[var(--color-text-primary)]"
                />

                <span className="text-sm font-medium">
                  Login
                </span>
              </button>
            )}
          </div>

          {/* Mobile */}

          <div className="flex items-center gap-4 md:hidden">
            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingCart size={24} />

              {mounted &&
                cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-xs font-semibold text-white">
                    {cartCount}
                  </span>
                )}
            </Link>

            <button type="button">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </Container>

      <div className="hidden border-t md:block">
        <Container>
          <nav className="flex h-14 items-center gap-6">
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
        onClose={() =>
          setIsAuthOpen(false)
        }
      />
    </header>
  );
}

function NavLink({
  href,
  children,
}) {
  return (
    <Link href={href}>
      <Text
        as="span"
        variant="body"
        className="font-medium text-black transition-colors hover:text-[var(--color-text-primary)]"
      >
        {children}
      </Text>
    </Link>
  );
}