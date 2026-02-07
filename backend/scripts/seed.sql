-- ============================================
-- DONNÉES DE TEST - Université de Kara
-- Mot de passe par défaut : "Password123!" (hashé avec bcrypt)
-- ============================================

-- Désactiver temporairement les contraintes
SET session_replication_role = 'replica';

-- ==================== DÉPARTEMENTS ====================
INSERT INTO "Department" (id, name) VALUES
('dep001', 'Informatique'),
('dep002', 'Mathématiques'),
('dep003', 'Physique-Chimie'),
('dep004', 'Sciences Économiques'),
('dep005', 'Droit');

-- ==================== FORMATIONS ====================
INSERT INTO "Formation" (id, name, "departmentId") VALUES
('form001', 'Licence en Informatique', 'dep001'),
('form002', 'Master en Cybersécurité', 'dep001'),
('form003', 'Licence en Mathématiques Appliquées', 'dep002'),
('form004', 'Licence en Physique', 'dep003'),
('form005', 'Master en Économie', 'dep004'),
('form006', 'Licence en Droit Privé', 'dep005');

-- ==================== UTILISATEURS ====================
-- Mot de passe hashé : "Password123!" -> $2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa

-- Administrateur système
INSERT INTO "User" (id, email, password, role) VALUES
('admin001', 'admin@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'ADMIN');

-- Responsables de Formation (RF)
INSERT INTO "User" (id, email, password, role) VALUES
('rf001', 'rf.informatique@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'RESPONSIBLE'),
('rf002', 'rf.mathematiques@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'RESPONSIBLE'),
('rf003', 'rf.economie@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'RESPONSIBLE');

-- Professeurs
INSERT INTO "User" (id, email, password, role) VALUES
('prof001', 'kossi.awa@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'PROFESSOR'),
('prof002', 'yao.komi@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'PROFESSOR'),
('prof003', 'ama.sena@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'PROFESSOR'),
('prof004', 'koffi.essi@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'PROFESSOR');

-- Étudiants
INSERT INTO "User" (id, email, password, role) VALUES
('etu001', 'etudiant1@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'STUDENT'),
('etu002', 'etudiant2@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'STUDENT'),
('etu003', 'etudiant3@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'STUDENT'),
('etu004', 'etudiant4@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'STUDENT'),
('etu005', 'etudiant5@ukara.tg', '$2b$10$N9qo8uLOickgx2ZMRZoMye.IUohrrMWd0fYxVEEHX5pGZ1ZlP.QQa', 'STUDENT');

-- ==================== RESSOURCES ====================

-- Responsables liés aux formations
INSERT INTO "Responsible" (id, "userId", "formationId") VALUES
('resp001', 'rf001', 'form001'),  -- RF Informatique
('resp002', 'rf002', 'form003'),  -- RF Mathématiques
('resp003', 'rf003', 'form005');  -- RF Économie

-- Professeurs
INSERT INTO "Professor" (id, "professorId", "userId") VALUES
('prof001', 'PROF-2024-001', 'prof001'),
('prof002', 'PROF-2024-002', 'prof002'),
('prof003', 'PROF-2024-003', 'prof003'),
('prof004', 'PROF-2024-004', 'prof004');

-- Étudiants
INSERT INTO "Student" (id, "studentId", "userId", "formationId") VALUES
('etu001', 'ETU-2024-001', 'etu001', 'form001'),
('etu002', 'ETU-2024-002', 'etu002', 'form001'),
('etu003', 'ETU-2024-003', 'etu003', 'form003'),
('etu004', 'ETU-2024-004', 'etu004', 'form005'),
('etu005', 'ETU-2024-005', 'etu005', 'form005');

-- ==================== COURS ====================
INSERT INTO "Course" (id, name, "formationId", "professorId") VALUES
-- Informatique (form001)
('course001', 'Algorithmique avancée', 'form001', 'prof001'),
('course002', 'Base de données', 'form001', 'prof002'),
('course003', 'Développement Web', 'form001', 'prof001'),
-- Mathématiques (form003)
('course004', 'Analyse numérique', 'form003', 'prof003'),
('course005', 'Statistiques', 'form003', 'prof004'),
-- Économie (form005)
('course006', 'Microéconomie', 'form005', 'prof002'),
('course007', 'Macroéconomie', 'form005', 'prof003');

-- ==================== NOTES ====================
INSERT INTO "Grade" (id, value, "studentId", "courseId", status) VALUES
-- Étudiant 1 (Informatique)
('grade001', 15.5, 'etu001', 'course001', 'VALIDATED'),
('grade002', 12.0, 'etu001', 'course002', 'SUBMITTED'),
('grade003', 18.0, 'etu001', 'course003', 'DRAFT'),
-- Étudiant 2 (Informatique)
('grade004', 14.0, 'etu002', 'course001', 'VALIDATED'),
('grade005', 16.5, 'etu002', 'course002', 'VALIDATED'),
-- Étudiant 3 (Mathématiques)
('grade006', 11.0, 'etu003', 'course004', 'VALIDATED'),
('grade007', 13.5, 'etu003', 'course005', 'SUBMITTED'),
-- Étudiant 4 (Économie)
('grade008', 17.0, 'etu004', 'course006', 'VALIDATED'),
('grade009', 9.5, 'etu004', 'course007', 'DRAFT'),
-- Étudiant 5 (Économie)
('grade010', 14.5, 'etu005', 'course006', 'SUBMITTED'),
('grade011', 12.0, 'etu005', 'course007', 'VALIDATED');

-- ==================== SCANS (fichiers fictifs) ====================
INSERT INTO "Scan" (id, filename, path, "gradeId") VALUES
('scan001', 'copie_etu001_course001.pdf', '/uploads/2024/01/copie_abc123.pdf', 'grade001'),
('scan002', 'copie_etu001_course002.jpg', '/uploads/2024/01/copie_def456.jpg', 'grade002'),
('scan003', 'copie_etu002_course001.pdf', '/uploads/2024/01/copie_ghi789.pdf', 'grade004'),
('scan004', 'copie_etu002_course002.png', '/uploads/2024/01/copie_jkl012.png', 'grade005'),
('scan005', 'copie_etu003_course004.pdf', '/uploads/2024/01/copie_mno345.pdf', 'grade006');

-- ==================== LOGS D'ACTIVITÉ ====================
INSERT INTO "Log" (id, action, "userId", "ipAddress", details) VALUES
('log001', 'CONNEXION', 'admin001', '192.168.1.1', 'Administrateur connecté'),
('log002', 'CREATION_FORMATION', 'admin001', '192.168.1.1', 'Formation Informatique créée'),
('log003', 'SAISIE_NOTE', 'prof001', '192.168.1.10', 'Note 15.5 saisie pour ETU-2024-001'),
('log004', 'VALIDATION_NOTE', 'rf001', '192.168.1.20', 'Note grade001 validée'),
('log005', 'INSCRIPTION', 'etu001', '192.168.1.30', 'Étudiant inscrit en Licence Informatique'),
('log006', 'CONSULTATION_NOTES', 'etu001', '192.168.1.30', 'Consultation des notes');

-- Réactiver les contraintes
SET session_replication_role = 'origin';

-- ==================== VÉRIFICATION ====================
SELECT '=== DONNÉES INSÉRÉES ===' as verification;
SELECT 'Départements' as table, COUNT(*) as count FROM "Department"
UNION ALL
SELECT 'Formations', COUNT(*) FROM "Formation"
UNION ALL
SELECT 'Utilisateurs', COUNT(*) FROM "User"
UNION ALL
SELECT 'Étudiants', COUNT(*) FROM "Student"
UNION ALL
SELECT 'Professeurs', COUNT(*) FROM "Professor"
UNION ALL
SELECT 'Responsables', COUNT(*) FROM "Responsible"
UNION ALL
SELECT 'Cours', COUNT(*) FROM "Course"
UNION ALL
SELECT 'Notes', COUNT(*) FROM "Grade"
UNION ALL
SELECT 'Scans', COUNT(*) FROM "Scan"
UNION ALL
SELECT 'Logs', COUNT(*) FROM "Log";

-- Afficher les identifiants de test
SELECT '=== IDENTIFIANTS DE TEST ===' as info;
SELECT 'Admin' as role, 'admin@ukara.tg' as email, 'Password123!' as password
UNION ALL
SELECT 'RF Informatique', 'rf.informatique@ukara.tg', 'Password123!'
UNION ALL
SELECT 'Professeur', 'kossi.awa@ukara.tg', 'Password123!'
UNION ALL
SELECT 'Étudiant', 'etudiant1@ukara.tg', 'Password123!';