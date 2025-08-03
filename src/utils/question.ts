import readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function questionAsync(query: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(query, (answer) => resolve(answer.trim()));
	});
}

export function endReadline() {
	rl.close();
}
