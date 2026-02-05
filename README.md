# Mini Blog - Test Technique Next.js

Un mini site de blog démontrant les fonctionnalités avancées de Next.js avec TypeScript, ISR, et shadcn/ui.

<img width="1901" height="954" alt="image" src="https://github.com/user-attachments/assets/28fad7f6-1eae-4239-b9fa-9a89959c61a5" />
<img width="1901" height="954" alt="image" src="https://github.com/user-attachments/assets/541acdf7-7882-4af7-ae90-abd22eb209c5" />



## 🚀 Technologies Utilisées

- **Next.js 16** (Pages Router)
- **TypeScript** (strict, sans `any`)
- **shadcn/ui** avec Tailwind CSS
- **ISR** (Incremental Static Regeneration)
- **API Routes** (Fullstack Next.js)

## 📋 Fonctionnalités

### Pages Principales
- **Page d'accueil** (`/`) - Liste des articles avec ISR
- **Détail d'article** (`/articles/[id]`) - Pages dynamiques avec `getStaticPaths`

### API Routes
- `GET /api/articles` - Tous les articles
- `GET /api/articles/[id]` - Article spécifique par ID

### Optimisations Next.js
- **ISR** - `getStaticProps` avec `revalidate: 60`
- **SSG** - Pré-génération de toutes les pages d'articles
- **next/image** - Optimisation automatique des images
- **next/link** - Navigation côté client
- **TypeScript** - `InferGetStaticPropsType` pour l'inférence de types

## 🗂️ Structure du Projet

```
├── pages/
│   ├── index.tsx              # Accueil avec ISR
│   ├── articles/
│   │   └── [id].tsx          # Pages d'articles dynamiques
│   └── api/
│       └── articles/         # Routes API
├── components/
│   ├── ui/                   # Composants shadcn/ui
│   ├── article-card.tsx      # Carte d'article
│   └── article-detail.tsx    # Affichage d'article complet
├── lib/
│   └── articles.ts           # Fonctions d'accès aux données
├── types/
│   └── index.ts              # Interfaces TypeScript
└── data/
    └── articles.json         # Données statiques
```

## 🛠️ Installation et Lancement

```bash
# Installation des dépendances
pnpm install

# Lancement en mode développement
pnpm run dev

# Build de production
pnpm run build

# Lancement en production
pnpm run start
```

## 📱 URLs de Test

- **Accueil** : `http://localhost:3000/`
- **Article 1** : `http://localhost:3000/articles/1`
- **API Articles** : `http://localhost:3000/api/articles`
- **API Article spécifique** : `http://localhost:3000/api/articles/1`

## 🎯 Concepts Next.js Démontrés

### ISR (Incremental Static Regeneration)
- Pages pré-générées au build time
- Régénération automatique toutes les 60 secondes
- Performance optimale + contenu frais

### Routage Dynamique
- `getStaticPaths` avec `fallback: 'blocking'`
- Génération à la demande pour nouveaux articles
- Gestion des états de chargement avec `isFallback`

### Optimisations
- Images optimisées avec `next/image`
- Navigation préchargée avec `next/link`
- Composants réutilisables avec shadcn/ui

### TypeScript
- Typage strict sans `any`
- `InferGetStaticPropsType` pour l'inférence automatique
- Interfaces propres pour les données

## ⚠️ Note Importante - Next.js 16 et App Router

**Ce projet utilise volontairement Pages Router et `getStaticProps` selon les exigences du test technique.**

### Évolution de Next.js 16
Avec **Next.js 13+** et l'**App Router**, les méthodes `getStaticProps`, `getStaticPaths` et `getServerSideProps` sont devenues **legacy** (obsolètes) :

- **Avant (Pages Router)** : `getStaticProps`, `getServerSideProps`, `getStaticPaths`
- **Maintenant (App Router)** : `fetch()` avec options de cache, Server Components, `generateStaticParams`

### Nouvelles Approches (App Router)
```typescript
// App Router - Next.js 16 moderne
async function getData() {
  const res = await fetch('http://localhost:3000/api/articles', {
    next: { revalidate: 60 } // ISR équivalent
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{/* contenu */}</div>;
}
```

### Pourquoi Pages Router ici ?
1. **Exigences du test** - Le test demande spécifiquement `getStaticProps` et `getStaticPaths`
2. **Migration** - Beaucoup de projets existants utilisent encore Pages Router
3. **Compatibilité** - Support à long terme pour les applications existantes

### Migration vers App Router
Pour migrer ce projet vers App Router moderne :
- Remplacer `getStaticProps` par `fetch()` avec `next: { revalidate: 60 }`
- Utiliser `generateStaticParams` au lieu de `getStaticPaths`
- Transformer en Server Components avec `async/await`

## 📝 Notes

### Images
- Les images sont générées aléatoirement par le service [Picsum Photos](https://picsum.photos/)
- Chaque rechargement peut afficher une image différente due à la nature aléatoire de l'URL
- Format utilisé : `https://picsum.photos/800/400?random={id}`

### Données
- Les articles sont stockés dans un fichier JSON statique (`data/articles.json`)
- 6 articles de démonstration en français
- Dates de création simulées pour tester le tri chronologique

## 🙏 Crédits

- **Images** : [Picsum Photos](https://picsum.photos/) pour les images de démonstration aléatoires
- **UI** : [shadcn/ui](https://ui.shadcn.com/) pour les composants
- **Icons** : [Lucide React](https://lucide.dev/) pour les icônes

## 📊 Performance

Le build de production génère :
- **9 pages** pré-rendues (1 accueil + 6 articles + pages système)
- **ISR activé** sur toutes les pages de contenu
- **API Routes** pour les fonctionnalités fullstack

---

*Développé pour un test technique démontrant les capacités avancées de Next.js*
