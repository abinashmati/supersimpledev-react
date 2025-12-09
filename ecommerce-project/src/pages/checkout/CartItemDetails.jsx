import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);

    await loadCart(); //after deleting a product from cart we will reload the cart so payment summary and all cart will be reloaded. so that we can see that item is not there in cart anymore
  };

  const updateQuantity = async () => {
    // Switch between true and false for isUpdatingQuantity.
    if (isUpdatingQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: quantity,
      });

      await loadCart();
      /*reload the cart so that the ccart is updated and once cart is updated it will display the updated quantty every  where.*/

      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);

      setQuantity(cartItem.quantity); //again reset the quantity back to the cartItem.quantity when we start updating the quantity
    }
  };

  const handleQuanityOnChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleQuantitykeyDown = async (event) => {
    const keyPressed = event.key;

    if (keyPressed === "Enter") {
      await updateQuantity();
    } else if (keyPressed === "Escape") {
      //update the quantity back to intial and hide the input and hiding is done through the IsUpdatingQuantity state.
      setQuantity(cartItem.quantity);

      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdatingQuantity ? (
              <input
                type="text"
                className="quanity-input"
                value={quantity}
                onChange={handleQuanityOnChange}
                onKeyDown={handleQuantitykeyDown}
              ></input>
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
