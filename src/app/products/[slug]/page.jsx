import { ProductsPage } from "@/components";
export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <ProductsPage
      categorySlug={slug}
      
    />
  );
}