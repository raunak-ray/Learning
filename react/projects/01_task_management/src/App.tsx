import Header from "./components/app/Header";
import Navbar from "./components/app/Navbar";
import Stats from "./components/app/Stats";
import TaskList from "./components/app/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <Stats />
        <TaskList />
      </main>
    </div>
  );
}

export default App;
