import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { JWTService } from '../utils/jwt';
import { RegisterInput, LoginInput, AuthResponse } from '../types';
import prisma from '../utils/db';

export class AuthController {
  // Inscription publique (étudiants seulement)
  static async register(req: Request, res: Response) {
    try {
      const { email, password, studentId, formationId }: RegisterInput = req.body;

      // Validation basique
      if (!email || !password || !studentId || !formationId) {
        return res.status(400).json({
          success: false,
          message: 'Tous les champs sont requis pour l\'inscription étudiant'
        });
      }

      // Vérifier que la formation existe
      const formation = await prisma.formation.findUnique({
        where: { id: formationId }
      });

      if (!formation) {
        return res.status(404).json({
          success: false,
          message: 'Formation non trouvée'
        });
      }

      // Vérifier que l'email n'existe pas déjà
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Un utilisateur avec cet email existe déjà'
        });
      }

      // Vérifier que le numéro étudiant n'existe pas déjà
      const existingStudent = await prisma.student.findUnique({
        where: { studentId }
      });

      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: 'Ce numéro étudiant est déjà utilisé'
        });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer l'utilisateur et le profil étudiant dans une transaction
      const result = await prisma.$transaction(async (tx) => {
        // Créer l'utilisateur
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            role: Role.STUDENT
          }
        });

        // Créer le profil étudiant
        const student = await tx.student.create({
          data: {
            studentId,
            userId: user.id,
            formationId
          }
        });

        return { user, student };
      });

      // Générer les tokens
      const payload = {
        userId: result.user.id,
        email: result.user.email,
        role: result.user.role
      };

      const accessToken = JWTService.generateAccessToken(payload);
      const refreshToken = JWTService.generateRefreshToken(payload);

      // Log de l'inscription
      await prisma.log.create({
        data: {
          action: 'REGISTER_STUDENT',
          userId: result.user.id,
          ipAddress: req.ip
        }
      });

      const response: AuthResponse = {
        success: true,
        message: 'Inscription étudiante réussie',
        token: accessToken,
        refreshToken,
        user: {
          id: result.user.id,
          email: result.user.email,
          role: result.user.role
        }
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'inscription'
      });
    }
  }

  // Connexion (tous les rôles)
  static async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginInput = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email et mot de passe requis'
        });
      }

      // Trouver l'utilisateur
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          student: true,
          professor: true,
          responsible: true
        }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Identifiants invalides'
        });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Identifiants invalides'
        });
      }

      // Générer les tokens
      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const accessToken = JWTService.generateAccessToken(payload);
      const refreshToken = JWTService.generateRefreshToken(payload);

      // Log de la connexion
      await prisma.log.create({
        data: {
          action: 'LOGIN',
          userId: user.id,
          ipAddress: req.ip
        }
      });

      const response: AuthResponse = {
        success: true,
        message: 'Connexion réussie',
        token: accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la connexion'
      });
    }
  }

  // Rafraîchir le token
  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token requis'
        });
      }

      const newTokens = JWTService.refreshTokens(refreshToken);

      if (!newTokens) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token invalide ou expiré'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Tokens rafraîchis',
        ...newTokens
      });
    } catch (error) {
      console.error('Erreur de rafraîchissement:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du rafraîchissement du token'
      });
    }
  }

  // Récupérer le profil utilisateur
  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Utilisateur non authentifié'
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          student: {
            select: {
              studentId: true,
              formation: {
                select: {
                  id: true,
                  name: true,
                  department: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          },
          professor: {
            select: {
              professorId: true
            }
          },
          responsible: {
            select: {
              formation: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Erreur de récupération du profil:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du profil'
      });
    }
  }
}