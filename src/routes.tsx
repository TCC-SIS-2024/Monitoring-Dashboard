import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layout/app";
import { AuthLayout } from "./pages/_layout/auth";
import { SignIn } from "./pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: []
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />
      }
    ]
  }
])