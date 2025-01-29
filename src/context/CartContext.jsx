import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, amount, color } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === product.id && item.color === color
      );

      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, amount: item.amount + amount }
            : item
        );
        return { ...state, cart: updatedCart };
      }

      const newItem = { ...product, amount, color };
      return { ...state, cart: [...state.cart, newItem] };
    }
    case "REMOVE_ITEM": {
      const updatedCart = state.cart.filter(
        (item) =>
          !(
            item.id === action.payload.id && item.color === action.payload.color
          )
      );
      return { ...state, cart: updatedCart };
    }
    case "UPDATE_AMOUNT": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? { ...item, amount: action.payload.amount }
          : item
      );
      return { ...state, cart: updatedCart };
    }
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const totalItems = state.cart.reduce(
      (total, item) => total + item.amount,
      0
    );
    const totalAmount = state.cart.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    const newState = { ...state, totalItems, totalAmount };
    localStorage.setItem("cart", JSON.stringify(newState));
  }, [state.cart]);

  const addToCart = (product, amount, color) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, amount, color } });
  };

  const removeItem = (id, color) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, color } });
  };

  const updateAmount = (id, color, amount) => {
    dispatch({ type: "UPDATE_AMOUNT", payload: { id, color, amount } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeItem, updateAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
