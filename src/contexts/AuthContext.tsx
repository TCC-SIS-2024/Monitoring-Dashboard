import { createContext, ReactNode, useCallback } from "react"

interface Authentication {
  email: string
  password: string
}

interface AuthenticationContextType {
  authenticate: (data: Authentication) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthenticationContextType)

export function AuthProvider({ children }: AuthProviderProps) {

  const authenticate = useCallback(async (data: Authentication) => {
    const { email, password } = data
    console.log(`authenticating... ${email} ${password}`)
  }, [])


  return (
    <AuthContext.Provider value={{ authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}