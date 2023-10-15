import { Circles } from "react-loader-spinner";

function LoaderWrapper({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) {
  return (
    <>{loading ? <Circles color="green" ariaLabel="loading" /> : children}</>
  );
}

export default LoaderWrapper;
