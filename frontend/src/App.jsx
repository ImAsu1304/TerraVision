import { useState, useEffect } from "react";
import GlobalLoader from "./components/GlobalLoader";
import AppShell from "./components/AppShell";

function App() {
  const [appReady, setAppReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAppReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!appReady) return <GlobalLoader/>

  return <AppShell/>
}

export default App;