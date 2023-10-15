import { ToastContainer } from "react-toastify";
import { ToDoRoutes } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { AxiosInterceptor } from "./interceptors/AuthInterceptor";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AxiosInterceptor>
          <ToDoRoutes />
        </AxiosInterceptor>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
