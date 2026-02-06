# Première étape : Faire un dépôt git
Il est primordiale de commencer un projet par l'initialisation

# Initialisation du Backend
`cd backend` : Pour acceder au répertoire backend.

`npm init -y` : Commande d'initialisation d'un projet Node.js.

# Installation des dépendances 
`npm install express cors helmet dotenv` : Pour installer Express.js, CORS, HELMET, Dotenv.

`npm install bcrypt jsonwebtoken` : Pour installer Bcrypt

`npm install multer` : Pour installer Multer

`npm install pg prisma` : Pour installer pg et Prisma

`npm install --save-dev typescript @types/node @types/express ts-node nodemon`

# Role de Chaque Dépendance installer 
1. `express` : Framework web pour Node.js, permet de créer l'API REST.

2. `cors` : Middleware pour gérer les requêtes cross-origin (autoriser les appels depuis le frontend).

3. `helmet` : Améliore la sécurité en définissant divers en-têtes HTTP (protection contre XSS, clickjacking, etc.).

4. `dotenv` : Charge les variables d'environnement depuis un fichier .env.

5. `bcrypt` : Bibliothèque de hachage sécurisé pour les mots de passe.

6. `jsonwebtoken` : Génère et vérifie les tokens JWT pour l'authentification.

7. `multer` : Middleware pour gérer l’upload de fichiers (scans de notes).

8. `pg` : Client PostgreSQL pour Node.js (connexion directe à la base de données).

9. `prisma` : ORM moderne pour la gestion de la base de données (migrations, schéma, requêtes).

# Rôle des Dépendances de développement ou encore devDependencies 
`typescript` : Ajoute le support de TypeScript au projet.

`@type/node` : Types TypeScript pour Node.js.

`@type/express` : Types TypeScript pour Express.

`ts-node` : Exécute directement les fichiers TypeScript sans compilation préalable.

`nodemon` : Redémarre automatiquement le serveur lors des modifications de code.
