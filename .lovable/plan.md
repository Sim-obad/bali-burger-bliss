# Plan : être référencé sur Google pour The Potato Bun Club

## Objectif
Mettre en place les bases techniques du référencement naturel (SEO) pour que Google puisse découvrir, crawler et indexer le site publié https://tpbc-amed.lovable.app.

## État actuel
- Le site est publié et accessible publiquement.
- `robots.txt` autorise les crawlers.
- Les balises `<title>`, `<meta name="description">` et Open Graph sont présentes sur la page d’accueil.
- Le balisage JSON-LD `Restaurant` est présent.
- **Manquant** : un fichier `sitemap.xml`, une connexion Google Search Console, et quelques optimisations locales.

## Étapes du plan

### 1. Créer un sitemap.xml
Ajouter une route serveur `/sitemap.xml` qui liste la page d’accueil (et les futures pages si on en ajoute). Cela aide Google à découvrir le site.

### 2. Améliorer les métadonnées et le balisage local
- Ajouter `<link rel="canonical">` et `og:url` pointant vers https://tpbc-amed.lovable.app/.
- Corriger le JSON-LD pour que `url` pointe vers le site web (pas Instagram) et ajouter `telephone`, `priceRange`, `image`, `geo` et `hasMenu` si possible.
- Vérifier que le titre et la description ciblent bien "burger Amed Bali".

### 3. Connecter Google Search Console
- Vérifier le site auprès de Google Search Console via une balise meta (méthode recommandée pour un site Lovable).
- Une fois vérifié, soumettre le sitemap.

### 4. Lancer un audit SEO intégré
- Utiliser l’outil SEO de Lovable pour détecter d’éventuels problèmes techniques (titres, images, liens, performances mobile).

### 5. Vérifier l’indexation
- Après connexion GSC, consulter l’état d’indexation de la page d’accueil.
- Si la page n’est pas indexée, demander une indexation manuelle via GSC.

## Résultat attendu
Google pourra crawler le site, comprendre qu’il s’agit d’un restaurant de burgers à Amed, Bali, et commencer à l’afficher dans ses résultats pour des recherches locales comme "burger amed bali" ou "the potato bun club".

## Note importante
Le référencement naturel prend généralement quelques jours à quelques semaines. Les optimisations techniques accélèrent la découverte, mais le positionnement dépend aussi de la concurrence locale et des liens/avis externes.
