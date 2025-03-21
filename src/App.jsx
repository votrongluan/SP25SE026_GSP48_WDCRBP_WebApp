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
import ContactPage from "./pages/customer/Contact/ContactPage.jsx";
import CartPage from "./pages/customer/Cart/CartPage.jsx";
import HomePage from "./pages/customer/Home/HomePage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import WoodworkerLayout from "./layouts/WoodworkerLayout.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import ScrollToTopAndBottom from "./components/Utility/ScrollToTopAndBottom.jsx";
import CusServiceOrderDetailPage from "./pages/customer/ServiceOrder/ServiceOrderDetail/CusServiceOrderDetailPage.jsx";
import { appColorTheme } from "./config/appconfig.js";
import WoodworkerOrderDetailPage from "./pages/woodworker/ServiceOrder/OldUsage/WoodworkerOrderDetailPage.jsx";
import ProductDetailPage from "./pages/customer/Product/ProductDetail/ProductDetailPage.jsx";
import WoodworkersPage from "./pages/customer/Woodworker/WoodworkerList/WoodworkersPage.jsx";
import WoodworkerDetailPage from "./pages/customer/Woodworker/WoodworkerDetail/WoodworkerDetailPage.jsx";
import DesignsPage from "./pages/customer/Design/DesignList/DesignsPage.jsx";
import DesignDetailPage from "./pages/customer/Design/DesignDetail/DesignDetailPage.jsx";
import PersonalizationRequestPage from "./pages/customer/PersonalizationRequest/PersonalizationRequestPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import ContractPage from "./pages/customer/Contract/ContractPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import ProductsPage from "./pages/customer/Product/ProductList/ProductsPage.jsx";
import CusServiceOrderListPage from "./pages/customer/ServiceOrder/ServiceOrderList/CusServiceOrderListPage.jsx";
import CusGuaranteeOrderListPage from "./pages/customer/GuaranteeOrder/GuaranteeOrderList/CusGuaranteeOrderListPage.jsx";
import CusGuaranteeOrderDetailPage from "./pages/customer/GuaranteeOrder/GuaranteeOrderDetail/CusGuaranteeOrderDetailPage.jsx";
import WWServiceOrderListPage from "./pages/woodworker/ServiceOrder/ServiceOrderList/WWServiceOrderListPage.jsx";
import WWServiceOrderDetailPage from "./pages/woodworker/ServiceOrder/ServiceOrderDetail/WWServiceOrderDetailPage.jsx";
import WWGuaranteeOrderListPage from "./pages/woodworker/GuaranteeOrder/GuaranteeOrderList/WWGuaranteeOrderListPage.jsx";
import WWGuaranteeOrderDetailPage from "./pages/woodworker/GuaranteeOrder/GuaranteeOrderDetail/WWGuaranteeOrderDetailPage.jsx";

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
      app_blue: {
        0: appColorTheme.blue_0,
      },
      app_green: {
        0: appColorTheme.green_0,
      },
      app_red: {
        0: appColorTheme.red_0,
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

          <Route path="service-order">
            <Route index element={<WWServiceOrderListPage />} />
            <Route path=":id" element={<WWServiceOrderDetailPage />} />
          </Route>
          <Route path="guarantee-order">
            <Route index element={<WWGuaranteeOrderListPage />} />
            <Route path=":id" element={<WWGuaranteeOrderDetailPage />} />
          </Route>
        </Route>

        {/* Customer page route */}
        <Route path="cus" element={<CustomerLayout />}>
          <Route index element={<NotFoundPage />} />
          <Route path="dashboard" element={<NotFoundPage />} />
          <Route path="service-order">
            <Route index element={<CusServiceOrderListPage />} />
            <Route path=":id" element={<CusServiceOrderDetailPage />} />
          </Route>
          <Route path="contract">
            <Route index element={<ContractPage />} />
            <Route path=":id" element={<DesignDetailPage />} />
          </Route>
          <Route path="guarantee-order">
            <Route index element={<CusGuaranteeOrderListPage />} />
            <Route path=":id" element={<CusGuaranteeOrderDetailPage />} />
          </Route>
        </Route>

        {/* Guest page route */}
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          {/* Index page route */}
          <Route index element={<HomePage />} />

          <Route path="test" element={<TestPage />} />

          <Route path="personalize" element={<PersonalizationRequestPage />} />

          {/* Auth route */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="contact" element={<ContactPage />} />

          <Route path="product">
            <Route index element={<ProductsPage />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>

          <Route path="woodworker">
            <Route index element={<WoodworkersPage />} />
            <Route path=":id" element={<WoodworkerDetailPage />} />
          </Route>

          <Route path="design">
            <Route index element={<DesignsPage />} />
            <Route path=":id" element={<DesignDetailPage />} />
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
    <Provider store={store}>
      <GlobalProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <ScrollToTopAndBottom />
            <RouterProvider router={router} />
          </ChakraProvider>
        </CartProvider>
      </GlobalProvider>
    </Provider>
  );
}

export default App;
