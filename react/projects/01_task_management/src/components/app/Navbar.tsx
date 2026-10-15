import ButtonView from "../shared/ButtonView";
import TextView from "../shared/TextView";

function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <TextView variant="h2" as="h1">
          Tasky
        </TextView>

        <ButtonView>Get Started</ButtonView>
      </nav>
    </header>
  );
}

export default Navbar;
