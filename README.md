# Stripe plans and subscription example in Node.js
## Features
- Sign up
- Email verification
- Login/Logout
- Create subscription
- Add card details and checkout
- Upgrade/Downgrade subscription
- Cancel subscription
- Auto renew on/off subscription
- Webhook 
## First download code
You need to run `git clone https://github.com/icreatewebtech/stripeplans.git` command.
```
git clone https://github.com/icreatewebtech/stripeplans.git
```
## Step 1 Create product on your stripe account
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
# salt round for password hash
SALT_ROUNDS=10
ISSUER="Icreatewebtech" 
HOST="localhost"
# Your stripe secret key
SK_TEST="sk_test_xxx" 
# Your stripe publishable key
PK_TEST ="pk_test_xxx"
# Your stripe webhook secret
STRIPE_WEBHOOK_SECRET="whsec_xxx"
# Google OAuth2
EMAIL=""
REFRESH_TOKEN=""
CLIENT_ID=""
CLIENT_SECRET=""
```
### MySQL Database
We using `Wamp server` <br/>
If you don't have a wamp then download and install Wamp server : [Download wamp server](https://www.wampserver.com/en/)

> Start wamp server\
> Open yor browser and type `http://localhost/phpmyadmin` <br />
> Click on database tab\
> Enter database name stripe_dev\
> Click on create button

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
