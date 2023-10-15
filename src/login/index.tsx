import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import { signIn } from "../common/api/AuthAPI";
import LoaderWrapper from "../common/wrappers/LoaderWrapper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(email, password);
      navigate("/");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["login-container"]}>
      <LoaderWrapper loading={isLoading}>
        <div>
          <h2>Login</h2>
          <form className={styles["login-form"]} onSubmit={login}>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </LoaderWrapper>
    </div>
  );
};

export default Login;
