import {FaRegUserCircle} from 'react-icons/fa'
const Comment = ({ review }) => {
  return (
    <li className="mb-2">
      <p className="flex gap-1 items-center font-semibold">
        <FaRegUserCircle/>
        {review.user.name}
        </p>
      <p>{review.comment}</p>
      <small className="text-gray-400">
        Rating: {review.rating}</small>
    </li>
  );
};
export default Comment;