import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { extendTheme } from '@chakra-ui/react'
import { colors } from "./styles/default.ts"
import { RouterProvider } from "react-router-dom"

const theme = extendTheme({ colors })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
