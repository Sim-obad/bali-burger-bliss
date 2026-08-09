# Remplissage du menu depuis les photos du menu physique

## Objectif
Recevoir les photos du menu imprimé du restaurant, en extraire le contenu textuel (noms, descriptions, prix) et mettre à jour les vignettes du site (Burgers, Sides, Drinks, Desserts) dans `src/lib/menu-data.ts`. Si le contenu extrait le justifie, ajuster la disposition du pop-up menu pour qu'il colle au format réel du menu.

## Étapes

1. **Réception des images**
   - Attendre que l'utilisateur envoie les photos de son menu (une ou plusieurs images).
   - Vérifier que les images sont lisibles (pas floues, bien cadrées, texte visible).

2. **Extraction du contenu**
   - Lire les images via un modèle de vision (AI Gateway) pour en extraire :
     - les noms des produits,
     - les descriptions / ingrédients,
     - les prix,
     - la répartition par catégorie (Burgers, Sides, Drinks, Desserts).
   - Identifier les options Single/Double pour les burgers et les add-ons/sauces si présents.

3. **Mise à jour du fichier menu**
   - Remplir `src/lib/menu-data.ts` avec les vraies données extraites.
   - Conserver la structure actuelle :
     - `Burgers` avec colonnes Single/Double + encart Add ons (bacon, jalapeño, cheese),
     - `Sides` + encart Extra sauces,
     - `Drinks`,
     - `Desserts`.
   - Remplacer les placeholders "—" par les vrais prix.

4. **Vérification**
   - Lancer le typecheck/build pour s'assurer que le fichier est valide.
   - Vérifier visuellement le rendu des vignettes et du pop-up menu.

## Ce dont j'ai besoin
- Les photos du menu physique (une image globale ou des images par catégorie).
- Confirmation que les prix affichés sur les photos sont à jour.
