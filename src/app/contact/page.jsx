"use client";

import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  Container,
  Text,
} from "@/components";

export default function ContactPage() {
  return (
    <section className="py-12 md:py-12">
      <Container>
        <div className="mb-10 text-center">
          <Text
            variant="h2"
            className="mb-2 text-black"
          >
            Get in Touch
          </Text>

          <Text variant="bodySmall">
            We typically respond within
            2 hours during business
            hours
          </Text>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <Text
              variant="h5"
              className="mb-5 text-black"
            >
              Send Us a Message
            </Text>

            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Name *
                  </label>

                  <input
                    type="text"
                    className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Phone *
                  </label>

                  <input
                    type="tel"
                    className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Email
                </label>

                <input
                  type="email"
                  className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Subject
                </label>

                <select className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]">
                  <option>
                    General Enquiry
                  </option>

                  <option>
                    Product Enquiry
                  </option>

                  <option>
                    Order Support
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Message *
                </label>

                <textarea
                  rows={5}
                  className="w-full rounded-lg border p-4 outline-none focus:border-[var(--color-text-primary)]"
                />
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-[var(--color-accent)] font-medium text-white transition hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Phone
                    size={18}
                    className="text-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <Text
                    variant="h6"
                    className="mb-1 text-black"
                  >
                    Call Us
                  </Text>

                  <Text
                    variant="bodySmall"
                  >
                    +91 98765 43210
                    <br />
                    +91 87654 32109
                  </Text>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <Mail
                    size={18}
                    className="text-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <Text
                    variant="h6"
                    className="mb-1 text-black"
                  >
                    Email
                  </Text>

                  <Text
                    variant="bodySmall"
                  >
                    info@surgicalworld.in
                  </Text>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                  <MapPin
                    size={18}
                    className="text-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <Text
                    variant="h6"
                    className="mb-1 text-black"
                  >
                    Visit Us
                  </Text>

                  <Text
                    variant="bodySmall"
                  >
                    Old Club Road,
                    Kothapeta,
                    Guntur,
                    Andhra Pradesh
                    522001
                  </Text>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <iframe
                title="Surgical World Location"
                src="https://maps.google.com/maps?q=Guntur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}