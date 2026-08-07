# Obtenir le token Instagram pour @thepotatobunclub

## Pré-requis

- Le compte Instagram @thepotatobunclub doit être en mode **Professionnel** (Business ou Creator).
- Il doit être **connecté à une page Facebook**.

## Étapes exactes

1. Convertir le compte Instagram en compte professionnel
   - Ouvrir Instagram → Profil → Menu (3 lignes) → Paramètres → Type de compte → Compte professionnel.
   - Choisir **Business** ou **Creator**.

2. Créer une app Facebook Developers
   - Aller sur https://developers.facebook.com/apps/
   - Cliquer **Create App** → choisir **Business** → nommer l'app « The Potato Bun Club Site ».

3. Ajouter le produit Instagram
   - Dans le tableau de bord de l'app : **Add Product** → **Instagram** → **Set Up**.

4. Connecter le compte Instagram
   - Aller dans **Instagram** → **API setup with Instagram login**.
   - Cliquer **Add or Remove Instagram Accounts**.
   - Se connecter avec @thepotatobunclub et autoriser l'app.

5. Générer le token
   - Section **Generate access tokens**.
   - Sélectionner le compte @thepotatobunclub.
   - Cocher les permissions : **instagram_basic** (obligatoire) et **instagram_graph_user_profile** si proposé.
   - Cliquer **Generate token**.
   - Copier la chaîne affichée (elle ressemble à `IGAA...` ou `EAAG...`).

6. Me transmettre le token
   - Je fournirai un formulaire sécurisé pour le stocker en secret.

## Ce que je ferai ensuite

- Stocker le jeton dans `INSTAGRAM_ACCESS_TOKEN`.
- Tester l'appel API pour vérifier que les posts s'affichent.
- Configurer le renouvellement automatique tous les ~60 jours via un endpoint serveur sécurisé.

## Si tu bloques

Si l'une des étapes ne fonctionne pas, dis-moi à quel numéro tu es bloqué et je te guide.
