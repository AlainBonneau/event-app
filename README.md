# Event'Go 🎉

**Event'Go** est une plateforme permettant aux utilisateurs de créer, organiser et participer à des événements en toute simplicité. Ce projet est conçu avec une architecture **full-stack** incluant une **API Node.js avec Express** et une **interface utilisateur en React avec TypeScript**.

### ⚠️ Le site est encore en **bêta** et peut présenter plusieurs **bugs**. Si vous en trouvez, merci de me les signaler ! 😊

---

## 🚀 Fonctionnalités principales

### 👥 Gestion des utilisateurs

- Inscription et connexion sécurisées avec **JWT**.
- Rôles utilisateurs : **participant, organisateur, administrateur**.
- Profil utilisateur avec informations personnelles.

### 🎟️ Gestion des événements

- **Créer un événement** _(organisateur et admin uniquement)_.
- **Consulter la liste des événements disponibles**.
- **Voir les détails d'un événement** _(lieu, date, nombre de participants...)_.
- **S'inscrire / Se désinscrire d'un événement**.
- **Supprimer un événement** _(admin uniquement)_.

### 🔒 Sécurité et authentification

- **Middleware d'authentification et de gestion des rôles**.
- **Protection des routes sensibles** (ex: seule une personne autorisée peut supprimer un événement).
- **Stockage des tokens en `localStorage`**.

---

## 🛠️ Technologies utilisées

### 🔹 **Backend (API REST)**

- **Node.js** + **Express**
- **TypeScript**
- **Sequelize (ORM)** avec **PostgreSQL**
- **JWT (JSON Web Token)** pour l'authentification
- **Bcrypt** pour le hashage des mots de passe

### 🔹 **Frontend (Interface Utilisateur)**

- **React.js** + **TypeScript**
- **TailwindCSS** pour le design
- **Axios** pour les appels API
- **React Router** pour la navigation
- **Framer Motion** pour les animations

---

📌 Améliorations futures 🔥

- ✅ Filtrage et recherche d'événements
- ✅ Système de notifications par email
- ✅ Gestion des commentaires sur les événements
- ✅ Dashboard pour les administrateurs
- ✅ Ajout d'images aux événements
- ✅ Mode sombre et personnalisation UI

---
