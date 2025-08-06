# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions para automação de CI/CD.

## Workflows Disponíveis

### Behavion-Driven Development Tests (`bdd-tests.yml`)

**Trigger**: Executa a cada push para as branches `main`, `master` e `develop`, e em pull requests para `main` e `master`.

**Jobs**:

1. **test**: Executa no Ubuntu Latest com Node.js 20.x
   - Checkout do código
   - Setup do Node.js com cache de npm
   - Instalação das dependências (`npm ci`)
   - Setup do Prisma (generate + db push)
   - Execução dos testes BDD (`npm run test:bdd`)
   - Verificação da compilação TypeScript (`npx tsc --noEmit`)

## Como Funciona

1. **Push/Pull Request**: Quando você fizer push para uma das branches principais ou criar um pull request, o workflow será automaticamente executado.

2. **Ambiente**: O workflow roda em um ambiente Ubuntu com Node.js 20.x.

3. **Banco de Dados**: O Prisma é configurado com `db push` para criar o schema no banco SQLite.

4. **Testes**: Os testes BDD (Cucumber) são executados para validar todas as funcionalidades.

5. **Compilação**: O TypeScript é verificado para garantir que não há erros de compilação.

## Status

- ✅ **Sucesso**: Todos os testes passaram
- ❌ **Falha**: Um ou mais testes falharam
- ⏳ **Em execução**: Workflow está rodando

## Logs

Os logs detalhados podem ser encontrados na aba "Actions" do GitHub, onde você pode ver:

- Quais steps passaram/falharam
- Logs de erro detalhados
- Tempo de execução
- Cache de dependências
