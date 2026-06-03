"use client";
import { useEffect, useState } from "react";
import { Container, ProductCard, Text,ProductGrid} from "..";

import useProducts from "@/hooks/useProducts";
export default function BestSellingSection() {
  const {
    products,
    loading,
    pagination,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    fetchProducts({
      page: 1,
      page_size: 8,
    });
  }, []);
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mb-8 text-center">
          <Text
            as="h2"
            variant="h2"
            className="text-black"
          >
            Best Selling Products
          </Text>

          <Text className="mt-2 max-w-2xl mx-auto">
            Trusted healthcare essentials chosen by thousands
            of customers across India.
          </Text>
        </div>

        {/* Mobile Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 w-max pb-2">

          </div>
        </div>

        {/* Tablet/Desktop Grid */}
       
          <ProductGrid
            products={products}
          />    
        <div className="mt-10 text-center">
         
        </div>
      </Container>
    </section>
  );
}