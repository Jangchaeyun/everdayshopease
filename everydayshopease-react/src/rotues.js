import { createBrowserRouter } from "react-router-dom";
import Shop from "./Shop";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductDetails from "./pages/ProductDetailPage/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopApplicationWrapper />,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/women",
        element: <ProductListPage categoryType={"WOMEN"} />,
      },
      {
        path: "/men",
        element: <ProductListPage categoryType={"MEN"} />,
      },
      {
        path: "/kid",
        element: <ProductListPage categoryType={"KIDS"} />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
    ],
  },
]);
