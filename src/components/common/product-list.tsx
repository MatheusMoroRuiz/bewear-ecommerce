"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductItem from "./product-item";
import { productTable, productVariantTable } from "@/db/schema"; // Adicionei os imports que podem estar faltando

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="max-w-full space-y-4 py-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
