import { Before, After } from '@cucumber/cucumber';
import { resetDatabase } from './reset-db';
import Logger from '../../src/utils/logger';

Before(async function () {
	// Ativa o modo de teste para suprimir logs
	Logger.setTestMode(true);
	await resetDatabase();
});

After(async function () {
	// Desativa o modo de teste
	Logger.setTestMode(false);
	await resetDatabase();
});
