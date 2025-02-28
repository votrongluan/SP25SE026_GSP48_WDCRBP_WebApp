import { createContext, useEffect, useState } from "react";
import axios from "../api/axios.js";
import { mockProducts } from "../data/globalData.js";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    fetch("https://66fa49f8afc569e13a9b0fe1.mockapi.io/order/1") // Replace with your actual MockAPI endpoint
      .then((response) => response.json())
      .then((data) => {
        setOrderId(data.orderId);
      })
      .catch((err) => {
        console.error("Error fetching the order ID:", err);
      });

    axios
      .get("/Product/GetAllProducts")
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
        setProducts(mockProducts);
      });
  }, []);

  const incrementOrderId = () => {
    // Increment the current order ID
    if (orderId !== null) {
      const newOrderId = orderId + 1;

      // Update the order ID in MockAPI
      fetch("https://66fa49f8afc569e13a9b0fe1.mockapi.io/order/1", {
        // Replace with your actual MockAPI endpoint
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: newOrderId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setOrderId(data.orderId); // Update state with the new order ID
        })
        .catch((err) => {
          console.error("Error incrementing the order ID:", err);
        });
    }
  };

  return (
    <GlobalContext.Provider value={{ products, orderId, incrementOrderId }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
