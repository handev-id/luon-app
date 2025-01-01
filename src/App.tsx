import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import User from "./pages";
import moment from "moment";

const App = () => {
  moment.locale("id");

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "",
              element: <User />,
            },
            {
              path: "/info",
              element: <User />,
            },
            {
              path: "/form",
              element: <User />,
            },
          ],
        },
      ])}
    />
  );
};

export default App;
