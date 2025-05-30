import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import NotFoundPage from "./pages/general/StatusPage/NotFoundPage.jsx";
import ErrorPage from "./pages/general/StatusPage/ErrorPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AuthPage from "./pages/general/Auth/AuthPage.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import UnauthorizedPage from "./pages/general/StatusPage/UnauthorizedPage.jsx";
import { useEffect } from "react";
import ContactPage from "./pages/general/Contact/ContactPage.jsx";
import CartPage from "./pages/customer/Cart/ManagePage/CartPage.jsx";
import HomePage from "./pages/general/Home/HomePage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import WoodworkerLayout from "./layouts/WoodworkerLayout.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import ScrollToTopAndBottom from "./components/Utility/ScrollToTopAndBottom.jsx";
import { appColorTheme } from "./config/appconfig.js";
import ProductDetailPage from "./pages/general/Product/ProductDetail/ProductDetailPage.jsx";
import WoodworkersPage from "./pages/general/Woodworker/WoodworkerList/WoodworkersPage.jsx";
import WoodworkerDetailPage from "./pages/general/Woodworker/WoodworkerDetail/WoodworkerDetailPage.jsx";
import DesignsPage from "./pages/general/Design/DesignList/DesignsPage.jsx";
import DesignDetailPage from "./pages/general/Design/DesignDetail/DesignDetailPage.jsx";
import PersonalizationRequestPage from "./pages/customer/PersonalizationRequest/PersonalizationRequestPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import TestPage from "./pages/TestPage.jsx";
import ProductsPage from "./pages/general/Product/ProductList/ProductsPage.jsx";
import WWServiceOrderListPage from "./pages/woodworker/ServiceOrder/ServiceOrderList/WWServiceOrderListPage.jsx";
import WWRegister from "./pages/general/Auth/WWRegister.jsx";
import Pricing from "./pages/general/Pricing/Pricing.jsx";
import CustomerProfilePage from "./pages/customer/Profile/ManagePage/CustomerProfilePage.jsx";
import DesignManagementListPage from "./pages/woodworker/DesignManagement/DesignList/DesignManagementListPage.jsx";
import ProductManagementListPage from "./pages/woodworker/ProductManagement/ProductList/ProductManagementListPage.jsx";
import PostManagementListPage from "./pages/woodworker/PostManagement/PostList/PostManagementListPage.jsx";
import ServiceConfiguration from "./pages/woodworker/ServiceConfiguration/ServiceConfiguration.jsx";
import SuccessPage from "./pages/general/StatusPage/SuccessPage.jsx";
import WWRegistrationManagementListPage from "./pages/admin/WWRegistrationManagement/RegistrationList/WWRegistrationManagementListPage.jsx";
import WWComplaintManagementPage from "./pages/woodworker/ComplaintManagement/ComplaintList/WWComplaintManagementPage.jsx";
import ReviewManagementListPage from "./pages/woodworker/ReviewManagement/ReviewList/ReviewManagementListPage.jsx";
import WWWalletPage from "./pages/woodworker/WalletManagement/WalletList/WWWalletPage.jsx";
import Logout from "./pages/general/Auth/Logout.jsx";
import WoodworkerProfileManagementPage from "./pages/woodworker/ProfileManagement/ProfilePage/ManagePage/WoodworkerProfileManagementPage.jsx";
import CustomerComplaintPage from "./pages/customer/ComplaintManagement/ComplaintList/CustomerComplaintPage.jsx";
import CustomerWalletPage from "./pages/customer/WalletManagement/WalletList/CustomerWalletPage.jsx";
import WoodworkerWelcomePage from "./pages/woodworker/Welcome/WoodworkerWelcomePage.jsx";
import PaymentSuccessPage from "./pages/general/PaymentSuccess/PaymentSuccessPage.jsx";
import AdminWelcomePage from "./pages/admin/Welcome/AdminWelcomePage.jsx";
import WWServiceOrderDetailPage from "./pages/woodworker/ServiceOrder/ServiceOrderDetail/MainPage/WWServiceOrderDetailPage.jsx";
import CusServiceOrderListPage from "./pages/customer/ServiceOrder/ServiceOrderList/CusServiceOrderListPage.jsx";
import CusServiceOrderDetailPage from "./pages/customer/ServiceOrder/ServiceOrderDetail/MainPage/CusServiceOrderDetailPage.jsx";
import ContractPage from "./pages/general/Contract/ContractPage.jsx";
import TermsPage from "./pages/general/Terms/TermsPage.jsx";
import GuaranteeRequestPage from "./pages/customer/GuaranteeRequest/GuaranteeRequestPage.jsx";
import CusGuaranteeOrderListPage from "./pages/customer/GuaranteeOrder/GuaranteeOrderList/CusGuaranteeOrderListPage.jsx";
import CusGuaranteeOrderDetailPage from "./pages/customer/GuaranteeOrder/GuaranteeOrderDetail/MainPage/CusGuaranteeOrderDetailPage.jsx";
import WWGuaranteeOrderListPage from "./pages/woodworker/GuaranteeOrder/GuaranteeOrderList/WWGuaranteeOrderListPage.jsx";
import WWGuaranteeOrderDetailPage from "./pages/woodworker/GuaranteeOrder/GuaranteeOrderDetail/MainPage/WWGuaranteeOrderDetailPage.jsx";
import StaffWelcomePage from "./pages/staff/Welcome/StaffWelcomePage.jsx";
import StaffLayout from "./layouts/StaffLayout.jsx";
import CusReviewManagementPage from "./pages/staff/ReviewManagement/ReviewList/CusReviewManagementPage.jsx";
import ServicePackUpgradeGuide from "./pages/general/Pricing/ServicePackUpgradeGuide.jsx";
import WWResponseManagementPage from "./pages/staff/ResponseManagement/ResponseList/WWResponseManagementPage.jsx";
import StaffComplaintManagementPage from "./pages/staff/ComplaintManagement/ComplaintList/StaffComplaintManagementPage.jsx";
import ConfigurationManagementPage from "./pages/admin/ConfigurationManagement/ConfigurationManagementPage.jsx";
import PaymentManagementPage from "./pages/admin/PaymentManagement/PaymentManagementPage.jsx";
import AdminProfilePage from "./pages/admin/Profile/ManagePage/AdminProfilePage.jsx";
import StaffProfilePage from "./pages/staff/Profile/ManagePage/StaffProfilePage.jsx";
import ModeratorLayout from "./layouts/ModeratorLayout.jsx";
import ModeratorWelcomePage from "./pages/moderator/Welcome/ModeratorWelcomePage.jsx";
import ModeratorProfilePage from "./pages/moderator/Profile/ManagePage/ModeratorProfilePage.jsx";
import WoodworkerPerformancePage from "./pages/moderator/WoodworkerPerformance/ManagePage/WoodworkerPerformancePage.jsx";
import ServiceDepositManagement from "./pages/admin/ServiceDepositManagement/ServiceDepositManagement.jsx";
import DashboardPage from "./pages/admin/Dashboard/DashboardPage.jsx";
import ServicePackManagementPage from "./pages/admin/ServicePackManagement/ServicePackManagementPage.jsx";
import AdminComplaintManagementPage from "./pages/admin/ComplaintManagement/ComplaintList/AdminComplaintManagementPage.jsx";
import UserManagementPage from "./pages/admin/UserManagement/MainPage/UserManagementPage.jsx";
import WWPerformanceDetailPage from "./pages/moderator/WoodworkerPerformance/DetailPage/WWPerformanceDetailPage.jsx";

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
        <Route path="logout" element={<Logout />} />

        {/* Admin page route */}
        <Route path="ad" element={<AdminLayout />}>
          <Route index element={<AdminWelcomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="ww-registration"
            element={<WWRegistrationManagementListPage />}
          />
          <Route path="config" element={<ConfigurationManagementPage />} />
          <Route path="payment" element={<PaymentManagementPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="deposit" element={<ServiceDepositManagement />} />
          <Route path="pack" element={<ServicePackManagementPage />} />
          <Route path="complaint" element={<AdminComplaintManagementPage />} />
          <Route path="user" element={<UserManagementPage />} />
        </Route>

        {/* Staff page route */}
        <Route path="staff" element={<StaffLayout />}>
          <Route index element={<StaffWelcomePage />} />
          <Route path="review" element={<CusReviewManagementPage />} />
          <Route path="response" element={<WWResponseManagementPage />} />
          <Route path="complaint" element={<StaffComplaintManagementPage />} />
          <Route path="profile" element={<StaffProfilePage />} />
        </Route>

        {/* Moderator page route */}
        <Route path="mod" element={<ModeratorLayout />}>
          <Route index element={<ModeratorWelcomePage />} />

          <Route path="performance">
            <Route index element={<WoodworkerPerformancePage />} />
            <Route path=":id" element={<WWPerformanceDetailPage />} />
          </Route>

          <Route path="profile" element={<ModeratorProfilePage />} />
        </Route>

        {/* Woodworker page route */}
        <Route path="ww" element={<WoodworkerLayout />}>
          <Route index element={<WoodworkerWelcomePage />} />

          <Route path="design" element={<DesignManagementListPage />} />
          <Route path="product" element={<ProductManagementListPage />} />
          <Route path="post" element={<PostManagementListPage />} />
          <Route path="service" element={<ServiceConfiguration />} />
          <Route path="complaint" element={<WWComplaintManagementPage />} />
          <Route path="review" element={<ReviewManagementListPage />} />
          <Route path="wallet" element={<WWWalletPage />} />
          <Route path="profile" element={<WoodworkerProfileManagementPage />} />

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
          <Route path="profile" element={<CustomerProfilePage />} />
          <Route path="complaint" element={<CustomerComplaintPage />} />
          <Route path="wallet" element={<CustomerWalletPage />} />
          <Route path="service-order">
            <Route index element={<CusServiceOrderListPage />} />
            <Route path=":id" element={<CusServiceOrderDetailPage />} />
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

          {/* Guard route */}
          <Route path="personalization">
            <Route path=":id" element={<PersonalizationRequestPage />} />
          </Route>

          <Route path="guarantee" element={<GuaranteeRequestPage />}>
            <Route path=":id" element={<GuaranteeRequestPage />} />
          </Route>

          <Route path="contract">
            <Route path=":id" element={<ContractPage />} />
          </Route>

          {/* Normal route */}
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="ww-register" element={<WWRegister />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="upgrade-guide" element={<ServicePackUpgradeGuide />} />
          <Route path="success" element={<SuccessPage />} />

          <Route path="test" element={<TestPage />} />

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

          <Route path="terms" element={<TermsPage />} />

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
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <ScrollToTopAndBottom />
            <RouterProvider router={router} />
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
