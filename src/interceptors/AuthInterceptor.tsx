import React from "react";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkToken, getToken, removeToken } from "../common/api/AuthAPI";

const instance = axios.create({
  baseURL: "ToDoList-env.eba-amqimvmx.us-east-1.elasticbeanstalk.com",
});

export const AxiosInterceptor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfigured, setConfigured] = useState(false);
  const checkUserProfile = async (): Promise<void> => {
    try {
      await checkToken();
    } catch {
      removeToken();
    }
  };

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (request: InternalAxiosRequestConfig<any>) => {
        const token = getToken();
        if (token) {
          request.headers["Authorization"] = "Bearer " + token;
        } else {
          delete request.headers["Authorization"];
        }
        return request;
      }
    );

    const responseInterceptor = instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 403 && navigate) {
            navigate("/login");
            removeToken();
          }
          toast.error(`${error.response.data.message}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        return Promise.reject(error);
      }
    );

    setConfigured(true);
    if (location.pathname !== "/login") {
      checkUserProfile();
    }
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return <>{isConfigured && children}</>;
};

export default instance;
