# Connecter le flux Instagram @thepotatobunclub

Le code du site est déjà prêt à afficher tes vrais posts : il appelle l'API Instagram et, tant qu'il n'y a pas de jeton d'accès, il affiche les 4 photos locales de secours. Il ne manque que la connexion.

## Ce qu'il faut de ton côté

1. Le compte @thepotatobunclub doit être en **Business** ou **Creator** (Paramètres Instagram > Type de compte).
2. Créer un jeton d'accès via Meta (Instagram Basic Display / Instagram API with Instagram Login) — je te donne les étapes détaillées écran par écran au moment voulu.
3. Me le transmettre : je te propose un formulaire sécurisé, la valeur est stockée en secret côté serveur, jamais dans le code ni visible dans le navigateur.

## Ce que je fais ensuite

- Stockage du jeton dans le secret `INSTAGRAM_ACCESS_TOKEN`.
- Test réel de l'appel API et vérification que les vraies photos apparaissent dans le carrousel.
- Rafraîchissement automatique du jeton (les jetons Instagram expirent tous les ~60 jours) via un point d'entrée serveur qui renouvelle le jeton avant expiration, pour que le flux ne coupe jamais.
- Repli propre : si l'API tombe ou que le jeton expire malgré tout, le carrousel revient automatiquement aux photos locales, sans page cassée.
- Cache court côté serveur pour éviter d'appeler Instagram à chaque visite.

## Détails techniques

- `src/lib/instagram.functions.ts` existe déjà : lecture de `/me/media` (id, caption, media_url, thumbnail_url, permalink), vidéos gérées via `thumbnail_url`, erreurs journalisées et repli en liste vide.
- Ajout : mise en cache de la réponse (~15 min) et une route serveur de refresh du long-lived token.
- `src/components/InstagramCarousel.tsx` : aucune modification visuelle, seulement la source des images qui devient réelle.
- Le jeton est lu uniquement dans le handler serveur, jamais exposé au client.

## Note

Si tu préfères ne pas passer par Meta, l'alternative est de garder des photos gérées à la main (je les remplace quand tu m'en envoies). Le flux automatique reste ajoutable plus tard sans changer le design.
