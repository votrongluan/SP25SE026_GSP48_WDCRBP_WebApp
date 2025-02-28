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

  const addCartItem = (employeeId, product) => {
    product.quantity = 1;

    setCart((prevCart) => {
      const employeeCart = prevCart.find(
        (item) => item.employeeId === employeeId
      );

      if (employeeCart) {
        const existingProduct = employeeCart.products.find(
          (item) => item.productId === product.productId
        );

        if (existingProduct) {
          return prevCart.map((item) =>
            item.employeeId === employeeId
              ? {
                  ...item,
                  products: item.products.map((prod) =>
                    prod.productId === product.productId
                      ? { ...prod, quantity: 1 }
                      : prod
                  ),
                }
              : item
          );
        } else {
          return prevCart.map((item) =>
            item.employeeId === employeeId
              ? { ...item, products: [...item.products, product] }
              : item
          );
        }
      } else {
        return [
          ...prevCart,
          { name: product.employee.name, employeeId, products: [product] },
        ];
      }
    });
  };

  const changeQuantity = (employeeId, productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.employeeId === employeeId
          ? {
              ...item,
              products: item.products.map((prod) =>
                prod.productId === productId ? { ...prod, quantity } : prod
              ),
            }
          : item
      )
    );
  };

  const removeCartItem = (employeeId, productId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.employeeId === employeeId
              ? {
                  ...item,
                  products: item.products.filter(
                    (prod) => prod.productId !== productId
                  ),
                }
              : item
          )
          .filter((item) => item.products.length > 0) // remove empty employee entries
    );
  };

  const clearCart = (id) => {
    const newCart = cart.filter((item) => item.employeeId != id);

    setCart(newCart);
  };

  const getCartLength = () => {
    return cart.reduce(
      (total, item) =>
        total +
        item.products.reduce((prodTotal, prod) => prodTotal + prod.quantity, 0),
      0
    );
  };

  const getNameById = (employeeId) => {
    const employeeCart = cart.find((item) => item.employeeId === employeeId);

    return employeeCart.name;
  };

  const calculateTotalPrice = (employeeId) => {
    const employeeCart = cart.find((item) => item.employeeId === employeeId);

    if (!employeeCart) return 0; // If no products for the given employeeId, return 0

    return employeeCart.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const getCart = () => cart;

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        changeQuantity,
        removeCartItem,
        clearCart,
        getCartLength,
        getCart,
        calculateTotalPrice,
        getNameById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
