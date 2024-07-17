import React, { useEffect, useLayoutEffect, useState } from "react";
import { getAuthCookies } from "../../utils/utility.js";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./EditSock.css";

export default function EditSock() {
  const navigate = useNavigate();
  const params = useParams();
  const { accessToken } = getAuthCookies();
  const [createSock, setCreateSock] = useState({});

  const getSockInfo = () => {
    axios.get(
      `http://localhost:3000/api/one/sock/${params.id}`
    )
    .then((data) => {
      console.log(data);
      setCreateSock({...createSock,
        color: data.data.item.color,
        pattern: data.data.item.pattern,
        price: data.data.item.price,
        img: data.data.item.img,
        quantity: data.data.item.quantity,
      })
    })
  }

  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setCreateSock({ ...createSock, userId: String(user.id) });
    }
  };

  const handleClickUpdate = async () => {
        try {
          const result = await axios.put(
            `http://localhost:3000/api/edit/sock/${params.id}`,
            {
              data: createSock,
            },
          )
          if (result.status === 200) {
            navigate("/profile")
          }
        } catch(error) { 
          console.log(error);
        }
  }

  const handleClickSave = async () => {
        try {
          await axios.post(
            `http://localhost:3000/api/add/sock`,
            createSock,
            { withCredentials: true }
          );
          navigate("/");
        } catch (error) {
          console.log(error);
        }
  };

  useEffect(() => {
    getUserData(accessToken);
  }, []);

  useEffect(() => {
    if (params.id) {
      getSockInfo()
    }
  }, [params.id]);

  useLayoutEffect(() => {
    if (createSock.price < 0) {
      setCreateSock({ ...createSock, "price": 0 })
    }
  }, [createSock.price]);

  return (
    <div className="editBox">
      <h1 className="editTitle">цвет</h1>
      <input
        className="normalSockDesc"
        placeholder="цвет"
        type="text"
        value={createSock.color}
        onChange={(e) =>
          setCreateSock({ ...createSock, color: String(e.target.value) })
        }
      />
        <input
        className="normalSockDesc"
        placeholder="узор"
        type="text"
        value={createSock.pattern}
        onChange={(e) =>
          setCreateSock({ ...createSock, pattern: String(e.target.value) })
        }
      />
            <input
        className="normalSockDesc"
        placeholder="имг"
        type="text"
        value={createSock.img}
        onChange={(e) =>
          setCreateSock({ ...createSock, img: String(e.target.value) })
        }
      />
      <input
        className="normalSockDesc"
        placeholder="цена"
        type="number"
        value={createSock.price}
        onChange={(e) =>
          setCreateSock({ ...createSock, price: String(e.target.value) })
        }
      />
            <input
        className="normalSockDesc"
        placeholder="количество"
        type="number"
        value={createSock.quantity}
        onChange={(e) =>
          setCreateSock({ ...createSock, quantity: String(e.target.value) })
        }
      />
      {params.id ? <button className="editBtn" 
      onClick={handleClickUpdate}>Изменить</button> 
      : <button className="editBtn" 
      onClick={handleClickSave}>Создать</button>}
    </div>
  );
}
