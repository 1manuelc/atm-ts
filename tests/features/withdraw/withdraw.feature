Feature: Transação - Saque

  Scenario: Saque com saldo suficiente
    Given que no saque existe uma conta com ID 60 e saldo 1000
    When no saque eu retiro 300 da conta 60
    Then no saque o saldo da conta 60 deve ser 700

  Scenario: Saque com saldo insuficiente
    Given que no saque existe uma conta com ID 70 e saldo 100
    When no saque eu retiro 200 da conta 70
    Then no saque deve ocorrer um erro "Saldo insuficiente para saque"

  Scenario: Saque de conta inexistente
    When no saque eu retiro 100 da conta 999
    Then no saque deve ocorrer um erro "Conta não encontrada"
