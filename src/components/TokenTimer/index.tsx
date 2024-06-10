import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { LoginProps, login } from "../../api/login";
import { queryClient } from "../../util/react-query";
import styles from "./token-timer.module.scss";

export function TokenTimer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [tokenExpired, setTokenExpired] = useState(true);

  const { data: infosLogin } = useQuery<LoginProps | undefined>({
    queryFn: login,
    queryKey: ["login-token"],
    staleTime: Infinity,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeElapsed >= 3500) {
      setTokenExpired(true);
    }
  }, [timeElapsed]);

  return (
    <>
      {infosLogin !== undefined && (
        <div className={styles["token-timer"]}>
          <p>Token expira em {3600 - timeElapsed} segundos</p>
          {tokenExpired && <button onClick={() => renewToken()}>Renovar Token</button>}
        </div>
      )}
    </>
  );

  function renewToken() {
    try {
      queryClient.fetchQuery({
        queryFn: login,
        queryKey: ["login-token"],
      });
      setTimeElapsed(0);
      setTokenExpired(false);
    } catch (error) {
      console.error("Erro ao renovar o token:", error);
    }
  }
}
