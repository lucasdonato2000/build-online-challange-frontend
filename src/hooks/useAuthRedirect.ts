import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { checkAuth } from "../store/actions/authActions";

const useAuthRedirect = (redirectPath: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthChecked, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkAuth());
    } else {
      if (isAuthenticated && redirectPath === "/") {
        router.push("/contactDashboard");
      } else if (!isAuthenticated && redirectPath !== "/") {
        router.push("/");
      }
    }
  }, [isAuthChecked, isAuthenticated, redirectPath, router, dispatch]);

  return { isAuthChecked, isAuthenticated };
};

export default useAuthRedirect;
