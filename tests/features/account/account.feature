Feature: Gerenciamento de Conta

  Scenario: Criar uma nova conta
    When o usuário cria uma conta com nome "Carlos Silva" e saldo "1000"
    Then a conta deve ser criada com sucesso
    And o saldo inicial da conta deve ser "1000"

  Scenario: Consultar saldo da conta
    Given uma conta existente com nome "Ana Souza" e saldo "500"
    When o usuário consulta o saldo da conta
    Then o sistema deve retornar o saldo "500"

  Scenario: Atualizar nome do titular
    Given uma conta existente com nome "João Pedro" e saldo "200"
    When o usuário atualiza o nome para "João da Silva"
    Then a conta deve ter o nome atualizado para "João da Silva"

  Scenario: Excluir uma conta
    Given uma conta existente com nome "Laura Ramos" e saldo "300"
    When o usuário exclui a conta com o nome "Laura Ramos"
    Then a conta deve ser excluída com sucesso

  Scenario: Falha ao excluir com nome incorreto
    Given uma conta existente com nome "Marcos Lima" e saldo "400"
    When o usuário tenta excluir a conta com o nome "Nome Incorreto"
    Then o sistema deve exibir um erro de confirmação
