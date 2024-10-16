import { createContext, ReactNode, useCallback } from "react"
import {api} from "../lib/axios.ts";
import {CurrentUser} from "../interfaces/CurrentUser.ts";
import {AxiosError, AxiosResponse} from "axios";

interface Authentication {
  email: string
  password: string
}

interface AuthenticationContextType {
  authenticate: (data: Authentication) => Promise<void>
  getCurrentUser: () => Promise<CurrentUser | null>
  signOut: () => Promise<void>
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

  const getCurrentUser = useCallback(async () => {
    const userInformation = localStorage.getItem('userInformation')
    if (userInformation) {
      const localStorageUserInfo = JSON.parse(userInformation);
      const accessToken: string = localStorageUserInfo.access_token

      try {
        const response = await api.get('users/me/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })

        const payload = response.data.payload

        return {
          id: payload.id,
          email: payload.email,
          username: payload.username,
          createdAt: payload.created_at,
          updatedAt: payload.updated_at
        } as CurrentUser
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response !== undefined) {
            const response:  AxiosResponse = error.response
            const status: number = response.status

            if (status === 401) {
              return null
            }

          }
        }
      }

    }
    return null
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem("userInformation");
  }, [])


  return (
    <AuthContext.Provider value={{ authenticate, getCurrentUser, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}