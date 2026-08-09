# Section Menu — vignettes retournables

Refonte de la seule section Menu. Rien d'autre sur le site ne bouge.

## Ce qui change

1. **Suppression de la photo du menu** — l'image plein écran avec zoom disparaît (fichier image et lightbox retirés de la section).
2. **Les 6 vignettes de catégories restent** (Smash burgers, Chicken burgers, Sides, Drinks, Desserts, Merch), même style et même grille responsive qu'aujourd'hui.
3. **Au clic sur une vignette** : effet de retournement 3D combiné à un léger zoom, qui révèle le contenu texte de la catégorie (liste de plats : nom, description courte, prix).
4. **Navigation** : une fois une catégorie ouverte, des flèches gauche/droite permettent de passer à la catégorie précédente/suivante (boucle circulaire), avec le même effet de retournement. Un bouton fermer ramène à la grille de vignettes.
5. **Contenu** : chaque catégorie démarre avec quelques lignes d'exemple, structurées pour être remplies manuellement plus tard en modifiant une seule liste.

## Comportement

- Mobile : le panneau de catégorie occupe la largeur d'écran, flèches en bas, texte lisible sans zoom.
- Desktop : le panneau s'affiche à la place de la grille, flèches de part et d'autre du titre de catégorie.
- Clavier : flèches gauche/droite pour naviguer, Échap pour fermer.
- Animation courte (~450 ms), désactivée si l'utilisateur préfère les animations réduites.

## Notes techniques

- `src/components/MenuSection.tsx` : suppression de l'import `menu.jpg`, de l'état `zoomed` et du dialogue plein écran.
- Nouveau fichier `src/lib/menu-data.ts` : type `MenuCategory { id, title, icon, tagline, items: { name, description?, price? }[] }` — point unique d'édition du contenu.
- Retournement via CSS `transform-style: preserve-3d` + `rotateY` et `scale`, piloté par un état `activeIndex: number | null` (pas de librairie ajoutée).
- Grille et tokens de couleur existants conservés ; aucun changement dans les autres composants, styles globaux ou config.
