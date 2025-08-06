Feature: Transação - Depósito

Scenario: Depósito com valor válido
    Given uma conta com saldo de R$ 500,00
    When o cliente deposita R$ 200,00
    Then o novo saldo deve ser R$ 700,00

  Scenario: Depósito com valor zero
    Given uma conta com saldo de R$ 500,00
    When o cliente tenta depositar R$ 0,00
    Then o depósito deve ser rejeitado com a mensagem "Valor de depósito inválido."

  Scenario: Depósito com valor negativo
    Given uma conta com saldo de R$ 500,00
    When o cliente tenta depositar R$ -50,00
    Then o depósito deve ser rejeitado com a mensagem "Valor de depósito inválido."