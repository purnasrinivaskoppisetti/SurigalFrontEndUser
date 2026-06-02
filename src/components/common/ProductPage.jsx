"use client";

import { useEffect, useState } from "react";
import {
  Text,
  FilterSidebar,
  ProductGrid,
  Container,
} from "@/components";

import useProducts from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";

export default function ProductsPage({
  pageTitle = "Products",
}) {
  const [categoryId, setCategoryId] =
    useState("");

  const { categories } =
    useCategories();

  const {
    products,
    loading,
    pagination,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    fetchProducts({
      page: 1,
      page_size: 20,
      category_id: categoryId,
    });
  }, [categoryId]);

  return (
    <section className="py-6 md:py-8">
      <Container>
        <div className="mb-5">
          <Text
            variant="h4"
            className="text-black"
          >
            {pageTitle}
          </Text>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          {/* Desktop Sidebar */}

          <div className="hidden w-[280px] shrink-0 md:block">
            <FilterSidebar
              selectedCategory={
                categoryId
              }
              onCategoryChange={
                setCategoryId
              }
            />
          </div>

          <div className="min-w-0 flex-1">
            {/* Mobile Category Dropdown */}

            <div className="mb-4 md:hidden">
              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(
                    e.target.value
                  )
                }
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-left font-medium text-black outline-none"
              >
                <option value="">
                  All Categories
                </option>

                {categories?.map(
                  (category) => (
                    <option
                      key={
                        category.id
                      }
                      value={
                        category.id
                      }
                    >
                      {
                        category.name
                      }
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Count */}

            <div className="mb-5">
              <Text
                variant="body"
                className="font-medium text-black"
              >
                Showing{" "}
                {products?.length ||
                  0}{" "}
                of{" "}
                {pagination?.total_records ||
                  0}{" "}
                products
              </Text>
            </div>

            {/* Products */}

            {loading ? (
              <div className="py-20 text-center">
                Loading...
              </div>
            ) : (
              <ProductGrid
                products={products}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}