# Captei Teste - NodeJS + Elasticsearch + SQL

## Descrição
Projeto de teste para desenvolvedor NodeJS pleno na Captei.

## Requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- Node.js (v16.x).
- Npm (v8.x).
- Docker (v27.x).
- Docker Compose (v2.x).

## Instalação e Configuração

Instruções sobre como instalar e configurar o projeto.

1. Primeiro, instale as dependências do projeto com o npm:

```bash
# Instalar dependências
npm install
```

2. Configure corretamente suas variáveis de ambiente no arquivo `.env` (consulte o `.env.example` como referência).

3. Certifique-se de executar os containers Docker usando o docker compose:

```bash
docker compose up -d
```

4. Em seguida, execute as migrações do Knex para criar as tabelas e popular o banco de dados:

```bash
npx knex migrate:latest
```

5. Por fim, inicie o projeto NodeJS com:

```bash
npm start
```

## Filtros

Os filtros devem ser configurados como `jsonb` na tabela `snapshot`. Os seguintes filtros estão disponíveis:

```bash
{
    businessType: string, \\ ("venda", "aluguel")
    propertyType: string, \\ ("casa", "apartamento")
    bedrooms: integer,
    bathrooms: integer,
    parkingSpots: integer
}
```