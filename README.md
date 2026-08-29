# Site OMAC-Bénin — prêt à déployer

Site statique (HTML/CSS/JS pur, aucune dépendance de build) présentant
l'Observatoire du complexe Mono-Couffo-Ahémé (OMAC-Bénin).

## Structure

```
site/
├── index.html          → toute la page
├── assets/
│   ├── css/style.css   → design (couleurs, typographie, mise en page)
│   ├── js/main.js      → navigation mobile, animations au scroll, formulaire
│   └── img/            → photos de terrain, graphiques et infographies
└── README.md
```

## Déployer en 2 minutes

Choisissez une option (toutes gratuites) :

- **Netlify Drop** : allez sur https://app.netlify.com/drop et glissez-déposez
  le dossier `site`. Le site est en ligne immédiatement avec une URL fournie.
- **Vercel** : `vercel deploy` depuis ce dossier (nécessite `npm i -g vercel`).
- **GitHub Pages** : poussez ce dossier dans un dépôt GitHub, puis activez
  *Pages* dans Settings → Pages → Source = branche principale, dossier `/`.
- **Hébergement classique (OVH, o2switch, etc.)** : envoyez le contenu du
  dossier `site` par FTP dans le répertoire public (`www/` ou `public_html/`).

Aucune étape de build n'est nécessaire : ce sont des fichiers statiques.

## À personnaliser avant mise en ligne

1. **Formulaire de contact** (`index.html`, section `#contact`) : le
   formulaire fonctionne visuellement mais n'envoie encore rien nulle part.
   Deux solutions simples, sans backend à coder :
   - [Formspree](https://formspree.io) : créez un compte gratuit, remplacez
     l'attribut `id="contact-form"` par `action="https://formspree.io/f/VOTRE_ID"
     method="POST"` sur la balise `<form>`.
   - Ou remplacez le lien `mailto:contact@omac-benin.org` par votre adresse réelle.
2. **Adresse e-mail et réseaux sociaux** : section « Contact », bloc
   `.contact-meta` — remplacez l'e-mail et ajoutez vos liens Facebook/LinkedIn/YouTube.
3. **Nom de domaine** : une fois déployé sur Netlify/Vercel/GitHub Pages,
   vous pouvez y relier un nom de domaine personnalisé (ex. `omac-benin.org`)
   depuis les réglages de l'hébergeur.
4. **Favicon / logo** : le favicon actuel est une icône générée en SVG
   inline (voir `<link rel="icon">` dans `index.html`). Remplacez-le par un
   vrai logo si vous en avez un.

## Contenu

Tous les textes, chiffres, tableaux et photographies proviennent du document
Word fourni (campagnes de terrain 2025-2026 : hydrologie, sédimentologie,
biodiversité, plancton, peuplement halieutique). Les images ont été
compressées pour le web (JPEG qualité 78, largeur max 1600px) afin de
garder un temps de chargement raisonnable.

## Compatibilité

Site responsive (mobile / tablette / desktop), sans framework, testé pour
fonctionner sur tous les navigateurs modernes. Police via Google Fonts
(Fraunces, Work Sans, IBM Plex Mono) — nécessite une connexion internet pour
charger les polices ; en cas d'usage hors-ligne strict, elles peuvent être
téléchargées et servies localement dans `assets/fonts/`.
