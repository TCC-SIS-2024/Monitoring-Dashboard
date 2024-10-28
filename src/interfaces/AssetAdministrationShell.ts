export interface AASResponse {
  id_short: string;
  database_endpoint: string
  aas_modeling: string
  host: string
  active: false
  port: number
  id: string
  created_at: string
  updated_at: string
}

export interface AASPayload {
  idShort: string
  databaseEndpoint: string
  modelingJson: string
  host: string
  port: number
}