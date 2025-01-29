import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { state } = useCart();

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Comfy Store
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/products" className="hover:text-gray-300">
              Products
            </Link>
            <Link to="/cart" className="relative hover:text-gray-300">
              <ShoppingCart className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
