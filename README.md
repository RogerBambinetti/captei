# Captei - Teste Prático Programador NodeJS + Elasticsearch + SQL

## Description
A brief description of what this project does and who it's for.

## Installation
Instructions on how to install and set up the project.

1. First, let's install the project dependencies with npm:

```bash
# Install dependencies
npm install
```

1. Now, make sure to run the docker containers using docker compose:

```bash
docker compose up -d
```

2. Next, we need to run knex migrations in order to create tables and populate the database:

```bash
npx knex migrate:latest
```

3. Finally, run the nodeJS project with:

```bash
npm start
```

## Contributing
Guidelines for contributing to the project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.