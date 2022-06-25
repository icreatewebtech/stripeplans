# Stripe plans and subcription example in Node.js
### Fist download code
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
> NODE_ENV="development"  <br />
> SALT_ROUNDS=10   // salt round for password hash <br />
> ISSUER="Icreatewebtech" <br />
> HOST="localhost" <br />
> SK_TEST="sk_test_xxx"     // Your stripe secret key <br />
> PK_TEST ="pk_test_xxx"   // Your stripe publishable key <br />
> STRIPE_WEBHOOK_SECRET="whsec_xxx"  // Your stripe webhook secret <br />

##### Run project
> nodemon server.js

### Step 3 Webhook 
***
##### Download and install stripe cli
> Go to stripe cli docs official page : [Stripe Cli Docs](https://stripe.com/docs/stripe-cli "Get started with the Stripe CLI")

> Download and install stripe cli 

Run command 

> stripe listen --forward-to localhost:3000/stripe/webhook



