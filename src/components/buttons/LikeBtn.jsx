import { FaShoppingBasket } from 'react-icons/fa';
import { useContext } from 'react';
import FavContext from '../../context/FavContext';
const LikeBtn = ({id}) => {
  const {isFav, toggleFav} = useContext(FavContext);
   const favorited = isFav(id);
  const handleClick = (e) => {
    e.stopPropagation();
    toggleFav(id);
  }
  return (
    <button
    type='button'
      onClick={handleClick}
      className={`flex justify-self-end p-2 rounded-2xl bg-white selection:text-primaryClr ${favorited ? 'text-primaryClr' : ''}`}
     >
      <FaShoppingBasket />
    </button>
  );
};

export default LikeBtn;
