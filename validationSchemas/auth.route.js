export const RegisterRouteSchema = {
  body: {
    type: 'object', properties: {
      username: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' }
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