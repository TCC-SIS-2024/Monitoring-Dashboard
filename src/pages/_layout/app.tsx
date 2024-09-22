import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Flex, useToast } from "@chakra-ui/react";
import { useSocket } from "../../hooks/useSocket";
import { useEffect } from "react";

export function AppLayout() {

  const { isConnected } = useSocket()
  const toast = useToast()

  useEffect(() => {
    if (isConnected) {
      toast({
        description: "Conectado ao socket",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    else {
      toast({
        description: "Desconectado ao socket",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }, [isConnected])

  return (
    <Flex flexDirection='column' minH='100vh'>
      <Header />
      <Flex bg='whiteDifferent' flexDirection='column' flex={1}>
        <Outlet />
      </Flex>
    </Flex>
  )
}