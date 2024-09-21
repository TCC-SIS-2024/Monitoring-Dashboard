import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Box, Flex } from "@chakra-ui/react";

export function AppLayout() {
  return (
    <Flex flexDirection='column' minH='100vh'>
      <Header />
      <Flex bg='whiteDifferent' flexDirection='column' flex={1}>
        <Outlet />
      </Flex>
    </Flex>
  )
}