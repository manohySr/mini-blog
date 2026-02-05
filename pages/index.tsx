import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { getAllArticles } from "@/lib/articles";
import { Article } from "@/types";
import { ArticleCard } from "@/components/article-card";

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
          <p className="text-muted-foreground text-lg">Test tech avec Next16</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
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
