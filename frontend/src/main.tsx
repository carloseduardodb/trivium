import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={routes} />);
} else {
  console.error("Elemento com id 'root' não encontrado.");
}
