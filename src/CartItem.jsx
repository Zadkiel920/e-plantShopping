import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeItem } from "../CartSlice";

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal for each item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1)); // remove $ sign
    return price * item.quantity;
  };

  // Calculate total amount of cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      return acc + calculateTotalCost(item);
    }, 0);
  };

  // Continue Shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Checkout placeholder
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} width={80} />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: {item.cost}</p>

                  <div className="qty-section">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>

                  <p>
                    Subtotal: $
                    {calculateTotalCost(item).toFixed(2)}
                  </p>

                  <button className="remove-btn" onClick={() => handleRemove(item)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3>Total Amount: ${calculateTotalAmount().toFixed(2)}</h3>

          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartItem;
