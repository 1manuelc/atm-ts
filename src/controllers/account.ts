import { AccountService } from '../services/account';
import { questionAsync } from '../utils/question';

async function createAccount() {
	const name = await questionAsync('Informe o nome do titular da conta: ');
	const balance = parseFloat(await questionAsync('Informe o saldo inicial: '));
	AccountService.createAccount(name, balance);
}

async function updateAccount() {
	const id = parseInt(await questionAsync('Informe o número da conta: '));
	const name = await questionAsync('Informe o novo nome do titular da conta: ');
	AccountService.updateAccountInfo(id, { id, name });
}

async function deleteAccount() {
	const id = parseInt(await questionAsync('Informe o número da conta: '));
	const name = await questionAsync(
		'Você realmente deseja excluir a conta?\nInforme o exato nome do titular para confirmar: '
	);
	AccountService.deleteAccount(id, name);
}

async function showBalance() {
	const accountId = parseInt(await questionAsync('Informe o ID da conta: '));
	AccountService.getBalance(accountId);
}

export const AccountController = {
	createAccount,
	updateAccount,
	deleteAccount,
	showBalance,
};
