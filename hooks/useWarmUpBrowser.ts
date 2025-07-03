import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the browser to improve performance on first use
    WebBrowser.warmUpAsync().catch((error) => {
      console.error("Failed to warm up the browser:", error);
    });

    return () => {
      // Optionally, you can clean up or reset the browser state if needed
      WebBrowser.coolDownAsync().catch((error) => {
        console.error("Failed to cool down the browser:", error);
      });
    };
  }, []);
};
