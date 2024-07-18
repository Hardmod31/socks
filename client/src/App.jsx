import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { useEffect, useState } from "react";
import Root from "./Root";
import axiosInstance from "./axiosInstance";
import Favorites from "./pages/Favorites/Favorites";
import Basket from "./pages/Basket/Basket";
import SockPage from "./pages/SockPage/SockPage";
import EditSock from "./components/EditSock/EditSock";
import HomePage from "./pages/HomePage/HomePage";
import {setAccessToken} from "./axiosInstance";


function App() {
  const [user, setUser] = useState();
  const [favorites, setFavorites] = useState([]);
 
  useEffect(() => {
    axiosInstance(`http://localhost:3000/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.refreshToken);
    });
  }, []);

  function addToFavorites(sock) {
    if (user) {
      console.log("Добавление в избранное:", sock);
      axiosInstance.post(`http://localhost:3000/api/favorites`, {
        sockId: sock.id,
        userId: user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log("Успешно добавлено в избранное:", response.data);
      })
      .catch(error => {
        console.error("Ошибка при добавлении в избранное:", error);
      });
    } else {
      alert("Вы не авторизованы");
    }
  }

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
          element:
            <Favorites
              user={user}
              favorites={favorites}
              setFavorites={setFavorites}
            />
        },
        {
          path: "/basket",
          element: <Basket user={user} setUser={setUser}/>,
        },
        {
          path: "/homepage",
          element: <HomePage user={user} setUser={setUser}/>,
        },
        {
          path: "/sock/:id",
          element: <SockPage user={user} setUser={setUser}/>,
        },
        {
          path: "/editsock",
          element: <EditSock user={user} setUser={setUser}/>,
        },
        {
          path: "/updateSock/:id",
          element: <EditSock user={user} setUser={setUser}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;