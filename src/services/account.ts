import Logger from '../utils/logger';
import { prisma } from '../db/prisma';
import { Account } from '@prisma/client';

async function createAccount(name: string, balance: number) {
	try {
		if (!balance || balance < 0) {
			Logger.warning('Saldo inválido. Tente novamente.');
			return;
		}

		const newAccount = await prisma.account.create({
			data: { name, balance },
		});

		Logger.success(
			`Conta criada com sucesso! ID: ${newAccount.id}, Titular: ${
				newAccount.name
			}, Saldo: R$ ${newAccount.balance.toFixed(2)}`
		);

		return newAccount;
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`ERRO: ${err.message} - Conta não foi criada`);
		}
	}
}

async function getBalance(accountId: number) {
	try {
		const account = await prisma.account.findUnique({
			where: { id: accountId },
		});
		if (!account) throw new Error('Conta não encontrada');

		Logger.info(
			`Saldo atual da conta ${account.name} (ID: ${
				account.id
			}): R$ ${account.balance.toFixed(2)}`
		);

		return account.balance;
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`ERRO: ${err.message} - Não foi possível obter o saldo`);
		}
		throw err;
	}
}

async function updateAccountInfo(id: number, data: Omit<Account, 'balance'>) {
	try {
		const account = await prisma.account.findUnique({
			where: { id },
		});

		if (!account) {
			throw new Error(`Conta com o id ${id} não encontrada`);
		}

		const updated = await prisma.account.update({
			where: { id },
			data,
		});
		Logger.success(`Conta atualizada: ${updated.name} (ID: ${updated.id})`);
		return updated;
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`ERRO: ${err.message} - Falha na atualização`);
		}
		throw err;
	}
}

async function deleteAccount(id: number, accountName: string) {
	try {
		const account = await prisma.account.findUnique({
			where: { id },
		});

		if (!account) {
			throw new Error('Conta não encontrada');
		}

		if (account.name !== accountName) {
			throw new Error('Nome de confirmação incorreto');
		}

		await prisma.account.delete({
			where: { id },
		});
		Logger.success(`Conta ID ${id} excluída com sucesso.`);
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`ERRO: ${err.message} - Não foi possível excluir`);
		}
		throw err;
	}
}

export const AccountService = {
	createAccount,
	getBalance,
	updateAccountInfo,
	deleteAccount,
};
