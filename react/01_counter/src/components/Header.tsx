function Header() {
  return (
    <header className="mb-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-400">
        Playground / 01
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-(--text-primary) sm:text-4xl">
        Counter Studio
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-(--text-secondary) sm:text-base">
        A simple playground to explore React state and interactions.
      </p>
    </header>
  );
}

export default Header;
