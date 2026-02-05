import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import { Article } from "@/types";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="mb-8">
        <Button variant="ghost" asChild className="hover:bg-muted">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Revenir
          </Link>
        </Button>
      </nav>

      <article className="space-y-8">
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </Badge>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden">
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
          {article.content.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-foreground leading-relaxed first:mt-0 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild size="lg">
            <Link href="/">Voir tous les articles</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}

