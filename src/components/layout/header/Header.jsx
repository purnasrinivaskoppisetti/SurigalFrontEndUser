"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Menu, X, Heart, User, ShoppingCart, Search, Mail, Phone, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Container, AuthModal } from "@/components";

import useCartCount from "@/hooks/useCartCountHeader";
import useWishlistCount from "@/hooks/usewishlistcount";
import { setUser, clearUser } from "@/redux/userSlice";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");

  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const user = useSelector((state) => state.user.user);
  const { cartCount } = useCartCount();
  const { wishlistCount } = useWishlistCount();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const savedUser = Cookies.get("user");
    if (savedUser) dispatch(setUser(JSON.parse(savedUser)));
  }, [dispatch, mounted]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideDesktop = desktopProfileRef.current && !desktopProfileRef.current.contains(e.target);
      const clickedOutsideMobile = mobileProfileRef.current && !mobileProfileRef.current.contains(e.target);
      
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user");
    Cookies.remove("user", { path: "/" });
    localStorage.removeItem("user");
    dispatch(clearUser());
    setMobileOpen(false);
    setProfileOpen(false);
    router.push("/");
  };

  const runSearch = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      router.push("/products");
      return;
    }
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const handleSearch = () => runSearch(search);
  const handleMobileSearch = () => runSearch(mobileSearch);

  const handleKeyDown = (fn) => (e) => {
    if (e.key === "Enter") fn();
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300",
        isScrolled && "shadow-sm"
      )}
    >
      <Container>
        <div className="flex h-14 items-center gap-3 md:h-16 md:gap-4 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex h-32 shrink-0 items-center sm:h-40 md:h-38 lg:h-46">
            <Image
              src="/surgicalimg4.png"
              alt="Surgical World"
              width={400}
              height={240}
              priority
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 400px"
              className="h-full w-auto object-contain"
            />
          </Link>

          {/* Desktop search */}
          <div className="relative hidden w-full max-w-2xl md:block">
            <Search
              size={18}
              onClick={handleSearch}
              className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-[var(--color-text-primary)]"
            />
            <input
              type="text"
              placeholder="Search surgical products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown(handleSearch)}
              className="h-11 w-full rounded-full border border-gray-300 bg-gray-50 pl-11 pr-24 text-sm outline-none transition focus:border-[var(--color-text-primary)] focus:bg-white"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--color-text-primary)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Search
            </button>
          </div>

          {/* Desktop right side layout */}
          <div className="ml-auto hidden shrink-0 items-center gap-4 md:flex">
            <IconButton
              onClick={() => router.push("/wishlist")}
              icon={<Heart size={18} />}
              count={mounted ? wishlistCount : 0}
              badgeClass="bg-red-500"
            />
            <IconButton
              as={Link}
              href="/cart"
              icon={<ShoppingCart size={18} />}
              count={mounted ? cartCount : 0}
              badgeClass="bg-[var(--color-text-primary)]"
            />

            <div className="w-[170px]" ref={desktopProfileRef}>
              {!mounted ? (
                <div className="h-[42px] w-full animate-pulse rounded-lg bg-gray-100" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="flex h-[42px] w-full items-center justify-between rounded-lg border border-gray-200 px-3 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <User size={16} className="shrink-0 text-gray-500" />
                      <span className="truncate text-sm font-medium">
                        {user.full_name}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "shrink-0 text-gray-400 transition-transform",
                        profileOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {profileOpen && (
                    <ProfileDropdown user={user} onLogout={handleLogout} />
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  <User size={16} />
                  <span className="text-sm font-medium">Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile right side layout */}
          <div className="ml-auto flex shrink-0 items-center gap-1 md:hidden">
            <IconButton
              as={Link}
              href="/wishlist"
              icon={<Heart size={19} />}
              count={mounted ? wishlistCount : 0}
              badgeClass="bg-red-500"
              compact
            />
            <IconButton
              as={Link}
              href="/cart"
              icon={<ShoppingCart size={19} />}
              count={mounted ? cartCount : 0}
              badgeClass="bg-[var(--color-text-primary)]"
              compact
            />

            {/* Profile icon renders ONLY when mounted AND user is logged in */}
            {mounted && user && (
              <div className="relative" ref={mobileProfileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-full text-gray-700 active:bg-gray-100 transition-colors",
                    profileOpen && "text-[var(--color-text-primary)] bg-gray-50"
                  )}
                >
                  <User size={20} />
                </button>
                {profileOpen && (
                  <ProfileDropdown user={user} onLogout={handleLogout} alignRight />
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 active:bg-gray-100"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <div className="pb-2.5 md:hidden">
          <div className="relative">
            <Search
              size={17}
              onClick={handleMobileSearch}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            />
            <input
              type="text"
              placeholder="Search surgical products..."
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              onKeyDown={handleKeyDown(handleMobileSearch)}
              className="h-10 w-full rounded-full border border-gray-300 bg-gray-50 pl-10 pr-16 text-sm outline-none transition focus:border-[var(--color-text-primary)] focus:bg-white"
            />
            <button
              onClick={handleMobileSearch}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-[var(--color-text-primary)] px-3 py-1.5 text-xs font-medium text-white active:opacity-90"
            >
              Search
            </button>
          </div>
        </div>
      </Container>

      {/* Desktop nav row */}
      <div className="hidden border-t border-gray-100 md:block">
        <Container>
          <nav className="flex h-11 items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "text-sm font-medium transition-colors",
                    active ? "text-[var(--color-text-primary)]" : "text-gray-700 hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            {mounted && user && (
              <Link
                href="/orders"
                className={clsx(
                  "text-sm font-medium transition-colors",
                  pathname === "/orders" ? "text-[var(--color-text-primary)]" : "text-gray-700 hover:text-[var(--color-text-primary)]"
                )}
              >
                Orders
              </Link>
            )}
          </nav>
        </Container>
      </div>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-50 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={clsx(
            "absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={clsx(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-white shadow-xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            {mounted && user ? (
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <User size={17} className="text-gray-500" />
                </div>
                <span className="truncate text-sm font-semibold">
                  {user.full_name}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold">Menu</span>
            )}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 active:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href ? "bg-gray-50 text-[var(--color-text-primary)]" : "text-gray-800 active:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            {mounted && user && (
              <Link
                href="/orders"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === "/orders" ? "bg-gray-50 text-[var(--color-text-primary)]" : "text-gray-800 active:bg-gray-50"
                )}
              >
                Orders
              </Link>
            )}
          </nav>

          <div className="border-t border-gray-100 px-5 py-4">
            {mounted && user ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-500 active:bg-red-50"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthOpen(true);
                  setMobileOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-text-primary)] py-2.5 text-sm font-medium text-white active:opacity-90"
              >
                <User size={16} />
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}

function ProfileDropdown({ user, onLogout, alignRight }) {
  return (
    <div
      className={clsx(
        "absolute top-full mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg z-50",
        alignRight ? "right-[-50px] sm:right-0" : "right-0"
      )}
    >
      <div className="space-y-2 px-5 py-4">
        <p className="font-semibold text-gray-900">{user?.full_name}</p>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={14} />
          <span className="truncate">{user?.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={14} />
          <span>{user?.phone}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 px-5 py-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function IconButton({ as: Comp = "button", icon, count, badgeClass, compact, ...props }) {
  return (
    <Comp
      type={Comp === "button" ? "button" : undefined}
      className={clsx(
        "relative flex items-center justify-center text-gray-700 transition-colors hover:text-[var(--color-text-primary)]",
        compact ? "h-9 w-9 rounded-full active:bg-gray-100" : "h-[42px] w-[42px]"
      )}
      {...props}
    >
      {icon}
      {count > 0 && (
        <span
          className={clsx(
            "absolute flex h-4 min-w-4 items-center justify-center rounded-full px-0.5 text-[10px] font-semibold text-white",
            compact ? "right-0.5 top-0.5" : "right-1 top-1",
            badgeClass
          )}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Comp>
  );
}