import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <Box minH='100vh' bg='mintCream.100' className="antialiased">
      <Flex align='center' justifyContent='center' direction='column' minH="100vh">
        <div>
          <Outlet />
        </div>
      </Flex>
    </Box>
  )
}