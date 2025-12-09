import { NavLink, useNavigate, useSearchParams } from "react-router";

import logoWhite from "../assets/images/logo-white.png";
import MobilelogoWhite from "../assets/images/mobile-logo-white.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";

import "./header.css";
import { useState } from "react";

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [searchText, setSearchText] = useState(search || "");
  // || '' is a shortcut. It means if searchText does not exist
  // it will use a default value of ''.

  let totalQuantity = 0;

  cart &&
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    });

  const handleSearchOnChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchButtonClick = () => {
    navigate(`/?search=${searchText}`);
    console.log(searchText);
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={MobilelogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchOnChange}
        />

        <button className="search-button" onClick={handleSearchButtonClick}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
