# Setting Up Your Development Environment

## Database

First, provision a [Datastax Astra](https://astra.datastax.com) database.

From there, grab a few components:

- Base URL
- Region
- Keyspace
- Application Token

Populate these in `.env.local` as per `.env.example`.

## Postgres Metadata Store

To do indexing on collection metadata, we make use of Postgres' joins and text vector indexes.

Simply grab the connection pool string from Supabase and populate it in `.env.local`.

```sh
PG_URI="{connection_string}
```
