import express from 'express';
import dotenv from 'dotenv';
import prisma from './utils/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route de test de connexion BDD
app.get('/test-db', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ 
      message: 'Connexion à la base de données réussie',
      userCount 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erreur de connexion à la base de données',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

app.get('/', (req, res) => {
  res.send('API de gestion des notes - Université de Kara');
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});