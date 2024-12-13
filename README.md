# Captei Test - NodeJS + Elasticsearch + SQL

## Description
Test project for mid NodeJS developer at Captei.

## Installation & Setup

Instructions on how to install and set up the project.

1. First, let's install the project dependencies with npm:

```bash
# Install dependencies
npm install
```

2. Set your environment variables correctly in the `.env` file (refer to `.env.example` for guidance):

3. Now, make sure to run the docker containers using docker compose:

```bash
docker compose up -d
```

4. Next, we need to run knex migrations in order to create tables and populate the database:

```bash
npx knex migrate:latest
```

5. Finally, run the nodeJS project with:

```bash
npm start
```

## Filters

Filters must be configured as `jsonb` on the `snapshot` table. The filters bellow are available:

```bash
{
    businessType: string, \\ ("venda", "aluguel")
    propertyType: string, \\ ("casa", "apartamento")
    bedrooms: integer,
    bathrooms: integer,
    parkingSpots: integer
}
```