import { createContext, ReactNode, useCallback } from "react"
import {api} from "../lib/axios.ts";

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

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {


  const authenticate = useCallback(async (data: Authentication) => {

    const { email, password } = data
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post('auth/sign-in/', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (response.data.access_token) {
      localStorage.setItem('userInformation', JSON.stringify(response.data))
    }

    return response.data

  }, [])


  return (
    <AuthContext.Provider value={{ authenticate }}>
      {children}
    </AuthContext.Provider>
  )
}