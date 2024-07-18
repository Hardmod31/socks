import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { useEffect, useState } from "react";
import Root from "./Root";
import axiosInstance from "./axiosInstance";
import Favorites from "./pages/Favorites/Favorites";

function App() {
  const [user, setUser] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosInstance(`http://localhost:3000/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.refreshToken);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user}/>,
      children: [
        {
          path: "/login",
          element: <LoginPage setUser={setUser} />,
        },
        {
          path: "/registration",
          element: <RegistrationPage setUser={setUser} />,
        },
        {
          path: "/",
          element: <LoginPage user={user} setUser={setUser} />,
        },
        {
          path: "/favorites",
          element: (
            <Favorites
              user={user}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;