# Déploiement automatique — Netlify (git push → site en ligne)

Objectif : à chaque `git push`, Netlify reconstruit le site et le met en ligne **automatiquement**.
Plus jamais d'upload manuel ni de code OVH. OVH ne sert plus qu'à **héberger le nom de domaine** (un seul réglage DNS au départ).

## 1. Mettre le code sur le dépôt (une fois)
Le dépôt git doit avoir pour **racine ce dossier `asm-taxis-astro/`** (là où se trouvent `package.json` et `netlify.toml`).

```bash
cd asm-taxis-astro
git init
git add .
git commit -m "ASM Taxis — nouveau site Astro"
git branch -M main
git remote add origin <URL_DE_TON_DEPOT>   # ex. git@github.com:user/asm-taxis.git
git push -u origin main
```

## 2. Connecter Netlify au dépôt (une fois)
1. Crée un compte sur https://app.netlify.com (connexion avec GitHub/GitLab = plus simple).
2. **Add new site → Import an existing project** → choisis ton dépôt.
3. Netlify lit `netlify.toml` automatiquement :
   - Build command : `npm run build`
   - Publish directory : `dist`
4. **Deploy**. Le site est en ligne sur une URL `*.netlify.app` en ~1 min.

## 3. Brancher le domaine asm-taxis.fr (une fois)
Dans Netlify : **Site settings → Domain management → Add a custom domain** → `asm-taxis.fr`.
Netlify indique les enregistrements DNS à créer. Deux options côté OVH :

**Option A — garder le DNS chez OVH (le plus simple) :**
Dans l'espace OVH → **Domaines → asm-taxis.fr → Zone DNS**, mets :
- `A`  `@`  → `75.2.60.5` (IP de Netlify Load Balancer)
- `CNAME`  `www`  → `<ton-site>.netlify.app`

**Option B — déléguer le DNS à Netlify :** remplace les serveurs DNS (nameservers) OVH par ceux indiqués par Netlify.

> Le HTTPS (certificat SSL) est généré automatiquement par Netlify une fois le DNS propagé (quelques minutes à quelques heures).

## 4. Ensuite, au quotidien
```bash
# tu modifies le site, puis :
git add .
git commit -m "maj du site"
git push
```
→ Netlify détecte le push, rebuild, et met le site à jour tout seul. **Rien à faire sur OVH.**

## Notes
- Les en-têtes de sécurité (CSP, HSTS…) sont gérés par `netlify.toml`.
- Après mise en ligne, soumets `https://asm-taxis.fr/sitemap-index.xml` dans Google Search Console.
- Bascule en douceur : tu peux tester l'URL `*.netlify.app` AVANT de changer le DNS d'OVH.
