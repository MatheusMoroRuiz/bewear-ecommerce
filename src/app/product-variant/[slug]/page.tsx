import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Header } from "@/components/common/header";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/common/product-list";
import Footer from "@/components/common/footer";
import VariantSelector from "./components/variant-selector";
import QuantitySelector from "./components/quantity-selector";

interface ProductVariantPageProps {
    params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductVariantPageProps) => {
    const { slug } = await params;
    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productTable.slug, slug),
        with: { 
            product: {
                with: {
                variants: true,
                },
            },
         }, //Trazer o produto dessa variante
    });
    if (!productVariant) {
        return notFound();
    }

    const likelyProducts = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: {
            variants: true,
        }
    })
    return (
        <>
            <Header />
            <div className="flex flex-col space-y-6">
                {/* Imagem da variante */}
                <Image
                src={productVariant.imageUrl}
                alt={productVariant.name}
                sizes="100vw"
                height={0}
                width={0}
                className="h-auto w-full object-cover"
                />


                <div className="px-5">
                    {/* VARIANTES*/}
                    <VariantSelector 
                    selectedVariantSlug={productVariant.slug}
                    variants={productVariant.product.variants}/>
                </div>

                <div className="px-5">
                    {/* DESCRIÇÃO */}

                    <h2 className="text-xl font-semibold">{productVariant.product.name}</h2>
                    <h3 className="text-muted-foreground text-sm">
                        {productVariant.name}
                    </h3>
                    <h3 className="text-lg font-semibold">
                        {formatCentsToBRL(productVariant.priceInCents)}
                    </h3>

                </div>


                    <div className="px-5">
                        <QuantitySelector />
                    </div>

                    <div className="flex flex-col space-y-4 px-5">
                        {/* BOTÕES */}
                        <Button className="rounded-full" size="lg" variant="outline">Adicionar à sacola</Button>
                        <Button className="rounded-full" size="lg">Comprar agora</Button>
                    </div>

                    <div className="px-5">
                        <p className="text-sm">{productVariant.product.description}</p>
                    </div>
                    
                    <ProductList title="Talvez você goste" products={likelyProducts} />

                    <Footer />
                </div>
        </>
    )
};

export default ProductPage;