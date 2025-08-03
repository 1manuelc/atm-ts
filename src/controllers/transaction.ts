import { TransactionService } from '../services/transaction';
import { questionAsync } from '../utils/question';

async function deposit() {
	const accountId = parseInt(await questionAsync('Informe o ID da conta: '));
	const value = parseFloat(await questionAsync('Informe o valor para depósito: '));
	TransactionService.deposit(accountId, value);
}

async function withdraw() {
	const accountId = parseInt(await questionAsync('Informe o ID da conta: '));
	const value = parseFloat(await questionAsync('Informe o valor para saque: '));
	TransactionService.withdraw(accountId, value);
}

async function transfer() {
	const originAccountId = parseInt(
		await questionAsync('Informe o ID da conta de origem: ')
	);
	const destinyAccountId = parseInt(
		await questionAsync('Informe o ID da conta de destino: ')
	);
	const value = parseFloat(
		await questionAsync('Informe o valor da transferência: ')
	);
	await TransactionService.transfer(originAccountId, destinyAccountId, value);
}

export const TransactionController = {
	deposit,
	withdraw,
	transfer,
};
