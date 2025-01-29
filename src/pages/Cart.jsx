import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { state, removeItem, updateAmount, clearCart } = useCart();

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Fill it
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {state.cart.map((item) => (
            <div
              key={`${item.id}-${item.color}`}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  Color:{" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full ml-1"
                    style={{ backgroundColor: item.color }}
                  />
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      updateAmount(
                        item.id,
                        item.color,
                        Math.max(1, item.amount - 1)
                      )
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-2 w-8 text-center">{item.amount}</span>
                  <button
                    onClick={() =>
                      updateAmount(item.id, item.color, item.amount + 1)
                    }
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.amount).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id, item.color)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="mt-4 text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${state.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${state.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
