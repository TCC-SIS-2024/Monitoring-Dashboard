import {z} from "zod";

export const createAssetAdministrationShellForm = z.object({
  idShort: z.string(),
  databaseEndpoint: z.string(),
  host: z.string(),
  port: z.number(),
  aasModeling: z.string(),
})

export const aasFilterSchema = z.object({
  search: z.string().optional()
})


export type AASFiltersSchema = z.infer<typeof aasFilterSchema>
export type CreateAssetAdministrationShellForm = z.infer<typeof createAssetAdministrationShellForm>