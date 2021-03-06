## express-body-validate

express middleware to validate body request, using mongoose schemes

### install

```sh
npm install express-body-validate
```

### usage

Define your mongoose scheme, e.g. 

```js
// file users.model.js
const {Schema, model} = require('mongoose')

const schema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
})

// in line below, we define model with name 'users'
module.exports = mongoose.model('users', schema)
```

Below you can see a typical `POST` route to `/users` using a method in external controller, in example `users.controller.js`

```js
const app = require('express')()
const users = require('./users.controller.js')

app.post('/users', users.create)
```

To use the middleware validation, just add it to route like below

```js
const bodyValidateUsingModel = require('express-body-validate')
app.post('/users', bodyValidateUsingModel('users'), users.create)
```

### Validations

- [required](#required)
- [unique](#unique)

#### required

```http
POST /users
```

```json
// 400 Bad Request

// body response
{
    "errors": [
        "firstname is required",
        "lastname is required",
        "email is required"
    ]
}
```

#### unique

```json
// POST /users

// body request
{
    "firstname": "john",
    "lastname": "stark",
    "email": "johnsnow@gmail.com"
}
```

```json
// 400 Bad Request

// body response
{
    "errors": [
        "email already used (darlanmendonca@gmail.com)"
    ]
}
```
