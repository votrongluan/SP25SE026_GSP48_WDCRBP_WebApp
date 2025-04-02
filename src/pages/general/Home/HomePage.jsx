import { Box } from "@chakra-ui/react";
import DesignsPage from "../Design/DesignList/DesignsPage";
import ProductsPage from "../Product/ProductList/ProductsPage";
import WoodworkersPage from "../Woodworker/WoodworkerList/WoodworkersPage";

export default function HomePage() {
  return (
    <>
      <ProductsPage />
      <Box height="40px" />
      <DesignsPage />
      <Box height="40px" />
      <WoodworkersPage />
    </>
  );
}
