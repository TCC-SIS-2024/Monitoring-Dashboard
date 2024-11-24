import {ResponsePermission} from "./Permission.ts";

export interface ResponseRole {
  id: string
  name: string
  permissions?: ResponsePermission[]
  created_at: string
  updated_at: string
}