import React, { useState } from "react";
import Sock from "../../components/SvgSock/SvgSock";
import designOptions from "../../constants/designs.json";

const SockDesignGenerator = () => {
  const [color, setColor] = useState("#fff");
  const [pattern, setPattern] = useState("");
  const [img, setImg] = useState("");

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
  //     `${import.meta.env.VITE_API}/cart/`,
  //     { sock }
  //   );
  // };

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
          <SvgSock color={color} pattern={pattern} img={img} />
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
                  backgroundColor: color,
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
                  backgroundImage: `url("/${pattern}")`,
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
                  backgroundImage: `url("${img}")`,
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
          <div>Итоговая стоимость: 250 ₽</div>
          <button onClick={skipHandler} style={{ cursor: "pointer" }}>
            Сбросить дизайн
          </button>
          {/* <button onClick={addToCartHandler}>Добавить в корзину</button> */}
          <button style={{ cursor: "pointer" }}>Добавить в корзину</button>
          <button style={{ cursor: "pointer" }}>Добавить в избранное</button>
        </div>
      </div>
    </>
  );
};

export default SockDesignGenerator;
