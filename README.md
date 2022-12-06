# node-api

Node API design

To start the app:

1. Create a .env file in the root file with the following keys:

   - DATABASE_URL
   - JWT_SECRET

2. Provide one PSQL database url to the DATABASE_URL key. You can create an account on a db cloud provider like www.render.com and then create a Postgres database. After the db is created, paste the external database URL in the .env file.

3. Run a Prisma migration to create all db tables and indexes:
   `npx prisma migrate dev --name init`

4. Run `npm run dev` to start the app.
