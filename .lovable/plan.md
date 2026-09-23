# Nouvelle section « Proudly Local » entre Menu et Instagram

## Objectif

Ajouter **entre la section Menu et la section Instagram** un interlude sans titre de section, qui raconte le travail en circuit court avec les partenaires locaux (Baker Street, Kura Kura, Santai), dans le style du reste du site.

## Design proposé

Un interlude typographique beige, plus calme que les autres sections, qui reprend les codes du Hero :

- **Fond** : beige légèrement plus soutenu que la page (token `secondary`/`sand` existant), pour marquer une pause entre le Menu (beige clair) et Instagram (beige clair). Pas de carte ni de bordure — juste de l'espace.
- **Titre** : « PROUDLY / LOCAL, / WHENEVER / WE CAN. » en Anton, empilé, collé au bord gauche, exactement comme les titres du Hero et des autres sections. Ce n'est pas un titre de section ajouté, c'est la première phrase du texte fourni.
- **Annotation manuscrite** : « kept close to home » en Permanent Marker, comme les touches manuscrites du Hero et de la section Order.
- **Discours** : le texte fourni, reformaté en paragraphes naturels (les retours à la ligne manuels type Instagram sont supprimés, la ponctuation est conservée), en Montserrat, dans une colonne lisible (max-w-md/lg).
- **Mise en avant des partenaires** : « Baker Street », « Kura Kura » et « Santai » en League Spartan semi-bold pour ressortir du corps de texte, sans en faire des liens (pas de pages partenaires à viser).
- **Layout desktop** : deux colonnes comme le Hero — titre à gauche collé au bord, discours à droite aligné en haut avec « PROUDLY ». **Mobile** : empilé, titre puis texte.
- **Animation** : même fondu discret à l'apparition que le Hero (respect de `prefers-reduced-motion`).

## Fichiers

1. **`src/components/LocalSection.tsx`** (nouveau) — la section complète, texte en dur (contenu purement présentationnel, pas besoin de config).
2. **`src/routes/index.tsx`** — insérer `<LocalSection />` entre `<MenuSection />` et `<InstagramCarousel />`.

## Hors périmètre

- Pas d'images ni de logos partenaires (aucun fichier fourni).
- Pas de lien sortant vers les partenaires.
- Le SEO (JSON-LD, head) n'est pas modifié.
