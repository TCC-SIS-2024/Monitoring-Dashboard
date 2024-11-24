export function formatPermission(permission: string): string {

  const splitPermission = permission.split(":")
  const [field, action] = splitPermission
  let fieldFormatted

  switch (field) {
    case "aas":
      fieldFormatted = "Asset Administration Shell"
      break
    case "role":
      fieldFormatted = "Cargo"
      break
    case "permission":
      fieldFormatted = "Permissão"
      break
    case "user":
      fieldFormatted = "Usuário"
      break

  }

  switch (action) {
    case "create":
      return `Criar ${fieldFormatted}`
    case "read":
      return `Ler ${fieldFormatted}`
    case "update":
      return `Atualizar ${fieldFormatted}`
    case "delete":
      return `Deletar ${fieldFormatted}`
  }
}
