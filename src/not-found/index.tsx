import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for might be in another castle.</p>
    </div>
  );
};

export default NotFound;
