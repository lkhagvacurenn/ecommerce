export function calculatePrice(price,discount,count){
    const newPrice =  discount > 0 ? (price - (price * discount) / 100) : price;
    const totalPrice =(price * count);
    const totalNewPrice = (newPrice * count);
    const saving = (totalPrice -totalNewPrice);
    return {
        newPrice: newPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        totalNewPrice: totalNewPrice.toFixed(2),
        saving: saving.toFixed(2)
    }
}