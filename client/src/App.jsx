import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { useEffect, useState } from "react";
import Root from "./Root";
import axiosInstance from "./axiosInstance";
import SockDesignGenerator from "./pages/SockDesignGenerator/SockDesignGenerator";
import Favorites from "./pages/Favorites/Favorites";
import Basket from "./pages/Basket/Basket";
import SockPage from "./pages/SockPage/SockPage";
import EditSock from "./components/EditSock/EditSock";
import HomePage from "./pages/HomePage/HomePage";
import { setAccessToken } from "./axiosInstance";


function App() {
  const [user, setUser] = useState();
 
  useEffect(() => {
    axiosInstance(`http://localhost:3000/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.refreshToken);
    });
  }, []);



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} />,
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

          path: "/createdesign",
          element: <SockDesignGenerator />,
        },
{
          path: "/favorites",
          element:
            <Favorites
            user={user} setUser={setUser}
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
