import chalk from 'chalk';

class Logger {
	private static isTestMode = false;

	static setTestMode(enabled: boolean) {
		this.isTestMode = enabled;
	}

	static log(message: string) {
		if (!this.isTestMode) {
			console.log(message);
		}
	}

	static success(message: string) {
		if (!this.isTestMode) {
			console.log(chalk.green(message));
		}
	}

	static error(message: string) {
		if (!this.isTestMode) {
			console.warn(chalk.bgRed(message));
		}
	}

	static warning(message: string) {
		if (!this.isTestMode) {
			console.log(chalk.yellow(message));
		}
	}

	static info(message: string) {
		if (!this.isTestMode) {
			console.log(chalk.blue(message));
		}
	}
}

export default Logger;
