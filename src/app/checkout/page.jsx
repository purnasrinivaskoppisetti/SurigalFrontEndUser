"use client";

import {
  Container,
} from "@/components";

import { CheckoutForm,CheckoutSteps } from "@/components";

export default function CheckoutPage() {
  return (
    <section className="bg-gray-50 py-10">
      <Container>
        <div className="mx-auto max-w-4xl">
          <CheckoutSteps
            currentStep={2}
          />

          <CheckoutForm />
        </div>
      </Container>
    </section>
  );
}