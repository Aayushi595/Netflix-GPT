import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { LanguageProvider } from "../context/LanguageContext";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <LanguageProvider>
      <RouterProvider router={appRouter} />
    </LanguageProvider>
  );
};

export default Body;
