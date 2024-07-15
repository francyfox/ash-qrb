import SwaggerParser from '@apidevtools/swagger-parser'

export default async function openapiValidate(url: string) {
  try {
    const api = await SwaggerParser.validate(url)
    console.log('API name: %s, Version: %s', api.info.title, api.info.version)
  } catch (error) {
    console.log(`Validation errors. \n${(error as Error).message}`)
  }
}
