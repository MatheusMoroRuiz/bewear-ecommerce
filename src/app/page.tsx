import { Header } from "@/components/common/header";
import Footer from "@/components/common/footer";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import ProductList from "@/components/common/product-list";
import CategorySelector from "@/components/common/category-selector";
import { productTable } from "@/db/schema";
import Link from "next/link";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });

  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />

      {/* Container centralizado com paddings responsivos */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* NAV DESKTOP (lg+) */}
        <nav
          className="text-muted-foreground mx-auto flex hidden h-16 max-w-7xl justify-center px-4 sm:px-6 lg:flex lg:items-center lg:gap-28 lg:px-8"
          aria-label="Navegação principal"
        >
          {/* exemplo de links; remova/ajuste conforme seu projeto */}
          <Link
            href="/category/acessrios"
            className="text-sm font-medium hover:opacity-80"
          >
            Acessórios
          </Link>
          <Link
            href="/category/bermuda-shorts"
            className="text-sm font-medium hover:opacity-80"
          >
            Bermuda & Shorts
          </Link>
          <Link
            href="/promocoes"
            className="text-sm font-medium hover:opacity-80"
          >
            Calças
          </Link>
          <Link
            href="/category/camisetas"
            className="text-sm font-medium hover:opacity-80"
          >
            Camisetas
          </Link>
          <Link
            href="/category/jaquetas-moletons"
            className="text-sm font-medium hover:opacity-80"
          >
            Jaquetas & Moletons
          </Link>
          <Link
            href="/category/tnis"
            className="text-sm font-medium hover:opacity-80"
          >
            Tênis
          </Link>
        </nav>
        {/* Banner topo */}
        <section className="py-6">
          {/* Imagem para desktop */}
          <div className="mx-auto hidden w-full max-w-[1200px] md:block">
            <Image
              src="/banner-01-pc.png"
              alt="Banner Desktop"
              width={0}
              height={0}
              priority
              sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1000px, 100vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          {/* Imagem para celular */}
          <div className="block w-full md:hidden">
            <Image
              src="/banner-01.png"
              alt="Banner Mobile"
              width={0}
              height={0}
              priority
              sizes="100vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        {/* Grid responsiva: sidebar (categorias) + conteúdo */}
        <section className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar fixa (aparece só em lg+) */}
          <aside className="hidden self-start lg:sticky lg:top-24 lg:col-span-3 lg:block">
            <CategorySelector categories={categories} />
          </aside>

          {/* Conteúdo principal */}
          <div className="space-y-8 lg:col-span-9">
            {/* Em mobile, categorias acima da lista */}
            <div className="lg:hidden">
              <CategorySelector categories={categories} />
            </div>

            <ProductList products={products} title="Mais vendidos" />

            <div>
              <Image
                src="/banner-02.png"
                alt="Leve uma vida com estilo"
                width={1920}
                height={600}
                sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 1000px, 100vw"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>

            <ProductList
              products={newlyCreatedProducts}
              title="Novos produtos"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
