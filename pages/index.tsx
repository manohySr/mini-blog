import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { Article } from "@/types";

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HomePage({ articles }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Mini blog Manohy</title>
        <meta
          name="description"
          content="A blog built with Next.js ISR and TypeScript"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Mini Blog</h1>
          <p className="text-muted-foreground text-lg">
            NextJs for technical test purpose
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/articles/${article.id}`} className="block">
                <div className="relative w-full h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {article.description}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async () => {
  const articles = getAllArticles();

  return {
    props: {
      articles,
    },
    revalidate: 60, // ISR: Regenerate page every 60 seconds
  };
};

