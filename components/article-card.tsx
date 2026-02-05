import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 p-0 pb-5">
      <Link href={`/articles/${article.id}`} className="block">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
        </div>

        <CardHeader className="pb-3 pt-4">
          <h2 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h2>
        </CardHeader>

        <CardContent className="pt-0 pb-3">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {article.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0">
          <Badge variant="secondary" className="text-xs">
            {formattedDate}
          </Badge>
        </CardFooter>
      </Link>
    </Card>
  );
}
