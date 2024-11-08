import {Outlet} from "react-router-dom";
import {Header} from "../../components/Header/Header";
import {Flex} from "@chakra-ui/react";
import {useSocket} from "../../hooks/useSocket";
import {useEffect} from "react";
import {toaster} from "../../components/ui/toaster.tsx";

export function AppLayout() {

  const { isConnected } = useSocket()

  useEffect(() => {
    if (isConnected) {
      toaster.create({
        description: "Conectado ao socket",
        type: 'success',
        duration: 3000,
      })
    }
    else {
      toaster.create({
        description: "Desconectado ao socket",
        type: 'error',
        duration: 3000,
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