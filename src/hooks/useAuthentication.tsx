import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { SignInForm } from "../types/authentication";
import { useMutation } from "@tanstack/react-query";

export function useAuthentication() {

  const { authenticate } = useContext(AuthContext)

  const { mutateAsync: signIn } = useMutation({
    mutationFn: authenticate
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn(data)
    } catch (error) {
      console.error(error)
    }
  }


  return {
    handleSignIn
  }

}