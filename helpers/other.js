export function convertToDTOs(models, dto) {
  const convertedModels = []
  models.forEach((model) => {
    convertedModels.push(new dto(model))
  })

  return convertedModels
}