# litespeed-jwt

A fast and easy JWT authentication and creation plugin for Litespeed

## Installation

```
$ npm install litespeed-jwt
```

## Usage

```javascript
import jwt from 'litespeed-jwt'

// Initiate a new jwt instance with a config
const auth = jwt({
  secret: 'mysecretkey' // Required! Never share or commit your secret key to source control!
  // see other options at https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
})

// To authenticate a route:
const myRoute = {
  method: 'GET',
  url: '/endpoint',
  preHandlers: [auth.check]
  handler: (req) => {
    ...
  }
})

// To create a new jwt:
const newJWT = auth.sign(payload)

```

## Contribution

All PR's and contributions are welcome!
