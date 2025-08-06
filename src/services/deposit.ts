import Logger from '../utils/logger';
import { prisma } from '../db/prisma';

async function deposit(accountId: number, amount: number) {
	try {
		if (!amount || amount <= 0) {
			throw new Error('Valor inválido para depósito');
		}

		const account = await prisma.account.findUnique({
			where: { id: accountId },
		});

		if (!account) {
			throw new Error('Conta não encontrada');
		}

		const updatedAccount = await prisma.account.update({
			where: { id: accountId },
			data: { balance: account.balance + amount },
		});

		Logger.success(
			`Depósito realizado com sucesso! Conta: ${updatedAccount.name} (ID: ${updatedAccount.id}), Novo saldo: R$ ${updatedAccount.balance.toFixed(2)}`
		);

		return updatedAccount;
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`ERRO: ${err.message} - Depósito não realizado`);
			throw err;
		}
	}
}

export const DepositService = {
	deposit,
};
