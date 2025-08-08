import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { prisma } from '../../../src/db/prisma';
import { TransactionService } from '../../../src/services/transaction';

let withdrawError: string | null = null;
let finalBalance: number | null = null;

Given(
	/^que no saque existe uma conta com ID (\d+) e saldo (\d+)$/,
	async (id: number, saldo: number) => {
		await prisma.account.upsert({
			where: { id },
			update: { balance: saldo },
			create: { id, name: `Conta ${id}`, balance: saldo },
		});
		withdrawError = null;
		finalBalance = null;
	}
);

When(
	/^no saque eu retiro (\d+) da conta (\d+)$/,
	async (valor: number, id: number) => {
		withdrawError = null;
		try {
			await TransactionService.withdraw(id, valor);
			const updated = await prisma.account.findUnique({ where: { id } });
			finalBalance = updated?.balance ?? null;
		} catch (err: any) {
			withdrawError = err.message;
		}
	}
);

Then(/^no saque deve ocorrer um erro "([^"]+)"$/, (expectedMessage: string) => {
	assert.ok(withdrawError, 'Esperava um erro, mas nenhum foi lançado no saque');
	assert.strictEqual(
		withdrawError,
		expectedMessage,
		`Esperava erro "${expectedMessage}", mas recebeu "${withdrawError}"`
	);
});

Then(
	/^no saque o saldo da conta (\d+) deve ser (\d+)$/,
	async (id: number, expectedBalance: number) => {
		const account = await prisma.account.findUnique({ where: { id } });
		assert.ok(account, `Conta ${id} não encontrada`);
		assert.strictEqual(
			account.balance,
			expectedBalance,
			`Esperava saldo ${expectedBalance}, mas encontrou ${account.balance}`
		);
	}
);
