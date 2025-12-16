import { useState } from "react";
import Button from "../buttons/Button";
import { FaStar } from "react-icons/fa";
import { createReview } from "../../services/api";

const ReviewForm = ({ productID, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("idle"); 
// "idle" | "loading" | "success"
  const [comment, setComment] = useState("");

  async function handleSubmit(e) {
    //e.preventDefault();
     if (status !== "idle") return;
    try {
       setStatus("loading"); 
        const res = await createReview({
        productID,
        rating,
        comment
      });
      if (res.success) {
        setComment("");
        setRating(5);
        onSuccess?.(); // review list refresh
      } else {
        alert(res.message || "Failed to add review");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review");
    } finally {
      setStatus("success");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-xl p-4 flex flex-col gap-3 mt-4"
    >
      <h3 className="font-bold text-lg">Write a review</h3>

      {/* Rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            onClick={() => setRating(i)}
            className={`cursor-pointer ${
              i <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        className="border rounded-lg p-2 w-full min-h-[80px]"
        required
      />

    <Button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={
            status === "success"
            ? "bg-green-500 text-white"
            : ""
        }
        >
        {status === "idle" && "Post Review"}
        {status === "loading" && "Posting..."}
        {status === "success" && "Posted "}
    </Button>

    </form>
  );
};

export default ReviewForm;
