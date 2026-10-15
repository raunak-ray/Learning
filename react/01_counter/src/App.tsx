import { useEffect, useState } from "react";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Button from "./components/Button";

function App() {
  const [mounted, setMounted] = useState(true);

  const handleMount = () => {
    setMounted((prev) => !prev);
  };

  useEffect(() => {
    console.log("App component mounted");

    return (() => {
      console.log("App component unmounted")
    })
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-(--app-bg) px-5 py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-150 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-xl">
        <Header />
        <Button
          title={mounted ? "Unmount" : "Mount"}
          variant="secondary"
          onClick={handleMount}
        />
        {mounted && <Counter />}
      </div>
    </main>
  );
}

export default App;
