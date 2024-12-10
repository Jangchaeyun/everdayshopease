import { createBrowserRouter } from "react-router-dom";
import Shop from "./Shop";
import ProductListPage from "./pages/ProductListPage/ProductListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Shop />,
  },
  {
    path: "/womens",
    element: <ProductListPage />,
  },
]);
