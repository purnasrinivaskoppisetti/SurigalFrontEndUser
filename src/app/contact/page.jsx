"use client";

import { useState } from "react";

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
  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Enter a valid 10 digit phone number";
    }

    // Email
    if (
      formData.email &&
      !/^\S+@\S+\.\S+$/.test(formData.email)
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("FORM DATA:", formData);

    alert("Message Sent Successfully!");

    // Reset Form
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "General Enquiry",
      message: "",
    });
  };

  // =========================
  // CALL FUNCTION
  // =========================

  const handleCallPrimary = () => {
    window.location.href = "tel:+919885161899";
  };

  const handleCallSecondary = () => {
    window.location.href = "tel:+919849845670";
  };

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

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Phone *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Subject
                </label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border px-4 outline-none focus:border-[var(--color-text-primary)]"
                >
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

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Message *
                </label>

                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border p-4 outline-none focus:border-[var(--color-text-primary)]"
                />

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
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
            {/* Phone */}
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

                  <button
                    onClick={handleCallPrimary}
                    className="block text-left text-sm text-gray-600 hover:text-[var(--color-text-primary)]"
                  >
                    +91 9885161899
                  </button>

                  <button
                    onClick={handleCallSecondary}
                    className="block text-left text-sm text-gray-600 hover:text-[var(--color-text-primary)]"
                  >
                    +91 9849845670
                  </button>
                </div>
              </div>
            </div>

            {/* Email */}
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

                  <a
                    href="mailto:surgicalworldgnt@gmail.com"
                    className="text-sm text-gray-600 hover:text-[var(--color-text-primary)]"
                  >
                    surgicalworldgnt@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
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

                  <a
                    href="https://maps.app.goo.gl/sfbgvP1A6bQHvWFa8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-[var(--color-text-primary)] leading-6"
                  >
                    Old Club Rd, opp. Karumuri Hospitals,
                    Gunturvari Thota, Kothapeta,
                    Guntur, Andhra Pradesh 522001
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <iframe
                title="Surgical World Location"
                src="https://maps.google.com/maps?q=Old%20Club%20Rd%20Guntur&t=&z=15&ie=UTF8&iwloc=&output=embed"
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