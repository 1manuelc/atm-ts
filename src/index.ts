import { PrismaClient } from '@prisma/client';
import { endReadline, questionAsync } from './utils/question';
import chalk from 'chalk';
import { AccountController } from './controllers/account';
import { TransactionController } from './controllers/transaction';
import { prisma } from './db/prisma';

async function handleEndSession() {
	console.log(chalk.bgGray('Obrigado por usar o caixa eletrônico!'));
	endReadline();
	await prisma.$disconnect();
	process.exit(0);
}

async function handleClearTerminal() {
	console.clear();
}

async function showMenu() {
	console.log(chalk.bgBlue('\n=== Caixa Eletrônico ==='));
	console.log('1. Consultar saldo');
	console.log('2. Sacar');
	console.log('3. Transferir');
	console.log('4. Depositar');
	console.log('5. Criar conta');
	console.log('6. Editar conta');
	console.log('7. Deletar conta');
	console.log('8. Limpar terminal');
	console.log('9. Sair');

	const option = await questionAsync('Escolha uma opção: ');
	switch (option) {
		case '1':
			await AccountController.showBalance();
			break;
		case '2':
			await TransactionController.withdraw();
			break;
		case '3':
			await TransactionController.transfer();
			break;
		case '4':
			await TransactionController.deposit();
			break;
		case '5':
			await AccountController.createAccount();
			break;
		case '6':
			await AccountController.updateAccount();
			break;
		case '7':
			await AccountController.deleteAccount();
			break;
		case '8':
			handleClearTerminal();
			break;
		case '9':
			handleEndSession();
			break;
		default:
			console.log(chalk.bgGray('Opção inválida. Digite novamente'));
			break;
	}
}

async function main() {
	console.log(chalk.bgBlack('Bem-vindo ao Caixa Eletrônico!'));

	while (true) {
		await showMenu();
	}
}

main();
