Feature: Transação - Saque

  Scenario: Saque com saldo suficiente
    Given que existe uma conta com ID 60 e saldo 1000
    When eu saco 300 da conta 60
    Then o saldo da conta 60 deve ser 700

  Scenario: Saque com saldo insuficiente
    Given que existe uma conta com ID 70 e saldo 100
    When eu saco 200 da conta 70
    Then deve ocorrer um erro "Saldo insuficiente para saque"

  Scenario: Saque de conta inexistente
    When eu saco 100 da conta 999
    Then deve ocorrer um erro "Conta não encontrada"