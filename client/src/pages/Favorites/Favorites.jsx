import { useEffect } from "react";
import FavoriteSoxCard from '../../components/FavoritesSoxCard/FavoriteSoxCard';
import axiosInstance from "../../axiosInstance";


export default function Favorites({ user, favorites, setFavorites }) {
  useEffect(() => {
    (async function () {
      try {
        const { data } = await axiosInstance.get(
          `http://localhost:3000/api/favorites/${user.id}`
        );
        setFavorites(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {favorites.length ? (
        favorites.map((el) => (
          <FavoriteSoxCard
            card={el}
            key={el.id}
            user={user}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))
      ) : (
        <h3 style={{ color: "white", fontSize: "40px" }}>Записей нет</h3>
      )}
    </div>
  );
}
