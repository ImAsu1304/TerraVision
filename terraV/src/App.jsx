import { useEffect, useState } from "react";
import AppShell from "./components/AppShell"
import GlobalLoader from "./components/GlobalLoader";

function App() {
    const [appReady, setAppReady] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setAppReady(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!appReady) return <GlobalLoader />;

    return <AppShell />;
}

export default App;