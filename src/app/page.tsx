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
      <main className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* NAV DESKTOP (lg+) */}
        <nav
          className="text-muted-foreground hidden h-16 justify-center lg:flex lg:items-center lg:gap-28"
          aria-label="Navegação principal"
        >
          {/* Seus links de navegação */}
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
            href="/category/calas"
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

        {/* Seção Banner Topo */}
        <section>
          {/* Imagem para desktop */}
          <div className="hidden md:block">
            <Image
              src="/banner-01-pc.png"
              alt="Banner principal versão desktop"
              width={1200}
              height={400} // Ajuste a altura conforme necessário
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
          {/* Imagem para celular */}
          <div className="block md:hidden">
            <Image
              src="/banner-01.png"
              alt="Banner principal versão mobile"
              width={700}
              height={300} // Ajuste a altura conforme necessário
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        {/* Seção de Categorias para Mobile */}
        <section className="lg:hidden">
          <CategorySelector categories={categories} />
        </section>

        {/* Seção "Mais vendidos" */}
        <section>
          <ProductList products={products} title="Mais vendidos" />
        </section>

        {/* Seção Banner Meio */}
        <section>
          <Image
            src="/banner-02.png"
            alt="Banner secundário sobre estilo"
            width={1200}
            height={400} // Ajuste a altura conforme necessário
            className="h-auto w-full rounded-2xl object-cover"
          />
        </section>

        {/* Seção "Novos produtos" */}
        <section>
          <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
