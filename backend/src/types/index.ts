import { Role, User } from '@prisma/client';

// Types pour les requêtes d'authentification
export interface RegisterInput {
  email: string;
  password: string;
  studentId?: string; // Pour les étudiants seulement
  formationId?: string; // Pour les étudiants seulement
  professorId?: string; // Pour les professeurs seulement
  formationIdForResponsible?: string; // Pour les responsables seulement
}

export interface LoginInput {
  email: string;
  password: string;
}

// Types pour les tokens JWT
export interface JWTPayload {
  userId: string;
  email: string;
  role: Role;
}

// Types pour les réponses
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

// Extension de l'interface Request d'Express
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}