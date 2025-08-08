Feature: Transferência entre contas

  Scenario: Transferência com saldo suficiente
    Given que na transferencia existem duas contas: ID 10 com saldo 1000 e ID 20 com saldo 500
    When eu transfiro 300 da conta 10 para a conta 20
    Then na transferencia o saldo da conta 10 deve ser 700
    And na transferencia o saldo da conta 20 deve ser 800

  Scenario: Transferência com saldo insuficiente
    Given que na transferencia existem duas contas: ID 30 com saldo 50 e ID 40 com saldo 200
    When eu transfiro 100 da conta 30 para a conta 40
    Then na transferencia deve ocorrer um erro "Saldo insuficiente para transferência"

  Scenario: Transferência para conta inexistente
    Given que na transferencia existe uma conta com ID 50 e saldo 400
    When eu transfiro 100 da conta 50 para a conta 999
    Then na transferencia deve ocorrer um erro "Conta de origem ou destino não encontrada"
