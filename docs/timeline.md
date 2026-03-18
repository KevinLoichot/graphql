# Timeline — GraphQL Profile Page

> Rythme : **7h/jour minimum**
> Début : **16 mars 2026**

---

## Jour 1 — 16 mars (Setup + Auth)

| Statut | Durée | Tâche |
|--------|-------|-------|
| ✅     | 1h    | Mise en place du projet (structure HTML/CSS/JS, repo, .gitignore) |
| ✅     | 1.5h  | Page de login — UI (formulaire username/email + password) |
| ✅     | 2h    | Implémentation JWT : POST `/api/auth/signin`, encodage Basic base64 |
| ✅     | 1h    | Gestion des erreurs (credentials invalides → message approprié) |
| ✅     | 1h    | Redirection vers la page de profil après login réussi |
| ✅     | 0.5h  | Bouton / fonctionnalité de logout (suppression du JWT) |

**Objectif de fin de journée :** Login fonctionnel, JWT récupéré et stocké, logout opérationnel.

---

## Jour 2 — 17 mars (GraphQL + Sections profil)

| Statut | Durée | Tâche |
|--------|-------|-------|
| ✅     | 1h    | Mise en place du client GraphQL (fetch + Bearer token) |
| ✅     | 1h    | Requête normale : infos utilisateur (`user { id login }`) |
| ✅     | 1h    | Requête imbriquée (nested) : ex. `result { id user { id login } }` |
| ✅     | 1h    | Requête avec arguments : ex. `object(where: { id: { _eq: ... } })` |
| ✅     | 2h    | Page profil — layout des 3 sections d'info (XP, audits, grades) |
| ✅     | 1h    | Branchement des données GraphQL sur les sections |

**Objectif de fin de journée :** Profil affiché avec 3 sections remplies de vraies données. Les 3 types de requêtes GraphQL couverts.

---

## Jour 3 — 18 mars (Graphiques SVG)

| Statut | Durée | Tâche |
|--------|-------|-------|
| ✅     | 0.5h  | Choix et planification des 2 graphiques (ex : XP over time + XP par projet) |
| ✅     | 2.5h  | Graphique 1 : XP gagné sur une période (courbe/aire en SVG) |
| ✅     | 2.5h  | Graphique 2 : XP par projet ou ratio audit (barres en SVG) |
| ✅     | 1.5h  | Intégration des graphiques dans la page profil, responsivité basique |

**Objectif de fin de journée :** 2 graphiques SVG fonctionnels et affichant des données réelles.

---

## Jour 4 — 19 mars (UI/UX + Hébergement)

| Statut | Durée | Tâche |
|--------|-------|-------|
| ✅     | 2h    | Amélioration UI/UX (typographie, couleurs, mise en page, responsive) |
| ⬜     | 1h    | Tests de toutes les questions d'audit (fonctionnel + général) |
| ⬜     | 0.5h  | Correction des bugs identifiés lors des tests |
| ✅     | 2h    | Hébergement (GitHub Pages ou Netlify) + configuration du domaine |
| ✅     | 1.5h  | Tests finaux sur le domaine hébergé (accès, login, profil, graphiques) |

**Objectif de fin de journée :** Site en ligne, toutes les questions d'audit validées.

---

## Jour 5 — 20 mars (Bonus — optionnel)

| Statut | Durée | Tâche |
|--------|-------|-------|
| ⬜     | 1.5h  | Section(s) supplémentaire(s) au-delà des 3 obligatoires |
| ⬜     | 2h    | Graphique(s) supplémentaire(s) (ex : ratio PASS/FAIL, tentatives par exercice) |
| ⬜     | 2h    | Création et intégration d'un GraphiQL maison |
| ⬜     | 1.5h  | Finitions UI, animations SVG, polish général |

**Objectif de fin de journée :** Bonus cochés, UI soignée.

---

## Récapitulatif

| Jour | Date     | Focus                     | Livrable clé                          |
|------|----------|---------------------------|---------------------------------------|
| 1    | 16 mars  | Setup + Auth              | Login/logout JWT fonctionnel          |
| 2    | 17 mars  | GraphQL + Profil          | 3 sections profil avec vraies données |
| 3    | 18 mars  | Graphiques SVG            | 2 graphiques SVG opérationnels        |
| 4    | 19 mars  | UI/UX + Hébergement       | Site en ligne + audit validé          |
| 5    | 20 mars  | Bonus                     | Points bonus cochés                   |

---

## Checklist audit

### Fonctionnel
- [x] Login invalide → message d'erreur approprié
- [x] Login valide → accès au profil
- [x] Profil avec 3 sections distinctes (données vérifiables via GraphiQL)
- [x] Section statistiques avec au moins 2 graphiques SVG
- [x] Graphiques affichant des données exactes
- [x] Profil accessible depuis le domaine hébergé
- [x] Logout fonctionnel

### Général
- [x] Requête normale utilisée
- [x] Requête imbriquée (nested) utilisée
- [x] Requête avec arguments utilisée

### Bonus
- [ ] Sections d'info supplémentaires
- [ ] Graphiques supplémentaires (> 2)
- [ ] GraphiQL maison intégré
- [ ] UI respectant les bonnes pratiques
