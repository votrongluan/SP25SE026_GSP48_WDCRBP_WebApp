import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const CartContext = createContext({});

// Maximum allowed quantity per cart item
const MAX_QUANTITY = 4;

export const CartProvider = ({ children }) => {
  // Initialize cart with structure { designs: {}, products: {} }
  const [cart, setCart] = useState(() => {
    const cookieCart = Cookies.get("cart");
    return cookieCart ? JSON.parse(cookieCart) : { designs: {}, products: {} };
  });

  // Save to cookies whenever cart changes
  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  // Add design to cart
  const addDesignToCart = (designItem) => {
    setCart((prevCart) => {
      const woodworkerId = designItem.woodworkerId;

      // Deep clone the current cart to avoid mutation issues
      const newCart = JSON.parse(JSON.stringify(prevCart));

      if (!newCart.designs[woodworkerId]) {
        newCart.designs[woodworkerId] = [];
      }

      // Check if the same variant already exists in cart
      const existingItemIndex = newCart.designs[woodworkerId].findIndex(
        (item) => item.designIdeaVariantId === designItem.designIdeaVariantId
      );

      if (existingItemIndex >= 0) {
        // Increment quantity if item exists, but respect the maximum limit
        const currentQuantity =
          newCart.designs[woodworkerId][existingItemIndex].quantity;
        const newQuantity = Math.min(
          currentQuantity + designItem.quantity,
          MAX_QUANTITY
        );
        newCart.designs[woodworkerId][existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item with quantity respecting the maximum limit
        designItem.quantity = Math.min(designItem.quantity, MAX_QUANTITY);
        newCart.designs[woodworkerId].push(designItem);
      }

      return newCart;
    });
  };

  // Remove design from cart
  const removeDesignFromCart = (woodworkerId, designVariantId) => {
    setCart((prevCart) => {
      const newCart = JSON.parse(JSON.stringify(prevCart));

      if (newCart.designs[woodworkerId]) {
        newCart.designs[woodworkerId] = newCart.designs[woodworkerId].filter(
          (item) => item.designIdeaVariantId !== designVariantId
        );

        // Remove woodworker entry if no more items
        if (newCart.designs[woodworkerId].length === 0) {
          delete newCart.designs[woodworkerId];
        }
      }

      return newCart;
    });
  };

  // Change quantity of a design in cart
  const changeDesignQuantity = (woodworkerId, designVariantId, newQuantity) => {
    // Enforce maximum quantity limit
    const limitedQuantity = Math.min(newQuantity, MAX_QUANTITY);

    setCart((prevCart) => {
      const newCart = JSON.parse(JSON.stringify(prevCart));

      if (newCart.designs[woodworkerId]) {
        const itemIndex = newCart.designs[woodworkerId].findIndex(
          (item) => item.designIdeaVariantId === designVariantId
        );

        if (itemIndex >= 0) {
          newCart.designs[woodworkerId][itemIndex].quantity = limitedQuantity;
        }
      }

      return newCart;
    });
  };

  // Get total number of items in cart (designs + products)
  const getCartItemCount = () => {
    let count = 0;

    // Count design items
    Object.values(cart.designs).forEach((woodworkerItems) => {
      woodworkerItems.forEach((item) => {
        count += item.quantity;
      });
    });

    // Count product items (future implementation)
    Object.values(cart.products).forEach((woodworkerItems) => {
      woodworkerItems.forEach((item) => {
        count += item.quantity;
      });
    });

    return count;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addDesignToCart,
        removeDesignFromCart,
        changeDesignQuantity,
        getCartItemCount,
        MAX_QUANTITY, // Expose the maximum quantity to consumers
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
