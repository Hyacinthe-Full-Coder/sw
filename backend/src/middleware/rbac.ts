import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const checkRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Vérifier que l'utilisateur est authentifié
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Utilisateur non authentifié'
        });
      }

      // Vérifier que le rôle de l'utilisateur est autorisé
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Accès interdit. Rôle requis: ${allowedRoles.join(', ')}`
        });
      }

      next();
    } catch (error) {
      console.error('Erreur RBAC:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  };
};

// Middlewares spécifiques par rôle (pour plus de clarté dans les routes)
export const requireAdmin = checkRole([Role.ADMIN]);
export const requireResponsible = checkRole([Role.RESPONSIBLE]);
export const requireProfessor = checkRole([Role.PROFESSOR]);
export const requireStudent = checkRole([Role.STUDENT]);
export const requireAdminOrResponsible = checkRole([Role.ADMIN, Role.RESPONSIBLE]);
export const requireAdminOrProfessor = checkRole([Role.ADMIN, Role.PROFESSOR]);