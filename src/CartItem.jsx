import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      const numericCost = parseFloat(item.cost.replace("$", ""));
      totalAmount += item.quantity * numericCost;
    });
    return totalAmount;
  };

  const handleContinueShopping = (e) => {};

  const handleIncrement = (item) => {
    const updatedItem = {
      ...item,
      quantity: item.quantity + 1,
    };
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
      console.log("Item eliminado porque llegó a 0");
    } else {
      // Si no, restamos 1 a la cantidad
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };
      dispatch(updateQuantity(updatedItem));
      console.log("Cantidad actualizada");
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    console.log("borrado", cart);
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace("$", ""));
    const itemTotalCost = numericCost * item.quantity;
    return itemTotalCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => onContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => handleCheckoutShopping()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
