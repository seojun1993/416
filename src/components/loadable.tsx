import type { LazyExoticComponent, FC } from "react";
import { Suspense } from "react";
import Loading from "@/components/loading";
import ErrorBoundary from "@/components/error-boundary";
import Error from "@/components/error";

const Loadable =
  (Component: LazyExoticComponent<FC>) =>
  (props: JSX.IntrinsicAttributes): JSX.Element =>
    (
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Loading />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );

export default Loadable;
