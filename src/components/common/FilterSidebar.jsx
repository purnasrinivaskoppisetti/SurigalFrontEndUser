"use client";

import Text from "@/components/ui/Text";
import useCategories from "@/hooks/useCategories";
import { ChevronDown } from "lucide-react";

export default function FilterSidebar({
  selectedCategory = "",
  onCategoryChange,
}) {
  const {
    categories,
    loading,
  } = useCategories();

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="bg-blue-100 px-5 py-4">
        <Text
          variant="h4"
          className="text-black"
        >
          Category
        </Text>
      </div>

      <div>
        {loading ? (
          <div className="space-y-4 p-5">
            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="h-6 animate-pulse rounded bg-gray-100"
                />
              )
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() =>
                onCategoryChange("")
              }
              className={`flex w-full items-center justify-between px-5 py-4 text-left transition ${
                selectedCategory ===
                ""
                  ? "bg-[var(--color-text-primary)] text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">
                All Categories
              </span>
            </button>

            {categories?.map(
              (category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    onCategoryChange(
                      category.id
                    )
                  }
                  className={`flex w-full items-center justify-between px-5 py-4 text-left transition ${
                    selectedCategory ===
                    category.id
                      ? "bg-[var(--color-text-primary)] text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">
                    {category.name}
                  </span>

                  
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}