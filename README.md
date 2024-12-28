# Captei Test - NodeJS + Elasticsearch + PostgreSQL

[![English](https://img.shields.io/badge/lang-english-blue.svg)](README.md)
[![Português](https://img.shields.io/badge/lang-portuguese-green.svg)](README.pt-br.md)

## Description
Test project for mid NodeJS developer position at Captei.

## Requirements

Before you begin, ensure you have met the following requirements:

- Node.js (v16.x).
- Npm (v8.x)
- Docker (v27.x)
- Docker Compose (v2.x)

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

## License

This project is intended for learning purposes only and is not licensed for commercial use.

## Contributors

<table align="center">
  <tr>
      <a href="https://github.com/RogerBambinetti">
        <img src="https://avatars0.githubusercontent.com/u/50684839?s=460&v=4" width="100px" alt="Photo of Roger Bambinetti"/>
        <br />
        <sub><b>Roger Bambinetti</b></sub>
      </a>
  </tr>
</table>
