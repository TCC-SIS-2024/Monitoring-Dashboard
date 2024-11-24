import {z} from "zod";
import {aasFilterSchema} from "./asset-administration-shell.ts";

export const roleFilterSchema = z.object({
  search: z.string().optional()
})

export const createRoleForm = z.object({
  name: z.string()
})

export type RoleFiltersSchema = z.infer<typeof aasFilterSchema>
export type CreateRoleForm = z.infer<typeof createRoleForm>