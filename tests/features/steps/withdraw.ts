import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { prisma } from '../../../src/db/prisma';
import { TransactionService } from '../../../src/services/transaction';

let capturedError: string | null = null;

Given(
  /^que existe uma conta com ID (\d+) e saldo (\d+)$/,
  async (id: number, saldo: number) => {
    await prisma.account.upsert({
      where: { id },
      update: { balance: saldo },
      create: { id, name: `Conta ${id}`, balance: saldo },
    });
  }
);

When(
  /^eu saco (\d+) da conta (\d+)$/,
  async (valor: number, id: number) => {
    capturedError = null;
    try {
      await TransactionService.withdraw(id, valor);
    } catch (err: any) {
      capturedError = err.message;
    }
  }
);

Then(
  /^o saldo da conta (\d+) deve ser (\d+)$/,
  async (id: number, esperado: number) => {
    const conta = await prisma.account.findUnique({
      where: { id },
    });
    assert.ok(conta, 'Conta não encontrada ao verificar saldo');
    assert.strictEqual(conta.balance, esperado);
  }
);

Then(/^deve ocorrer um erro "(.*)"$/, async (mensagem: string) => {
  assert.ok(capturedError, 'Esperava um erro, mas nenhum foi lançado');
  assert.strictEqual(
    capturedError,
    mensagem,
    `Esperava erro "${mensagem}", mas recebeu "${capturedError}"`
  );
});
