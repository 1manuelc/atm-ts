# ATM TypeScript

Um sistema de caixa eletrônico desenvolvido em TypeScript com interface de linha de comando e testes BDD usando Cucumber.

## 🚀 Funcionalidades

- **Gestão de Contas**: Criar, editar e deletar contas
- **Operações Bancárias**:
  - Consultar saldo
  - Sacar dinheiro
  - Depositar dinheiro
  - Transferir entre contas
- **Interface Interativa**: Menu em português com opções numeradas
- **Banco de Dados**: SQLite com Prisma ORM
- **Testes BDD**: Cucumber para testes de comportamento

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd atm-ts
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o banco de dados**

   ```bash
   npm run setup
   # Gera o cliente Prisma e Executa as migrações do banco de dados
   ```

## 🎯 Como Executar

### Executar a aplicação

```bash
npm start
```

### Executar os testes BDD

```bash
# Executar testes com logs detalhados
npm run test:bdd

# Executar testes sem logs (apenas progresso)
npm run test:bdd:quiet
```

## 📖 Como Usar

Após executar `npm start`, você verá um menu interativo com as seguintes opções:

1. **Consultar saldo** - Visualizar o saldo de uma conta
2. **Sacar** - Realizar saque de uma conta
3. **Transferir** - Transferir dinheiro entre contas
4. **Depositar** - Fazer depósito em uma conta
5. **Criar conta** - Criar uma nova conta
6. **Editar conta** - Modificar dados de uma conta existente
7. **Deletar conta** - Remover uma conta
8. **Limpar terminal** - Limpar a tela do terminal
9. **Sair** - Encerrar a aplicação

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza SQLite com duas tabelas principais:

### Account (Conta)

- `id`: Identificador único (auto-incremento)
- `name`: Nome do titular da conta
- `balance`: Saldo atual da conta

### Transaction (Transação)

- `id`: Identificador único (auto-incremento)
- `amount`: Valor da transação
- `fromId`: ID da conta de origem (opcional)
- `toId`: ID da conta de destino (opcional)
- `timestamp`: Data e hora da transação

## 🧪 Testes

O projeto inclui testes BDD (Behavior Driven Development) usando Cucumber. Os testes estão localizados em:

- **Features**: `tests/features/`
- **Steps**: `tests/features/steps/`
- **Utilitários**: `tests/utils/`

### 🚫 Suprimir Logs Durante os Testes

O projeto inclui um sistema de logger que pode ser controlado para suprimir logs durante os testes:

- **Logs automáticos**: Os logs são automaticamente suprimidos durante a execução dos testes
- **Formato progress**: Use `npm run test:bdd:quiet` para executar testes sem logs detalhados
- **Formato pretty**: Use `npm run test:bdd` para executar testes com logs detalhados

O sistema de logger (`src/utils/logger.ts`) controla automaticamente a exibição de mensagens durante os testes.

## 📁 Estrutura do Projeto

```
atm-ts/
├── src/
│   ├── controllers/     # Controladores da aplicação
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Utilitários
│   └── index.ts         # Ponto de entrada
├── tests/
│   ├── features/        # Arquivos .feature do Cucumber
│   │   └── steps/       # Testes para as features
│   └── utils/           # Utilitários para testes
├── prisma/
│   ├── schema.prisma    # Schema do banco de dados
│   └── migrations/      # Migrações do banco
└── package.json
```

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Resetar banco de dados
npx prisma migrate reset

# Abrir interface do Prisma Studio
npm run prisma:studio
```

### Testes

```bash
# Executar todos os testes
npm run test:bdd

# Executar testes com relatório HTML (faz isso por padrão)
npx cucumber-js --format html:reports/report.html
```

## 🐛 Solução de Problemas

### Erro de conexão com banco de dados

```bash
# Recriar o banco de dados
npx prisma migrate reset
npx prisma generate
```

### Erro de dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript

```bash
# Verificar tipos
npx tsc --noEmit
```

## 📝 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
