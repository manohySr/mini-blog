export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
  createdAt: string; // ISO date string for JSON serialization
}

export interface ArticlesResponse {
  articles: Article[];
}

export interface ArticleResponse {
  article: Article | null;
}