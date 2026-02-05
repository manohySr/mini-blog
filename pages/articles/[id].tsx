import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllArticleIds, getArticleById } from '@/lib/articles';
import { Article } from '@/types';

type ArticlePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ArticlePage({ article }: ArticlePageProps) {
  const router = useRouter();

  // Handle fallback loading state
  if (router.isFallback) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading article...</p>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to articles
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">
              {article.description}
            </p>
            <time className="text-sm text-muted-foreground">
              Published on {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>

          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
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