"use client";

import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import {
  FiPhone,
  FiMail,
} from "react-icons/fi";

import {
  IoLocationOutline,
} from "react-icons/io5";

import { Container, Text } from "@/components";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
 
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
 
];

const CATEGORIES = [
  "Nebulizers",
  "BP Monitors",
  "Wheelchairs",
  "Surgical Instruments",
  "Gloves",
  "Ortho Care",
  "Airbeds",
  "Thermometers",
];

export default function Footer() {
  return (
    <footer className="mt-10 bg-[var(--color-black)] text-white">
      {/* Main Footer */}

      <Container>
        <div
          className="
            grid
            grid-cols-1
            gap-8
            py-10
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-10
            lg:py-12
          "
        >
          {/* Brand */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[var(--color-text-primary)]
                  text-3xl
                  font-bold
                  text-white
                "
              >
                +
              </div>

              <Text
                as="h3"
                variant="h4"
                className="text-white"
              >
                Surgical World
              </Text>
            </div>

            <Text
              variant="body"
              className="mb-5 text-white/70 leading-7"
            >
              Leading supplier of surgical &
              healthcare equipment across Andhra
              Pradesh since 1999.
            </Text>

            {/* Social Icons */}

            <div className="flex gap-3">
              <SocialIcon>
                <FaFacebookF size={18} />
              </SocialIcon>

              <SocialIcon>
                <FaInstagram size={18} />
              </SocialIcon>

              <SocialIcon>
                <FaYoutube size={18} />
              </SocialIcon>

              <SocialIcon>
                <FiPhone size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <Text
              as="h4"
              variant="h5"
              className="mb-4 text-white"
            >
              Quick Links
            </Text>

            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>
                    <Text
                      variant="body"
                      className="
                        cursor-pointer
                        text-white/70
                        transition
                        hover:text-[var(--color-text-primary)]
                      "
                    >
                      {item.label}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}

          <div>
            <Text
              as="h4"
              variant="h5"
              className="mb-4 text-white"
            >
              Categories
            </Text>

            <ul className="space-y-2">
              {CATEGORIES.map((item) => (
                <li key={item}>
                  <Text
                    variant="body"
                    className="
                      cursor-pointer
                      text-white/70
                      transition
                      hover:text-[var(--color-text-primary)]
                    "
                  >
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <Text
              as="h4"
              variant="h5"
              className="mb-4 text-white"
            >
              Contact Us
            </Text>

            <div className="space-y-3">
              {/* Phone */}

              <div className="flex gap-3">
                <FiPhone
                  size={18}
                  className="
                    mt-1
                    text-[var(--color-text-primary)]
                  "
                />

                <div>
                  <Text
                    variant="body"
                    className="text-white/70"
                  >
                    +91 98765 43210
                  </Text>

                  <Text
                    variant="body"
                    className="text-white/70"
                  >
                    +91 87654 32109
                  </Text>
                </div>
              </div>

              {/* Email */}

              <div className="flex gap-3">
                <FiMail
                  size={18}
                  className="
                    mt-1
                    text-[var(--color-text-primary)]
                  "
                />

                <Text
                  variant="body"
                  className="text-white/70"
                >
                  info@surgicalworld.in
                </Text>
              </div>

              {/* Address */}

              <div className="flex gap-3">
                <IoLocationOutline
                  size={18}
                  className="
                    mt-1
                    text-[var(--color-text-primary)]
                  "
                />

                <Text
                  variant="body"
                  className="text-white/70 leading-6"
                >
                  Old Club Road, Kothapeta,
                  Guntur, AP 522001
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Trust Bar */}

      <div className="border-t border-white/10">
        <Container>
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              py-4
              md:gap-5
            "
          >
            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              🔒 SSL Secure
            </Text>

            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              •
            </Text>

            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              ✅ Genuine Products
            </Text>

            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              •
            </Text>

            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              🚚 Fast Delivery
            </Text>

            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              •
            </Text>

            <Text
              variant="bodySmall"
              className="text-white/70"
            >
              ↩ Easy Returns
            </Text>
          </div>
        </Container>
      </div>

      {/* Copyright */}

      <div className="border-t border-white/10">
        <Container>
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-3
              py-5
              md:flex-row
            "
          >
            <Text
              variant="bodySmall"
              className="text-white/60"
            >
              © 2026 Surgical World. All rights
              reserved.
            </Text>

            <div className="flex items-center gap-4">
              <Link href="/privacy-policy">
                <Text
                  variant="bodySmall"
                  className="
                    text-white/60
                    hover:text-white
                  "
                >
                  Privacy Policy
                </Text>
              </Link>

              <Link href="/terms">
                <Text
                  variant="bodySmall"
                  className="
                    text-white/60
                    hover:text-white
                  "
                >
                  Terms
                </Text>
              </Link>

              <Link href="/refund-policy">
                <Text
                  variant="bodySmall"
                  className="
                    text-white/60
                    hover:text-white
                  "
                >
                  Refund Policy
                </Text>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function SocialIcon({ children }) {
  return (
    <button
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-white/10
        transition
        hover:bg-[var(--color-text-primary)]
      "
    >
      {children}
    </button>
  );
}