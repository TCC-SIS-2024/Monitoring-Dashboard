import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SignInForm } from "../types/authentication";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import {useToast} from "@chakra-ui/react";
export function useAuthentication() {

  const navigate = useNavigate()
  const toast = useToast()

  const { authenticate } = useContext(AuthContext)

  const { mutateAsync: signIn } = useMutation({
    mutationFn: authenticate
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const response = await signIn(data)
      if (response !== undefined) {
        navigate('/')
        toast({
          description: "Logado com sucesso",
          status: 'success',
          duration: 3000,
          position: "top",
          isClosable: true,
        })
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          const response:  AxiosResponse = error.response
          const status: number = response.status
          const payload: string = response.data.payload

          if (status === 404) {
            toast({
              title: payload,
              description: "Usuário não encontrado, verifique suas credenciais",
              status: 'error',
              duration: 3000,
              position: "top",
              isClosable: true,
            })
          }

        }
        else {
          toast({
            title: error.message,
            description: "Não foi possível se conectar ao backend",
            status: 'error',
            duration: 3000,
            position: "top",
            isClosable: true,
          })
        }
      }
      console.error(error)
    }
  }


  return {
    handleSignIn
  }
}