import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const cookieCart = Cookies.get("cart");
    return cookieCart ? JSON.parse(cookieCart) : [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      Cookies.set("cart", JSON.stringify(cart), { expires: 5 });
    } else {
      Cookies.remove("cart");
    }
  }, [cart]);

  const addDesignToCart = (design) => {
    setCart((prevCart) => {
      const woodworkerCart = prevCart.find(
        (item) => item.woodworkerId === design.woodworkerId
      );

      if (woodworkerCart) {
        return prevCart.map((item) =>
          item.woodworkerId === design.woodworkerId
            ? {
                ...item,
                designs: [...(item.designs || []), design],
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            woodworkerId: design.woodworkerId,
            designs: [design],
            products: [],
          },
        ];
      }
    });
  };

  const addProductToCart = (product) => {
    setCart((prevCart) => {
      const woodworkerCart = prevCart.find(
        (item) => item.woodworkerId === product.woodworkerId
      );

      if (woodworkerCart) {
        return prevCart.map((item) =>
          item.woodworkerId === product.woodworkerId
            ? {
                ...item,
                products: [...(item.products || []), product],
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            woodworkerId: product.woodworkerId,
            designs: [],
            products: [product],
          },
        ];
      }
    });
  };

  const removeCartItem = (woodworkerId, itemId, itemType) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.woodworkerId === woodworkerId) {
            if (itemType === "design") {
              return {
                ...item,
                designs: item.designs.filter(
                  (design) => design.designId !== itemId
                ),
              };
            } else {
              return {
                ...item,
                products: item.products.filter(
                  (product) => product.id !== itemId
                ),
              };
            }
          }
          return item;
        })
        .filter(
          (item) =>
            (item.designs && item.designs.length > 0) ||
            (item.products && item.products.length > 0)
        )
    );
  };

  const clearCart = (woodworkerId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.woodworkerId !== woodworkerId)
    );
  };

  const getCartLength = () => {
    return cart.reduce(
      (total, item) =>
        total + (item.designs?.length || 0) + (item.products?.length || 0),
      0
    );
  };

  const calculateTotalPrice = (woodworkerId) => {
    const woodworkerCart = cart.find(
      (item) => item.woodworkerId === woodworkerId
    );

    if (!woodworkerCart) return 0;

    const designsTotal =
      woodworkerCart.designs?.reduce(
        (total, design) => total + design.prices.price,
        0
      ) || 0;

    const productsTotal =
      woodworkerCart.products?.reduce(
        (total, product) => total + product.price,
        0
      ) || 0;

    return designsTotal + productsTotal;
  };

  const getCart = () => cart;

  const getCartByWoodworker = (woodworkerId) => {
    return (
      cart.find((item) => item.woodworkerId === woodworkerId) || {
        woodworkerId,
        designs: [],
        products: [],
      }
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addDesignToCart,
        addProductToCart,
        removeCartItem,
        clearCart,
        getCartLength,
        getCart,
        getCartByWoodworker,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
