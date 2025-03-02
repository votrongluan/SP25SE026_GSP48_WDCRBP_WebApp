import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NotFoundPage from "./pages/customer/Unauth/NotFoundPage.jsx";
import ErrorPage from "./pages/customer/Unauth/ErrorPage.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AuthPage from "./pages/customer/Auth/AuthPage.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import UnauthorizedPage from "./pages/customer/Unauth/UnauthorizedPage.jsx";
import { useEffect } from "react";
import AboutPage from "./pages/customer/About/AboutPage.jsx";
import ContactPage from "./pages/customer/Contact/ContactPage.jsx";
import ProductsPage from "./pages/customer/Product/ProductsPage.jsx";
import CartPage from "./pages/customer/Cart/CartPage.jsx";
import HomePage from "./pages/customer/Home/HomePage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import WoodworkerLayout from "./layouts/WoodworkerLayout.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import ScrollToTopAndBottom from "./components/Utility/ScrollToTopAndBottom.jsx";
import CustomerOrderDetailPage from "./pages/customer/OrderDetail/CustomerOrderDetailPage.jsx";
import { appColorTheme } from "./data/globalData.js";
import WoodworkerOrderDetailPage from "./pages/woodworker/OrderDetail/WoodworkerOrderDetailPage.jsx";
import ProductDetailPage from "./pages/customer/Product/ProductDetailPage.jsx";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const theme = extendTheme({
    colors: {
      app_brown: {
        0: appColorTheme.brown_0,
        1: appColorTheme.brown_1,
        2: appColorTheme.brown_2,
      },
      app_white: {
        0: appColorTheme.white_0,
      },
      app_black: {
        0: appColorTheme.black_0,
      },
      app_grey: {
        0: appColorTheme.grey_0,
        1: appColorTheme.grey_1,
        2: appColorTheme.grey_2,
      },
    },
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Admin page route */}
        <Route path="ad" element={<AdminLayout />}></Route>

        {/* Woodworker page route */}
        <Route path="ww" element={<WoodworkerLayout />}>
          <Route index element={<NotFoundPage />} />
          <Route path="dashboard" element={<NotFoundPage />} />
          <Route path="order-detail" element={<WoodworkerOrderDetailPage />} />
        </Route>

        {/* Customer page route */}
        <Route path="cus" element={<CustomerLayout />}>
          <Route index element={<NotFoundPage />} />
          <Route path="dashboard" element={<NotFoundPage />} />
          <Route path="order-detail" element={<CustomerOrderDetailPage />} />
        </Route>

        {/* Guest page route */}
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          {/* Index page route */}
          <Route index element={<HomePage />} />

          {/* Auth route */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          <Route path="products">
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>

          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* Unauthorized route */}
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* Not found route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <GlobalProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <ScrollToTopAndBottom />
            <RouterProvider router={router} />
          </ChakraProvider>
        </CartProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
