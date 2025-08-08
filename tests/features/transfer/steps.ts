import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { prisma } from '../../../src/db/prisma';
import { TransactionService } from '../../../src/services/transaction';
import { AccountService } from '../../../src/services/account';

let capturedError: string | null = null;

Given(
	/^que na transferencia existem duas contas: ID (\d+) com saldo (\d+) e ID (\d+) com saldo (\d+)$/,
	async (id1: number, saldo1: number, id2: number, saldo2: number) => {
		await prisma.account.upsert({
			where: { id: id1 },
			update: { balance: saldo1 },
			create: { id: id1, name: `Conta ${id1}`, balance: saldo1 },
		});

		await prisma.account.upsert({
			where: { id: id2 },
			update: { balance: saldo2 },
			create: { id: id2, name: `Conta ${id2}`, balance: saldo2 },
		});
	}
);

Given(
	/^que na transferencia existe uma conta com ID (\d+) e saldo (\d+)$/,
	async (id: number, saldo: number) => {
		await prisma.account.upsert({
			where: { id },
			update: { balance: saldo },
			create: { id, name: `Conta ${id}`, balance: saldo },
		});
	}
);

When(
	/^eu transfiro (\d+) da conta (\d+) para a conta (\d+)$/,
	async (valor, de, para) => {
		capturedError = null;
		try {
			await TransactionService.transfer(
				parseInt(de),
				parseInt(para),
				parseInt(valor)
			);
		} catch (err: any) {
			capturedError = err.message;
		}
	}
);

Then(
	/^na transferencia o saldo da conta (\d+) deve ser (\d+)$/,
	async (id: number, esperado: number) => {
		const saldo = await AccountService.getBalance(id);
		assert.strictEqual(saldo, esperado);
	}
);

Then(/^na transferencia deve ocorrer um erro "(.*)"$/, async (mensagem: string) => {
	assert.ok(capturedError, 'Esperava um erro, mas nenhum foi lançado');
	assert.strictEqual(
		capturedError,
		mensagem,
		`Esperava erro "${mensagem}", mas recebeu "${capturedError}"`
	);
});
