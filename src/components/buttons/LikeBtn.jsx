import { useState } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
const LikeBtn = () => {
  const [isLiked, setLike] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setLike(!isLiked);
  }
  return (
    <button
      onClick={handleClick}
      className={`flex justify-self-end p-2 rounded-2xl bg-white hover:text-primaryClr selection:text-primaryClr ${isLiked ? 'text-primaryClr' : ''}`}
     >
      <FaShoppingBasket />
    </button>
  );
};

export default LikeBtn;
