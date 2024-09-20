import React from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { AuthProvider } from "./contexts/AuthContext"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"


export function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  )
}
