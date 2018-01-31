### express-body-validate

express middleware to validate body request, using mongoose schemes

### install

```sh
npm i express-body-validate
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