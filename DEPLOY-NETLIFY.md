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

## 3. Brancher le domaine asm-taxis.fr (une fois) — config réelle

État actuel du DNS (relevé le 2026-06-06) : domaine géré chez OVH (DNS anycast.me),
site actuel sur l'IP OVH `46.105.204.100`, emails OVH actifs (MX + SPF).

Dans Netlify : **Domain management → Add a domain** → `asm-taxis.fr`.
Puis dans **OVH → Web Cloud → Noms de domaine → asm-taxis.fr → Zone DNS**, modifie :

| Type | Sous-domaine | Ancienne valeur | NOUVELLE valeur |
|---|---|---|---|
| A | @ (vide) | 46.105.204.100 | **75.2.60.5** (Netlify) |
| CNAME | www | 46.105.204.100 (A) → supprimer | **`<ton-site>.netlify.app.`** |

⚠️ **NE PAS TOUCHER** (sinon tes emails tombent) :
- MX : `mx1/mx2/mx3.mail.ovh.net`
- TXT SPF : `v=spf1 include:mx.ovh.com -all`

> Astuce : déploie et **teste l'URL `*.netlify.app` AVANT** de changer le DNS → bascule sans coupure.
> Le HTTPS (Let's Encrypt) est généré automatiquement par Netlify une fois le DNS propagé
> (quelques minutes à quelques heures). Active ensuite **Force HTTPS** dans Netlify.

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
