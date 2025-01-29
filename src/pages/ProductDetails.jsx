import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { getProduct } from "../Api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setSelectedColor(data.attributes.colors[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { attributes } = product;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: attributes.title,
      price: attributes.price,
      image: attributes.image,
      amount,
      color: selectedColor,
      company: attributes.company,
    };
    addToCart(cartItem, amount, selectedColor);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={attributes.image}
          alt={attributes.title}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{attributes.title}</h1>
          <p className="text-2xl text-gray-700 mb-4">${attributes.price}</p>
          <p className="text-gray-600 mb-6">{attributes.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Colors:</h3>
            <div className="flex space-x-2">
              {attributes.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Amount:</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAmount(Math.max(1, amount - 1))}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span className="text-xl font-semibold">{amount}</span>
              <button
                onClick={() => setAmount(amount + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
