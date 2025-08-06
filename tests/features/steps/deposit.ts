import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import assert from 'assert';
import { AccountService } from '../../../src/services/account';
import { DepositService } from '../../../src/services/deposit';
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

Given(
	'uma conta existente com nome {string} e saldo {string}',
	async (name: string, balanceStr: string) => {
		const balance = parseFloat(balanceStr);
		createdAccount = await AccountService.createAccount(name, balance);
	}
);

When(
	'o usuário deposita {string} na conta',
	async (amountStr: string) => {
		const amount = parseFloat(amountStr);
		try {
			await DepositService.deposit(createdAccount.id, amount);
			queriedBalance = await AccountService.getBalance(createdAccount.id);
		} catch (err) {
			lastError = (err as Error).message;
		}
	}
);

Then(
	'o saldo da conta deve ser {string}',
	(expectedBalance: string) => {
		assert.strictEqual(queriedBalance, parseFloat(expectedBalance));
	}
);

When(
	'o usuário tenta depositar {string} na conta',
	async (amountStr: string) => {
		const amount = parseFloat(amountStr);
		try {
			await DepositService.deposit(createdAccount.id, amount);
		} catch (err) {
			lastError = (err as Error).message;
		}
	}
);

Then(
	'o sistema deve exibir a mensagem de erro {string}',
	(expectedMessage: string) => {
		assert.ok(lastError, 'Esperava um erro, mas nenhum foi lançado');
		assert.strictEqual(
			lastError,
			expectedMessage,
			`Esperava erro "${expectedMessage}", mas recebeu "${lastError}"`
		);
	}
);
