import { useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import CheckMarkIcon from "../../assets/images/icons/checkmark.png";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setshowAddedMessage] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity: quantity,
    });

    await loadCart(); //reload the cart data with the new saved quantity

    setshowAddedMessage(true); // we set it to true so that we can show the added message with green tick

    setTimeout(() => {
      setshowAddedMessage(false);
      //after 3 seconds we will update the state to false again so that we will not show the added taxt with check mark. we will only dipaly it for 3 seconds once a product it added to cart by the Add to Cart button click
    }, 3000);
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);

    setQuantity(quantitySelected);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
      >
        <img src={CheckMarkIcon} />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
