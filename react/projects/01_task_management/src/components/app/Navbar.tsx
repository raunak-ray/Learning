import { Button } from "@base-ui/react";

function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold">Tasky</h1>

        <Button
          type="button"
          className="bg-primary text-muted rounded-md px-4 py-2"
        >
          Get Started
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
