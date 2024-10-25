// @ts-ignore
import React from "react"
import {RouterProvider} from "react-router-dom"
import {router} from "./routes"
import {AuthProvider} from "./contexts/AuthContext"
import {QueryClientProvider} from "@tanstack/react-query"
import {queryClient} from "./lib/react-query"
import {SocketProvider} from "./contexts/SocketContext"
import {themeSystem} from "./styles/default.ts";
import {Toaster} from "./components/ui/toaster.tsx";
import {ChakraProvider} from "@chakra-ui/react";

export function App() {

  return (
    <ChakraProvider value={themeSystem}>
        <Toaster/>
        <AuthProvider>
          <SocketProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}/>
            </QueryClientProvider>
          </SocketProvider>
        </AuthProvider>
    </ChakraProvider>
  )
}
