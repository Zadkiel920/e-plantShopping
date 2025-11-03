import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice";     // ✅ adjust path if needed
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);

  // ✅ Given plant data
  const plantsArray = [
    {
      category: "Indoor Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://images.unsplash.com/photo-1587502537228-ec47cf01d46c?auto=format&fit=crop&w=400&q=80",
          description: "Easy to care, air purifier.",
          cost: "$20",
        },
        {
          name: "Peace Lily",
          image:
            "https://images.unsplash.com/photo-1524592714635-d77511a4834c?auto=format&fit=crop&w=400&q=80",
          description: "Elegant plant with white blooms.",
          cost: "$25",
        },
      ],
    },
    {
      category: "Outdoor Plants",
      plants: [
        {
          name: "Rose",
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
          description: "Colorful and fragrant.",
          cost: "$15",
        },
        {
          name: "Lavender",
          image:
            "https://images.unsplash.com/photo-1581349437898-cebbe5f2879d?auto=format&fit=crop&w=400&q=80",
          description: "Beautiful aroma.",
          cost: "$18",
        },
      ],
    },
  ];

  // ✅ Handles adding to cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant)); // send to cart slice

    // Mark as added for button UI
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-container">
      <h1>Available Plants</h1>

      <div className="product-grid">
        {plantsArray.map((category, i) => (
          <div key={i}>
            <h2 className="category-title">{category.category}</h2>

            <div className="category-grid">
              {category.plants.map((plant, j) => (
                <div key={j} className="product-card">
                  <h3>{plant.name}</h3>

                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="product-image"
                  />

                  <p>{plant.description}</p>
                  <p className="cost">Cost: {plant.cost}</p>

                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? "Added!" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
