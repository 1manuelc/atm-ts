import Logger from '../utils/logger';
import { prisma } from '../db/prisma';

async function deposit(accountId: number, amount: number) {
	try {
		if (amount <= 0) {
			Logger.warning('Valor de depósito inválido.');
			throw new Error('Valor de depósito inválido.');
		}

		const updated = await prisma.account.update({
			where: { id: accountId },
			data: { balance: { increment: amount } },
		});

		Logger.success(
			`Depósito de R$ ${amount.toFixed(
				2
			)} realizado com sucesso! Novo saldo: R$ ${updated.balance.toFixed(2)}`
		);
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(
				`ERRO: ${err.message} - Não foi possível realizar o depósito`
			);
		}
		throw err;
	}
}

async function withdraw(accountId: number, amount: number) {
	try {
		if (amount <= 0) {
			Logger.warning('Valor de saque inválido.');
			throw new Error('Valor de saque inválido.');
		}

		const account = await prisma.account.findUnique({
			where: { id: accountId },
		});
		if (!account) throw new Error('Conta não encontrada');
		if (account.balance < amount)
			throw new Error('Saldo insuficiente para saque');

		const updated = await prisma.account.update({
			where: { id: accountId },
			data: { balance: { decrement: amount } },
		});

		Logger.success(
			`Saque de R$ ${amount.toFixed(
				2
			)} realizado! Novo saldo: R$ ${updated.balance.toFixed(2)}`
		);
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`ERRO: ${err.message} - Não foi possível realizar o saque`);
		}
		throw err;
	}
}

async function transfer(fromId: number, toId: number, amount: number) {
	try {
		if (amount <= 0) {
			Logger.warning('Valor de transferência inválido.');
			return;
		}

		await prisma.$transaction(async (tx) => {
			const sender = await tx.account.findUnique({ where: { id: fromId } });
			const receiver = await tx.account.findUnique({ where: { id: toId } });

			if (!sender || !receiver)
				throw new Error('Conta de origem ou destino não encontrada');
			if (sender.balance < amount)
				throw new Error('Saldo insuficiente para transferência');

			await tx.account.update({
				where: { id: fromId },
				data: { balance: { decrement: amount } },
			});

			await tx.account.update({
				where: { id: toId },
				data: { balance: { increment: amount } },
			});

			await tx.transaction.create({
				data: {
					amount,
					fromId,
					toId,
				},
			});
		});

		Logger.success(
			`Transferência de R$ ${amount.toFixed(
				2
			)} realizada de conta ${fromId} para conta ${toId}`
		);
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(
				`ERRO: ${err.message} - Não foi possível realizar a transferência`
			);
		}
		throw err;
	}
}

export const TransactionService = {
	deposit,
	withdraw,
	transfer,
};
