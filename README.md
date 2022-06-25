# Stripe plans and subcription example in Node.js
### Fist download code
> git clone https://github.com/icreatewebtech/stripeplans.git
### Step 1 Create three product on your stripe account
### Step 2 Setup project
##### Install package 
> npm i 
Above command install all necessary package
### Step 3 Setup .env file 
> NODE_ENV="development"
> SALT_ROUNDS=10   // salt round for password hash
> ISSUER="Icreatewebtech"
> HOST="localhost"
> SK_TEST="sk_test_xxx"     // Stripe secret key
> PK_TEST ="pk_test_xxx"   // Stripe publishable key
> STRIPE_WEBHOOK_SECRET="whsec_xxx"  // Stripe webhook secret
