import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import assert from 'assert';
import { AccountService } from '../../../src/services/account';
import { prisma } from '../../../src/db/prisma';
import { resetDatabase } from '../../utils/reset-db';

let createdAccount: any;
let lastError: string | undefined;
let queriedBalance: number | undefined;

// Limpa tabela antes de cada cenário
Before(async () => {
	await resetDatabase();
	createdAccount = undefined;
	lastError = undefined;
	queriedBalance = undefined;
});

After(async () => {
	await prisma.$disconnect();
});

When(
	'o usuário cria uma conta com nome {string} e saldo {string}',
	async (name: string, balanceStr: string) => {
		const balance = parseFloat(balanceStr);
		try {
			createdAccount = await AccountService.createAccount(name, balance);
		} catch (err) {
			lastError = (err as Error).message;
		}
	}
);

Then('a conta deve ser criada com sucesso', () => {
	assert.ok(createdAccount);
	assert.ok(createdAccount.id);
});

Then(
	'o saldo inicial da conta deve ser {string}',
	(expectedBalance: string) => {
		assert.strictEqual(createdAccount.balance, parseFloat(expectedBalance));
	}
);

Given(
	'uma conta existente com nome {string} e saldo {string}',
	async (name: string, balanceStr: string) => {
		const balance = parseFloat(balanceStr);
		createdAccount = await AccountService.createAccount(name, balance);
	}
);

When('o usuário consulta o saldo da conta', async () => {
	try {
		queriedBalance = await AccountService.getBalance(createdAccount.id);
	} catch (err) {
		lastError = (err as Error).message;
	}
});

Then('o sistema deve retornar o saldo {string}', (expected: string) => {
	assert.strictEqual(queriedBalance, parseFloat(expected));
});

When('o usuário atualiza o nome para {string}', async (newName: string) => {
	try {
		createdAccount = await AccountService.updateAccountInfo(createdAccount.id, {
			id: createdAccount.id,
			name: newName,
		});
	} catch (err) {
		lastError = (err as Error).message;
	}
});

Then(
	'a conta deve ter o nome atualizado para {string}',
	(expectedName: string) => {
		assert.strictEqual(createdAccount.name, expectedName);
	}
);

When('o usuário exclui a conta com o nome {string}', async (name: string) => {
	try {
		await AccountService.deleteAccount(createdAccount.id, name);
	} catch (err) {
		lastError = (err as Error).message;
	}
});

Then('a conta deve ser excluída com sucesso', async () => {
	const account = await prisma.account.findUnique({
		where: { id: createdAccount.id },
	});
	assert.strictEqual(account, null);
});

When(
	'o usuário tenta excluir a conta com o nome {string}',
	async (wrongName: string) => {
		try {
			await AccountService.deleteAccount(createdAccount.id, wrongName);
		} catch (err) {
			lastError = (err as Error).message;
		}
	}
);

Then('o sistema deve exibir um erro de confirmação', () => {
	assert.ok(lastError, 'Esperava um erro, mas nenhum foi lançado');
	assert.strictEqual(
		lastError,
		'Nome de confirmação incorreto',
		`Esperava erro "Nome de confirmação incorreto", mas recebeu "${lastError}"`
	);
});
