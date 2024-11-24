import {createBrowserRouter} from "react-router-dom";
import {AppLayout} from "./pages/_layout/app";
import {AuthLayout} from "./pages/_layout/auth";
import {SignIn} from "./pages/auth/sign-in";
import {Dahsboard} from "./pages/app/dashboard/dashboard";
import {Users} from "./pages/app/users/users.tsx";
import {AssetAdministrationShells} from "./pages/app/aas/aas.tsx";
import {Roles} from "./pages/app/roles/roles.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dahsboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/roles',
        element: <Roles/>
      },
      {
        path: '/asset-administration-shells',
        element: <AssetAdministrationShells />
      },
    ]
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