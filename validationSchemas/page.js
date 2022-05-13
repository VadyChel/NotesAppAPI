export const PageVSchema = {
  $id: 'http://vschemas/page.json',
  type: 'object',
  properties: {
    root: { type: 'boolean' },
    parent: { type: 'string' },
    nestedPages: { type: 'array', items: { type: 'string' } },
    position: { type: 'number' },
    author: { type: 'string' },
    name: { type: 'string' },
    favourite: { type: 'boolean' }
  },
  required: ['name']
}