"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import {
  Menu,
  Heart,
  User,
  Plus,
  ShoppingCart,
} from "lucide-react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

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

import {
  setUser,
  clearUser,
} from "@/redux/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  // =========================
  // STATES
  // =========================
  const [mounted, setMounted] =
    useState(false);

  const [wishlistMounted, setWishlistMounted] =
    useState(false);

  const [isAuthOpen, setIsAuthOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  // =========================
  // REDUX
  // =========================
  const user = useSelector(
    (state) => state.user.user
  );

  const wishlistCount = useSelector(
    (state) =>
      state.wishlist.items.length
  );

  const { cartCount } =
    useCartCount();

  // =========================
  // MOUNT
  // =========================
  useEffect(() => {
    setMounted(true);
  }, []);

  // =========================
  // LOAD WISHLIST
  // =========================
  useEffect(() => {
    if (!mounted) return;

    const wishlist = JSON.parse(
      localStorage.getItem(
        "wishlist"
      ) || "[]"
    );

    dispatch(setWishlist(wishlist));

    setWishlistMounted(true);
  }, [dispatch, mounted]);

  // =========================
  // SCROLL EFFECT
  // =========================
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

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    if (!mounted) return;

    const savedUser =
      Cookies.get("user");

    if (savedUser) {
      dispatch(
        setUser(
          JSON.parse(savedUser)
        )
      );
    }
  }, [dispatch, mounted]);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    localStorage.removeItem(
      "user"
    );

    dispatch(clearUser());

    dispatch(clearWishlist());

    setMobileOpen(false);

    router.push("/");
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        isScrolled &&
          "shadow-md"
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-3 lg:h-16">

          {/* LOGO */}
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
              className="text-lg font-semibold text-text-primary"
            >
              Surgical World
            </Text>
          </Link>

          {/* DESKTOP RIGHT */}
          <div className="hidden items-center gap-4 md:flex">

            {/* WISHLIST */}
            <button
              type="button"
              className="relative flex h-[42px] w-[42px] items-center justify-center"
              onClick={() => {
                router.push(
                  "/wishlist"
                );
              }}
            >
              <Heart size={18} />

              {wishlistMounted &&
                wishlistCount >
                  0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {
                      wishlistCount
                    }
                  </span>
                )}
            </button>

            {/* CART */}
            <Link
              href="/cart"
              className="relative flex h-[42px] w-[42px] items-center justify-center"
            >
              <ShoppingCart
                size={18}
              />

              {mounted &&
                cartCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
            </Link>

            {/* USER */}
            <div className="w-[170px]">
              {!mounted ? (
                <div className="h-[42px] w-full animate-pulse rounded-lg bg-gray-100" />
              ) : user ? (
                <div className="flex h-[42px] items-center justify-between rounded-lg border border-gray-200 px-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <User size={16} />

                    <span className="truncate text-sm font-medium">
                      {
                        user.full_name
                      }
                    </span>
                  </div>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="ml-2 cursor-pointer text-xs font-medium text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setIsAuthOpen(
                      true
                    )
                  }
                  className="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3"
                >
                  <User size={16} />

                  <span className="text-sm font-medium">
                    Login
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">

            {/* WISHLIST */}
            <Link
              href="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center"
            >
              <Heart size={18} />

              {wishlistMounted &&
                wishlistCount >
                  0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {
                      wishlistCount
                    }
                  </span>
                )}
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center"
            >
              <ShoppingCart
                size={18}
              />

              {mounted &&
                cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-[10px] text-white">
                    {cartCount}
                  </span>
                )}
            </Link>

            {/* MENU */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  true
                )
              }
              className="flex h-9 w-9 items-center justify-center"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </Container>

      {/* DESKTOP NAV */}
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

            {mounted &&
              user && (
                <NavLink href="/orders">
                  Orders
                </NavLink>
              )}
          </nav>
        </Container>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col gap-4 bg-white p-4">

            <button
              className="self-end"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
            >
              ✕
            </button>

            <NavLink
              href="/"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
            >
              Home
            </NavLink>

            <NavLink
              href="/products"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
            >
              Products
            </NavLink>

            <NavLink
              href="/about"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
            >
              About
            </NavLink>

            <NavLink
              href="/contact"
              onClick={() =>
                setMobileOpen(
                  false
                )
              }
            >
              Contact
            </NavLink>

            {mounted &&
              user && (
                <NavLink
                  href="/orders"
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                >
                  Orders
                </NavLink>
              )}

            <hr />

            {user ? (
              <button
                onClick={
                  handleLogout
                }
                className="text-left text-red-500"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthOpen(
                    true
                  );

                  setMobileOpen(
                    false
                  );
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
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
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
    >
      <Text
        as="span"
        variant="body"
        className="
          font-medium
          text-black
          transition-colors
          hover:text-[var(--color-text-primary)]
        "
      >
        {children}
      </Text>
    </Link>
  );
}

















