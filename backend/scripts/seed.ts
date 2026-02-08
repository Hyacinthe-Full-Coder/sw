import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Créer ou récupérer un administrateur
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ukara.tg' },
    update: {},
    create: {
      email: 'admin@ukara.tg',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log(`Administrateur: ${admin.email}`);

  // Créer ou récupérer un département
  const department = await prisma.department.upsert({
    where: { name: 'Informatique' },
    update: {},
    create: {
      name: 'Informatique',
    },
  });

  // Créer ou récupérer une formation
  const formation = await prisma.formation.upsert({
    where: { name: 'Licence Informatique' },
    update: {},
    create: {
      name: 'Licence Informatique',
      departmentId: department.id,
    },
  });

  console.log(`Formation: ${formation.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
