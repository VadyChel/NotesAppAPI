export const RegisterRouteSchema = {
  body: {
    type: 'object', properties: {
      username: { type: 'string', minLength: 4 }, email: { type: 'string' }, password: { type: 'string', minLength: 10 }
    }, required: ['username', 'email', 'password']
  }
}

export const LoginRouteSchema = {
  body: {
    type: 'object', properties: {
      email: { type: 'string' }, password: { type: 'string' }
    }, required: ['email', 'password']
  }
}