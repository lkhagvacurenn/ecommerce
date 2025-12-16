import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../components/buttons/Button";
import Comment from "../components/Comment";
import ProductThumbnail from "../components/ProductThumbnail";
import Counter from "../components/Counter";
import { getProduct, getReviewsByProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import ReviewForm from "../components/forms/ReviewForm";


const Product = () => {
  const { getItem, addItem, updateItem } = useCart();
  const {existing,setExisting} = useState(false);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState({ avgRating: 5, length: 0, reviews: [] });
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const { id } = useParams();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [orderCount, setOrderCount] = useState(1);

  // Load product
  useEffect(() => {
    (async () => {
      try {
        const res = await getProduct(id); // expecting { success, data }
        if (res && (res.success ?? true) && res.data) {
          setProduct(res.data);
          // reset order count when product changes
          setActiveImgIndex(0);
        } else {
          console.warn("getProduct returned no data", res);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      }
    })();
  }, [id]);

  // Load reviews
  useEffect(() => {
    (async () => {
      try {
        const res = await getReviewsByProduct(id); // expecting { success, data }
        if (res && (res.success ?? true)) {
          // If API returns an array of reviews, normalize into the shape used in UI:
          if (Array.isArray(res.data)) {
            const arr = res.data;
            const avg = arr.length ? (arr.reduce((s, r) => s + (r.rating || 0), 0) / arr.length) : 5;
            setReviews({ avgRating: Number(avg.toFixed(1)), length: arr.length, reviews: arr });
          } else if (res.data && typeof res.data === "object") {
            // assume already in shape { avgRating, length, reviews }
            const normalized = {
              avgRating: res.data.avgRating ?? 5,
              length: res.data.length ?? (Array.isArray(res.data.reviews) ? res.data.reviews.length : 0),
              reviews: Array.isArray(res.data.reviews) ? res.data.reviews : []
            };
            setReviews(normalized);
          } else {
            setReviews({ avgRating: 5, length: 0, reviews: [] });
          }
        } else {
          console.warn("getReviewsByProduct returned no data", res);
          setReviews({ avgRating: 5, length: 0, reviews: [] });
        }
      } catch (err) {
        console.error("Failed to load reviews", err);
        setReviews({ avgRating: 5, length: 0, reviews: [] });
      }
    })();
  }, [id]);

  // Check if product already in cart → sync qty
useEffect(() => {
  (async () => {
    try {
      const res = await getItem(id);
      console.log(res.data.isLiked)
      if (res.data.isLiked) {
        setExisting(true);
        setOrderCount(res.data.data.qty);
        console.log(res.data.data.qty);
        console.log(orderCount);
      }
    } catch (err) {
      console.error("Failed to sync cart item", err);
    }
  })();
}, []);


  function handleClick(delta, e) {
    e?.stopPropagation();
    setOrderCount((prev) => {
      const stock = Number(product?.stock ?? Infinity);
      const next = Math.min(Math.max(prev + delta, 1), stock);
      return next;
    });
  }

  if (!product) return <div className="p-4">Loading...</div>;

  // safe values
  const images = Array.isArray(product.images) ? product.images : [];
  const mainImage = images[activeImgIndex] ?? images[0] ?? "";

  // total example (uses newPrice if present)
  const unitPrice = typeof product.newPrice === "number" ? product.newPrice : product.price ?? 0;
  const total = (unitPrice * orderCount).toFixed(2);
  
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-5 my-5 w-full ">
        <div className="flex flex-col sm:flex-row gap-1 items-start justify-center sm:justify-start w-full sm:w-[60%]">
          {images.length > 1 ? (
            <div className="flex sm:flex-col order-2 sm:order-1 sm:h-full gap-1 justify-start w-full sm:w-[20%] ">
              {images.slice(0, 3).map((image, i) => (
                <img
                  onClick={() => {
                    setActiveImgIndex(i);
                  }}
                  className={`sm:h-1/3 object-cover w-[30%] sm:w-full border-2 rounded-md ${activeImgIndex === i ? "border-primaryClr" : ""}`}
                  src={image}
                  alt={`thumb-${i}`}
                  key={i}
                />
              ))}
            </div>
          ) : (
            ""
          )}

          <div className="relative w-full sm:w-[70%] aspect-square h-full order-1 sm:order-2  border rounded-md overflow-hidden">
            <ProductThumbnail img={mainImage} id={product.id || product._id} stock={product.stock} discount={product.discountPercent}/>
          </div>
        </div>

        <div className="h-fit sm:w-[40%] flex flex-col gap-5 p-3 border border-boxBgClr rounded -md">
          <small className="flex justify-between items-start">
            <p className="flex gap-1 items-center">
              <FaStar className="fill-starClr" />
              <span className="font-bold">{reviews.length>0 ? reviews.avgRating : 5}</span>
              <span className="underline">{reviews.length} reviews</span>
            </p>
            <p className="flex flex-col items-end">
              <span className="font-bold text-lg">${unitPrice}</span>
              {product.discountPercent > 0 && <span className="line-through">${product.price}</span>}
            </p>
          </small>
          <small className="flex justify-between items-start gap-2 flex-wrap">
            <div className=" w-full">
              Available sizes:
              <p className="flex gap-1 ">
                {product.sizes.map(size=>(
                <span className="flex rounded-xl bg-boxBgClr min-w-8 min-h-8 p-2 justify-center items-center">{size}</span>
              ))}
              </p>
            </div>
            <div className="w-full">
              Available colors:
              <p className="flex gap-1 ">
                {product.colors.map(color =>(
                <span className="flex rounded-xl bg-boxBgClr min-w-8 min-h-8 p-2 justify-center items-center">{color}</span>
              ))}
              </p>
            </div>
          </small>

          <small className="flex justify-between">
          <Counter
            orderCount={orderCount}
            onClick={handleClick}
            stock={product.stock}
          />            
          <Button 
            onClick={async () => {
            try {
              if(existing)
                await updateItem({ productID: id, qty: orderCount });
              else 
                await addItem({ productID: id, qty: orderCount });
            } catch (err) {
              console.error("Add to cart failed", err);
            }
          }}
          >
            Add to Cart
          </Button>
          </small>

          <small>
            <p className="flex justify-between">
              <span>${product.price ?? 0} x {orderCount}</span>
              <span>{/* placeholder */}</span>
            </p>
            {
              product.discountPercent > 0 && <p className="flex justify-between items-center text-red-500">
              <span>You saving</span>
              <span>{(((product.price ?? 0) - unitPrice) * orderCount).toFixed(2)}</span>
            </p>
            }
            
            <p className="flex justify-between mt-2 items-center border-t-2">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-md">${total}</span>
            </p>
          </small>
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between gap-5">
        <div className="border-t-2 border-boxBgClr sm:w-[60%]">
          <h1 className="font-bold text-lg">{product.title}</h1>
          <p className="text-justify text-sm">{product.description}</p>
          <p className="text-justify text-sm">Brand: {product.brand}</p>

          <h2 className="mt-3 font-bold">Sale performance</h2>
          <ul className="text-sm">
            <li>Stock: <span>{product.stock ?? 0}</span></li>
            <li>Review Count: <span>{reviews.length}</span></li>
            <li>Review Average: <span>{reviews.length>0 ? reviews.avgRating : 5}</span></li>
          </ul>
        </div>

        <ul className="sm:w-[40%] border-t-2 p-2">
          <h2 className="font-bold text-lg">Reviews</h2>
          {
            reviews.length>0 ? 
            reviews.reviews.slice(0, 3).map((review, i) => (
            <Comment key={i} review={review} />
          )) : <p className="text-center p-5 text-blue-500">No reviews yet 🥲</p>
          }
            {isLoggedIn && (
              <ReviewForm
                productID={id}
                onSuccess={async () => {
                  const res = await getReviewsByProduct(id);
                  if (res.success) {
                    const arr = res.data;
                    const avg = arr.length
                      ? arr.reduce((s, r) => s + r.rating, 0) / arr.length
                      : 5;
                    setReviews({
                      avgRating: Number(avg.toFixed(1)),
                      length: arr.length,
                      reviews: arr
                    });
                  }
                }}
              />
            )}
        </ul>
      </div>
    </div>
  );
};

export default Product;
