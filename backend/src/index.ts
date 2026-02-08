import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import prisma from './utils/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

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

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur globale:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Démarrer le serveur
const server = app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`📝 API disponible à http://localhost:${PORT}`);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('SIGTERM reçu. Arrêt propre du serveur...');
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Serveur arrêté. Connexion BDD fermée.');
    process.exit(0);
  });
});