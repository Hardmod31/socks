import React, { useState } from "react";
import SvgSock from "../../components/SvgSock/SvgSock";
import designOptions from "../../constants/designs.json";
import { getAuthCookies } from "../../utils/utility";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SockDesignGenerator = () => {
  const { accessToken } = getAuthCookies();

  const [color, setColor] = useState({ name: "fff", price: 0 });
  const [pattern, setPattern] = useState({});
  const [img, setImg] = useState("");
  const [presentSock, setPresentSock] = useState([]);

  const price =
    500 + ((color.price || 0) + (pattern.price || 0) + (img.price || 0));
  console.log(pattern);

  const colorHandler = (color) => {
    setColor(color);
  };

  const patternHandler = (pattern) => {
    setPattern(pattern);
  };

  const imgHandler = (img) => {
    setImg(img);
  };

  const skipHandler = () => {
    setColor("#fff");
    setPattern("");
    setImg("");
  };

  // const addToCartHandler = async (e) => {
  //   e.preventDefault();
  //   const response = await axiosInstance.post(
  //     `http://localhost:3000/api/addsocks/basket`,
  //     { sockId: sock.id, userId: user.id }
  //   );
  // };

  const addSockToBasket = async () => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;

    const addedSock = await axios.post("http://localhost:3000/api/add/sock", {
      data: {
        color: color.name,
        img: img.name,
        pattern: pattern.name,
        price,
        quantity: 1,
        userId: user.id,
      },
    });
    await axios.post("http://localhost:3000/api/addsocks/basket", {
      data: {
        sockId: addedSock.data.values.id,
        userId: user.id,
      },
    });
   
  };

  const addToFavorites = async () => {
    const decoded = jwtDecode(accessToken);
    const { user } = decoded;

    const addedSock = await axios.post("http://localhost:3000/api/add/sock", {
      data: {
        color: color.name,
        img: img.name,
        pattern: pattern.name,
        price,
        quantity: 1,
        userId: user.id,
      },
    });
    try {
        await axios.post(
          'http://localhost:3000/api/addsocks/favorites',
          {
            sockId: addedSock.data.values.id,
            userId: user.id,
          }
        );
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "200px",
          alignItems: "center",
          marginTop: "150px",
          // backgroundColor: "lightcyan",
          justifyContent: "center",
        }}
      >
        <div style={{ height: "400px", width: "400px" }}>
          <SvgSock color={color.name} pattern={pattern.name} img={img.name} />
        </div>

        {/* <label>
        Цвет:
        <input type="color" value={color} onChange={colorHandler} />
      </label> */}

        {/* <select name="color" onChange={colorHandler}>
        {designOptions.color.map((item) => (
          <option value={item}>цвет</option>
        ))}
      </select> */}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label> Выберите цвет:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {designOptions.color.map((color) => (
              <div
                onClick={() => colorHandler(color)}
                style={{
                  backgroundColor: color.name,
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  border: "solid",
                }}
              />
            ))}
          </div>

          <label> Выберите узор:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {designOptions.pattern.map((pattern) => (
              <div
                onClick={() => patternHandler(pattern)}
                style={{
                  backgroundImage: `url("/${pattern.name}")`,
                  border: "solid",
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>

          <label> Выберите изображение:</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {designOptions.img.map((img) => (
              <div
                onClick={() => imgHandler(img)}
                style={{
                  backgroundImage: `url("${img.name}")`,
                  border: "solid",
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>
          <div>Срок изготовления: 3 дня</div>
          <div>Итоговая стоимость: {price} ₽</div>
          <button onClick={skipHandler} style={{ cursor: "pointer" }}>
            Сбросить дизайн
          </button>
          <button onClick={addSockToBasket}>
            Добавить в корзину
          </button>
          {/* <button style={{ cursor: "pointer" }}>Добавить в корзину</button> */}
          <button onClick={addToFavorites} style={{ cursor: "pointer" }}>Добавить в избранное</button>
        </div>
      </div>
    </>
  );
};

export default SockDesignGenerator;
