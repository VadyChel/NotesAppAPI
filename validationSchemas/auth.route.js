export const RegisterRouteSchema = {
  body: {
    type: 'object', properties: {
      username: { type: 'string', minLength: 4, maxLength: 40 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 10, maxLength: 256 }
    }, required: ['username', 'email', 'password']
  }
}

export const LoginRouteSchema = {
  body: {
    type: 'object', properties: {
      email: { type: 'string', format: 'email' }, password: { type: 'string', minLength: 10, maxLength: 256 }
    }, required: ['email', 'password']
  }
}