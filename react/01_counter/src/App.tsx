import Counter from "./components/Counter";
import Header from "./components/Header";

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-(--app-bg) px-5 py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-150 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-xl">
        <Header />
        <Counter />
      </div>
    </main>
  );
}

export default App;
