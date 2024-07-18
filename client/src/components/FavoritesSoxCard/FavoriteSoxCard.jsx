import axiosInstance from "../../axiosInstance";

function OneCardForFavorite({ socks, user, setFavorites }) {
 

  async function deleteFromFavorite() {
    if (user) {
      await axiosInstance.delete(`http://localhost:3000/api/favorites`, {
        data: {
          stoneId: socks.id,
          userId: user.id,
        },
      });
      setFavorites((prev) => prev.filter((el) => el.id !== socks.id));
    } else {
      alert("Вы не авторизованы");
    }
  }

  return (
    <div className="card">
    <img src={socks.img} alt='носок' />
    <button onClick={deleteFromFavorite}>Удалить из избранного</button>
  </div>
  );
}

export default OneCardForFavorite;
