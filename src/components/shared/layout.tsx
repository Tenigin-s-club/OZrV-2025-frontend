import { Outlet } from "react-router-dom";
import Container from "../ui/container";

import { PropsWithChildren, Suspense } from "react";
import Loader from "./Loader/Loader";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <Container className="w-full h-[100vh] flex items-center justify-center">
          <Loader />
        </Container>
      }
    >
      <div className="fixed z-[1000] inset-0">{children || <Outlet />}</div>
    </Suspense>
  );
};

export default Layout;
