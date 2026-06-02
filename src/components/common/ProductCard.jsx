import Image from "next/image";

export default function ProductCard({
  product,
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative h-40 md:h-56">
        <Image
          src={
            product?.thumbnail_url ||
            "/images/product-placeholder.png"
          }
          alt={
            product?.name ||
            "Product"
          }
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3 md:p-4">
        <p className="text-xs text-gray-500">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-[var(--color-black)] md:text-base">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500 md:text-sm">
          {
            product.category_name
          }
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-bold text-[var(--color-text-primary)] md:text-lg">
            ₹
            {Number(
              product.sale_price
            ).toLocaleString()}
          </span>

          <span className="text-xs text-gray-400 line-through md:text-sm">
            ₹
            {Number(
              product.mrp
            ).toLocaleString()}
          </span>
        </div>

        <button className="mt-3 w-full rounded-lg bg-[var(--color-text-primary)] py-2 text-sm text-white">
          Add To Cart
        </button>
      </div>
    </div>
  );
}