"use client";
import { persistor, store } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { DeleteProvider } from "./DeleteContext";
import { ThemeProvider } from "./ThemeProvider";

// Dynamically import PersistGate to reduce initial bundle size
const DynamicPersistGate = dynamic(() => Promise.resolve(PersistGate), {
  ssr: false,
});

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always render the Provider with children, but conditionally wrap with PersistGate
  // This ensures server and client render the same content initially
  return (
    <Provider store={store}>
      <DeleteProvider>
        {mounted ? (
          <DynamicPersistGate loading={null} persistor={persistor}>
            <ThemeProvider>{children}</ThemeProvider>
          </DynamicPersistGate>
        ) : (
          <ThemeProvider>{children}</ThemeProvider>
        )}
      </DeleteProvider>
    </Provider>
  );
};

export default RootProvider;
