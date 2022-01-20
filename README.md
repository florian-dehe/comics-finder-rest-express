# Comics Finder (new) REST API

This project contains the files needed to setup the REST server API based on Express.js and Prisma

## Installation

Start the docker compose service in the the `db` folder.
Apply the Prisma schema to the database recently launched with : `npx prisma migrate deploy`
Launch the Express.js server : `node src/index.js`
