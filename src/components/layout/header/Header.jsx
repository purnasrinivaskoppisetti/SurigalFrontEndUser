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
import {
  setWishlist,
  clearWishlist,
} from "@/redux/wishlistSlice";
import useCartCount from "@/hooks/useCartCountHeader";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setUser,
  clearUser,
} from "@/redux/userSlice";
export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] =
    useState(false);
  const [
    wishlistMounted,
    setWishlistMounted,
  ] = useState(false);
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
    const wishlist =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        ) || "[]"
      );

    dispatch(
      setWishlist(
        wishlist
      )
    );

    setWishlistMounted(true);
  }, [dispatch]);
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

    sessionStorage.setItem(
      "productSearch",
      searchText
    );

    router.push("/products");
  };
  const wishlistCount =
    useSelector(
      (state) =>
        state.wishlist.items.length
    );
  useEffect(() => {
    const savedUser =
      Cookies.get("user");

    if (savedUser) {
      dispatch(
        setUser(
          JSON.parse(savedUser)
        )
      );
    }
  }, []);
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    localStorage.removeItem(
      "user"
    );

    dispatch(clearUser());
    dispatch(clearWishlist());

    router.push("/");
  };
  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled && "shadow-md"
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-3 lg:h-16">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-text-primary)] text-white">
              <Plus size={18} />
            </div>
            <Text
              as="h1"
              variant="h4"
              className="text-lg font-semibold text-[var(--color-text-primary)]"
            >
              Surgical World
            </Text>
          </Link>
          <div className="hidden max-w-xl flex-1 md:flex">
            <div className="flex h-[42px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
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
                className="h-full flex-1 px-4 text-sm outline-none"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="flex w-11 items-center cursor-pointer justify-center bg-[var(--color-text-primary)] text-white"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Desktop Right */}

          <div className="hidden items-center gap-4 md:flex">
            {/* Wishlist */}

            <button
              type="button"
              className="relative flex h-[42px] w-[42px] items-center justify-center"
            >
              <Heart size={18} />

              {wishlistMounted &&
                wishlistCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {wishlistCount}
                  </span>
                )}
            </button>

            {/* Cart */}

            <Link
              href="/cart"
              className="relative flex h-[42px] w-[42px] items-center justify-center"
            >
              <ShoppingCart size={18} />

              {mounted &&
                cartCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
            </Link>

            {/* User */}

            <div className="w-[170px]">
              {!mounted ? (
                <div className="h-[42px] w-full animate-pulse rounded-lg bg-gray-100" />
              ) : user ? (
                <div className="flex h-[42px] items-center justify-between rounded-lg border border-gray-200 px-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <User
                      size={16}
                      className="shrink-0 text-[var(--color-text-primary)]"
                    />

                    <span className="truncate text-sm font-medium">
                      {user.full_name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="ml-2 text-xs cursor-pointer font-medium text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setIsAuthOpen(true)
                  }
                  className="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3"
                >
                  <User
                    size={16}
                    className="text-[var(--color-text-primary)]"
                  />

                  <span className="text-sm font-medium">
                    Login
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile */}

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center"
            >
              <ShoppingCart size={18} />

              {mounted &&
                cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center"
            >
              <Menu size={20} />
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