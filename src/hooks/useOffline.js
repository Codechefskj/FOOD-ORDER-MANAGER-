import { useEffect, useState } from "react";

const useOffline = () => {
  const [offline, setOffline] = useState(
    !navigator.onLine
  );

  useEffect(() => {
    const onlineHandler = () =>
      setOffline(false);

    const offlineHandler = () =>
      setOffline(true);

    window.addEventListener(
      "online",
      onlineHandler
    );

    window.addEventListener(
      "offline",
      offlineHandler
    );

    return () => {
      window.removeEventListener(
        "online",
        onlineHandler
      );

      window.removeEventListener(
        "offline",
        offlineHandler
      );
    };
  }, []);

  return offline;
};

export default useOffline;