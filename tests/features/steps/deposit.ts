import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import assert from 'assert';
import { AccountService } from '../../../src/services/account';
import { TransactionService } from '../../../src/services/transaction';
import { prisma } from '../../../src/db/prisma';
import { resetDatabase } from '../../utils/reset-db';

let createdAccount: any;
let lastError: string | undefined;
let queriedBalance: number | undefined;

Before(async () => {
	await resetDatabase();
	createdAccount = undefined;
	lastError = undefined;
	queriedBalance = undefined;
});

After(async () => {
	await prisma.$disconnect();
});

Given(/^uma conta com saldo de R\$ ([\d,]+)$/, async (balanceStr: string) => {
	const balance = parseFloat(balanceStr.replace(',', '.'));
	createdAccount = await AccountService.createAccount('Conta Teste', balance);
});

When(/^o cliente deposita R\$ ([\d,]+)$/, async (amountStr: string) => {
	const amount = parseFloat(amountStr.replace(',', '.'));
	try {
		await TransactionService.deposit(createdAccount.id, amount);
		queriedBalance = await AccountService.getBalance(createdAccount.id);
	} catch (err) {
		lastError = (err as Error).message;
	}
});

When(
	/^o cliente tenta depositar R\$ (-?[\d,]+)$/,
	async (amountStr: string) => {
		const amount = parseFloat(amountStr.replace(',', '.'));
		try {
			await TransactionService.deposit(createdAccount.id, amount);
		} catch (err) {
			lastError = (err as Error).message;
		}
	}
);

Then(/^o novo saldo deve ser R\$ ([\d,]+)$/, (expectedBalance: string) => {
	const expected = parseFloat(expectedBalance.replace(',', '.'));
	assert.strictEqual(queriedBalance, expected);
});

Then(
	'o depósito deve ser rejeitado com a mensagem {string}',
	(expectedMessage: string) => {
		assert.ok(lastError, 'Esperava um erro, mas nenhum foi lançado');
		assert.strictEqual(
			lastError,
			expectedMessage,
			`Esperava erro "${expectedMessage}", mas recebeu "${lastError}"`
		);
	}
);
