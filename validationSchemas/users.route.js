export const ActivateUserRouteSchema = {
  params: {
    type: 'object', properties: {
      code: { type: 'string' }
    }, required: ['code']
  }
}