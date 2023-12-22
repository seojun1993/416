import type { LazyExoticComponent, FC } from "react";
import { Suspense } from "react";
import Loading from "@/components/common/loading";
import Error from "@/components/common/error";
import ErrorBoundary from "@/components/common/error-boundary";

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
