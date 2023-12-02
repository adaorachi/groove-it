import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Discover,
  Browse,
  Genre,
  Artist,
  FavouritePlaylists,
  Playlist,
  Search,
  MyPlaylists,
  MyPlaylist,
  Profile,
  Notifications,
  Error,
} from "@/pages/_root";

import { Register, Login, ForgetPass, VerifyForgetPass } from "@/pages/_auth";
import { RootLayout, AuthLayout } from "@/pages/_layout";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/discover" replace /> },
          {
            path: "/discover",
            element: <Discover />,
          },
          {
            path: "/browse",
            element: <Browse />,
          },
          {
            path: "/search",
            element: <Search />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/notifications",
            element: <Notifications />,
          },
          {
            path: "/favourite-playlists",
            element: <FavouritePlaylists />,
          },

          {
            path: "/my-playlist",
            element: <MyPlaylists />,
          },
          {
            path: "/my-playlist/:id",
            element: <MyPlaylist />,
          },
          {
            path: "/genre/:id",
            element: <Genre />,
          },
          {
            path: "/artist/:id",
            element: <Artist />,
          },
          {
            path: "/:section/:id",
            element: <Playlist />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/reset-password",
            element: <ForgetPass />,
          },
          {
            path: "/verify-reset-password",
            element: <VerifyForgetPass />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
