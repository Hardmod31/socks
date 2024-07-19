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

  
  const checkIfFavoriteSockExists = async (sockId, userId) => {
    const response = await axios.post("http://localhost:3000/api/check/favorite", {
      sockId,
      userId,
    });
  
    return response.data.exists;
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
      
      const favoriteSock = await checkIfFavoriteSockExists(addedSock.data.values.id, user.id);
      if (favoriteSock) {
        return favoriteSock;
      }
  
      await axios.post("http://localhost:3000/api/addsock/favorites", {
        sockId: addedSock.data.values.id,
        userId: user.id,
      });
  
      return addedSock.data.values;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "300px",
          alignItems: "center",
          margin: "200px 50px 200px 50px",
          // backgroundColor: "lightcyan",
          justifyContent: "center",
        }}
      >
        <div style={{ height: "720px", width: "600px" }}>
          <SvgSock color={color.name} pattern={pattern.name} img={img.name} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            height: "700px",
          }}
        >
          <label> Выберите цвет:</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px"  }}>
            {designOptions.color.map((colorOption) => (
              <div
                onClick={() => colorHandler(colorOption)}
                style={{
                  backgroundColor: colorOption.name,
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  // border: "solid",
                  border: color === colorOption ? "solid black" : "solid #ccc",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          <label> Выберите узор:</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px"  }}>
            {designOptions.pattern.map((patternOption) => (
              <div
                onClick={() => patternHandler(patternOption)}
                style={{
                  backgroundImage: `url("/${patternOption.name}")`,
                  // border: "solid",
                  border:
                    pattern === patternOption ? "solid black" : "solid #ccc",
                  borderRadius: "8px",
                  width: "150px",
                  height: "70px",
                  cursor: "pointer",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>

          <label> Выберите изображение:</label>
          <div
            style={{
              display: "flex",
              gap: "10px",
              maxWidth: "654px",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            {designOptions.img.map((imgOption) => (
              <div
                onClick={() => imgHandler(imgOption)}
                style={{
                  backgroundImage: `url("${imgOption.name}")`,
                  // border: "solid",
                  border: img === imgOption ? "solid black" : "solid #ccc",
                  borderRadius: "8px",
                  width: "150px",
                  height: "70px",
                  cursor: "pointer",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            ))}
          </div>
          <button
            onClick={skipHandler}
            style={{ cursor: "pointer", width: "30%"}}
          >
            Сбросить дизайн
          </button>
          <br />
          <div>Срок изготовления: 3 дня</div>
          <div>Итоговая стоимость: {price} ₽</div>

          <div style={{ display: "flex", gap: "4px", marginTop: "auto", height: "80px", }}>
            
            <button
              onClick={addSockToBasket}
              style={{ cursor: "pointer", width: "94%" }}
            >
              Добавить в корзину
            </button>
            {/* <button style={{ cursor: "pointer" }}>Добавить в корзину</button> */}
            <button onClick={addToFavorites} style={{ cursor: "pointer", width: "12%"}}>
              💙
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SockDesignGenerator;
