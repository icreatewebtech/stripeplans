# Stripe plans and subscription example in Node.js
## Features
- Login/Logout
- Subscription
- Add card details and checkout
- Upgrade subscription
- Cancel subscription
- Renew subscription
- Webhook 
## First download code
You need to run `git clone https://github.com/icreatewebtech/stripeplans.git` command.
```
git clone https://github.com/icreatewebtech/stripeplans.git
```
## Step 1 Create three product on your stripe account
> Login in to your stripe account\
> Go to dashboard > product > Add product

## Step 2 Setup project
### Install package 
You need to run `npm i` command.
```
npm i
```
_Above command install all necessary package_

### Setup .env file 
```
NODE_ENV="development"
SALT_ROUNDS=10   // salt round for password hash
ISSUER="Icreatewebtech" 
HOST="localhost"
SK_TEST="sk_test_xxx"     // Your stripe secret key
PK_TEST ="pk_test_xxx"   // Your stripe publishable key
STRIPE_WEBHOOK_SECRET="whsec_xxx"  // Your stripe webhook secret
```
_Note: Remove all comment in .env file_
### MySQL Database
We using `Wamp server` <br/>
If you don't have a wamp then download and install Wamp server : [Download wamp server](https://www.wampserver.com/en/)

> Start Wamp Server\
> Open yor browser and type `http://localhost/phpmyadmin` <br />
> Click on Database tab\
> Type database name stripe_dev

### Sequelize 
Sequelize is a modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.<br />
https://sequelize.org/
##### Tables and models
Create table in the database you need to run `npx sequelize-cli db:migrate` command.
```
npx sequelize-cli db:migrate
```
##### Run project
you need to run `nodemon server.js` command.
```
nodemon server.js
```

## Step 3 Setup webhook 
##### Stripe uses webhooks to notify your application when an event happens in your account.
##### Download and install stripe cli
> Go to stripe cli docs official page : [Stripe Cli Docs](https://stripe.com/docs/stripe-cli "Get started with the Stripe CLI")<br/>
> Download and install stripe cli 
##### Login to stripe CLI
You need to run `stripe login` command.
```
stripe login
```
##### Forward to local server
You need to run `stripe listen --forward-to localhost:3000/stripe/webhook` command.
```
stripe listen --forward-to localhost:3000/stripe/webhook
```



