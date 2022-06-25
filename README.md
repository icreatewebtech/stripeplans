# Stripe plans and subcription example in Node.js
### First download code
> git clone https://github.com/icreatewebtech/stripeplans.git
### Step 1 Create three product on your stripe account
---
> Login in to your stripe account\
> Go to dashboard > product > Add product

### Step 2 Setup project
---
##### Install package 
> npm i

_Above command install all necessary package_

##### Setup .env file 
```
NODE_ENV="development"  <br />
SALT_ROUNDS=10   // salt round for password hash <br />
ISSUER="Icreatewebtech" <br />
HOST="localhost" <br />
SK_TEST="sk_test_xxx"     // Your stripe secret key <br />
PK_TEST ="pk_test_xxx"   // Your stripe publishable key <br />
STRIPE_WEBHOOK_SECRET="whsec_xxx"  // Your stripe webhook secret <br />
```

##### MySQL Database

We using Wamp server 
If you don't have a wamp then download and install Wamp server : [Wamp Server](https://www.wampserver.com/en/)

1 Start Wamp Server
2 Open yor browser and type http://localhost/phpmyadmin
3 Click on Database tab
4 Type database name stripe_dev  

###### Database configuration

config.json file is configuration of database connection. 
config.json available in config/config.json directory

###### config.json
```Json
{
  "development": {
    "username": "root",
    "password": "",
    "database": "stripe_dev",
    "host": "localhost",
    "dialect": "mysql", 
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",


    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
##### Create table
```cmd
> npx sequelize-cli db:migrate
```
##### Run project
> nodemon server.js

### Step 3 Webhook 
***
##### Download and install stripe cli
> Go to stripe cli docs official page : [Stripe Cli Docs](https://stripe.com/docs/stripe-cli "Get started with the Stripe CLI")

> Download and install stripe cli 

Run command 

> stripe listen --forward-to localhost:3000/stripe/webhook



