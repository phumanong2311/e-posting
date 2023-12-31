import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppProviderCtx } from ".";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { data } = useAppProviderCtx();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.user) {
      navigate("/login");
    }
  }, [data.user]);

  return data.user ? children : null;
};
