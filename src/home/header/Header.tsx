import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { removeToken } from "../../common/api/AuthAPI";

const Header = () => {
  const navigate = useNavigate();
  const logout = (): void => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <FontAwesomeIcon icon={faBars} className={styles.icon} />
      </div>
      <div className={styles.right}>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className={styles.icon}
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Header;
