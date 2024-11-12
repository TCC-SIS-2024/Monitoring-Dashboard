import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {SignInForm} from "../types/authentication";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import {toaster} from "../components/ui/toaster.tsx";

export function useAuthentication() {

  const navigate = useNavigate()
  const { authenticate, signOut, getCurrentUser } = useContext(AuthContext)

  const { mutateAsync: signIn } = useMutation({
    mutationFn: authenticate
  })

  const { mutateAsync: logOut } = useMutation({
    mutationFn: signOut
  })


  async function handleSignIn(data: SignInForm) {
    try {
      const response = await signIn(data)
      if (response !== undefined) {
        navigate('/')
        toaster.create({
          description: "Logado com sucesso",
          type: 'success',
          duration: 3000
        })
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          const response:  AxiosResponse = error.response
          const status: number = response.status
          const payload: string = response.data.payload

          if (status === 404) {
            toaster.create({
              title: payload,
              description: "Usuário não encontrado, verifique suas credenciais",
              type: 'error',
              duration: 3000,
            })
          }

        }
        else {
          toaster.create({
            title: error.message,
            description: "Não foi possível se conectar ao backend",
            type: 'error',
            duration: 3000,
          })
        }
      }
      console.error(error)
    }
  }
  async function handleLogOut() {
    try {
      await logOut()
      navigate('/sign-in')
    } catch (err) {
      console.error(err)
    }
  }

  async function getCurrentInfoUser() {
    try {
      return await getCurrentUser()
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.status)
        // if (status === 401) {
        //   toaster.create({
        //     description: "Sessão expirada, faça login novamente (RefreshToken Not Implemented)",
        //     type: 'error',
        //     duration: 3000
        //   })
        //   navigate('/sign-in')
        // }
      }
    }
  }


  return {
    getCurrentInfoUser,
    handleSignIn,
    handleLogOut
  }
}