
const ProductCard = ({d}) => {
    const price = Number(d.price ?? 0);
    const discount = Number(d.discountPercentage ?? 0);
    const newPrice =
    discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price;

    const count = d.reviews.length;
    const starTotal = d.reviews.reduce((acc, r) => acc + (r.rating ?? 0), 0);
    const avgStar = count ? (starTotal / count).toFixed(1) : "5.0";
   
  return (
    <div className="bg-white w-60 p-2">
        <div className=" w-full h-60 p-2 rounded-md bg-boxBgClr">
            <button className="flex justify-self-end p-2 rounded-2xl bg-white">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33329 7.33325C5.70149 7.33325 5.99996 7.63172 5.99996 7.99992C5.99996 9.10449 6.89539 9.99992 7.99996 9.99992C9.10453 9.99992 9.99996 9.10449 9.99996 7.99992C9.99996 7.63172 10.2984 7.33325 10.6666 7.33325C11.0348 7.33325 11.3333 7.63172 11.3333 7.99992C11.3333 9.84086 9.8409 11.3333 7.99996 11.3333C6.15902 11.3333 4.66663 9.84086 4.66663 7.99992C4.66663 7.63172 4.9651 7.33325 5.33329 7.33325Z" fill="#4B5563"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3333 4.66675H12.7584C13.8077 4.66675 14.6786 5.47765 14.7534 6.52426L15.1275 11.7626C15.2654 13.6922 13.7371 15.3334 11.8027 15.3334H4.19722C2.26275 15.3334 0.734525 13.6922 0.872351 11.7626L1.24652 6.52426C1.32128 5.47765 2.19215 4.66675 3.24143 4.66675H4.66661V4.00008C4.66661 2.15914 6.159 0.666748 7.99994 0.666748C9.84088 0.666748 11.3333 2.15914 11.3333 4.00008V4.66675ZM5.99994 4.66675H9.99994V4.00008C9.99994 2.89551 9.10451 2.00008 7.99994 2.00008C6.89537 2.00008 5.99994 2.89551 5.99994 4.00008V4.66675ZM3.24143 6.00008C2.89167 6.00008 2.60138 6.27037 2.57646 6.61925L2.20231 11.8576C2.1196 13.0153 3.03653 14.0001 4.19722 14.0001H11.8027C12.9634 14.0001 13.8803 13.0153 13.7976 11.8576L13.4234 6.61925C13.3985 6.27037 13.1082 6.00008 12.7584 6.00008H3.24143Z" fill="#4B5563"/>
                </svg>
            </button>
            <img className="mx-auto w-[80%] object-cover " src={d.images[0]} alt="d.title"/>
        </div>
        <article className="">
            <div className="flex justify-between text-[14px] gap-1">
                <p className="flex flex-col w-full max-w-[70%]">
                    <strong className="font-bold truncate ">
                        {d.title}
                    </strong>
                    <span className="text-spanClr">
                        {d.category}
                    </span>
                </p>
                 <p className="flex flex-col">
                    <strong>
                        ${newPrice}
                    </strong>
                    <span className="text-spanClr line-through">
                        ${d.price}
                    </span>
                </p>
            </div>
            <div className="flex gap-1 items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.99001 2.67508C9.36334 1.77758 10.6367 1.77758 11.01 2.67508L12.745 6.84758L17.2483 7.20841C18.2183 7.28591 18.6117 8.49591 17.8725 9.12924L14.4417 12.0684L15.4892 16.4626C15.715 17.4092 14.6858 18.1567 13.8558 17.6501L10 15.2951L6.14417 17.6501C5.31417 18.1567 4.28501 17.4084 4.51084 16.4626L5.55834 12.0684L2.12751 9.12924C1.38834 8.49591 1.78167 7.28591 2.75167 7.20841L7.25501 6.84758L8.99001 2.67508Z" fill="#FBBF24"/>
                </svg>
                <p>{avgStar}</p>
                <p>({count})</p>
            </div>
        </article>
    </div>
  )
}

export default ProductCard