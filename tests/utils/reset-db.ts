import { prisma } from '../../src/db/prisma';

export const resetDatabase = async () => {
	await prisma.transaction.deleteMany();
	await prisma.account.deleteMany();
};
