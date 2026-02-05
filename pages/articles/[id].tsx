import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllArticleIds, getArticleById } from '@/lib/articles';
import { Article } from '@/types';
import { ArticleDetail } from '@/components/article-detail';
import { Skeleton } from '@/components/ui/skeleton';

type ArticlePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ArticlePage({ article }: ArticlePageProps) {
  const router = useRouter();

  // Handle fallback loading state with professional skeleton
  if (router.isFallback) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="w-full h-64 md:h-96 rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // Handle case where article is null (should show 404)
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <p className="mt-4">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} - Mini Blog Manohy</title>
        <meta name="description" content={article.description} />
      </Head>

      <ArticleDetail article={article} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articleIds = getAllArticleIds();

  const paths = articleIds.map((id) => ({
    params: { id }
  }));

  return {
    paths,
    fallback: 'blocking' // Generate pages on-demand for new articles
  };
};

export const getStaticProps: GetStaticProps<{
  article: Article | null;
}, { id: string }> = async ({ params }) => {
  const id = params?.id;

  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    };
  }

  const article = getArticleById(id);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
    revalidate: 60, // ISR: Regenerate page every 60 seconds
  };
};