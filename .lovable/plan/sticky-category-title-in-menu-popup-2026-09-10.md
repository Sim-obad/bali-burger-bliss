# Sticky category title in menu popup

Amélioration de la seule section `Menu` : quand le contenu d'une catégorie dépasse la hauteur du popup et nécessite un scroll, le nom de la catégorie (icône + titre + bouton fermer) reste fixé en haut du panneau.

## Ce qui change

1. **En-tête sticky** dans `src/components/MenuSection.tsx` :
   - L'en-tête du popup (icône, titre, bouton fermer) est positionné en `sticky top-0`.
   - Il reste visible au-dessus de la liste d'items pendant le défilement.

2. **Fond et séparation visuelle** :
   - L'en-tête reprend le fond `bg-sand` pour masquer proprement le contenu qui défile en dessous.
   - Une bordure basse (`border-b border-charcoal/15`) marque la séparation avec la liste.
   - Un léger `z-index` est ajouté pour garantir le recouvrement.

3. **Comportements conservés** :
   - Animation d'ouverture/fermeture et retournement 3D inchangées.
   - Navigation flèches gauche/droite et clavier (Échap, flèches) inchangées.
   - Responsive mobile/desktop inchangé.

## Notes techniques

- Aucun nouveau fichier.
- Aucune modification de `src/lib/menu-data.ts`.
- Seul `src/components/MenuSection.tsx` est touché : réorganisation du markup interne du popup pour isoler l'en-tête sticky du contenu scrollable.
