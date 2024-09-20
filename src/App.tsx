import React from "react"
import { Box } from "@chakra-ui/react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"


export function App() {

  return (
    <RouterProvider router={router} />
  )
}
