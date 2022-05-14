export const PagesRouteSchema = {
  body: {
    type: 'object', $ref: 'http://vschemas/page.json#'
  }
}
export const PagesDeleteRouteSchema = {
  params: {
    type: 'object', properties: {
      pageId: { type: 'string' }
    }, required: ['pageId']
  }
}