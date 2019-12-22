const { body } = require('express-validator')

const validate = (method) => {


switch (method) {
    case 'createUser': {
      return [
        body('name', "name is required").exists(),
        body('email', "email is required").exists(),
        body('email', 'email is invalid')
        .if(body('email').exists()).isEmail(),
        body('password', 'password is required').exists(),
        body('password', 'password length invalid')
        .if(body('password').exists()).isLength({ min: 7, max:100 })
      ]
    }
  }
};

module.exports = {
    validate
};