import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_very_long_and_secure';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key_different_from_jwt';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '7d';

export class JWTService {
  // Générer un token d'accès
  static generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Générer un token de rafraîchissement
  static generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
  }

  // Vérifier un token d'accès
  static verifyAccessToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  // Vérifier un token de rafraîchissement
  static verifyRefreshToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  // Rafraîchir les tokens
  static refreshTokens(refreshToken: string): { accessToken: string; refreshToken: string } | null {
    const payload = this.verifyRefreshToken(refreshToken);
    if (!payload) return null;

    const newAccessToken = this.generateAccessToken(payload);
    const newRefreshToken = this.generateRefreshToken(payload);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}