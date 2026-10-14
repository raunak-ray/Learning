function Button({ title, onClick, variant = "secondary" }) {
  const baseStyle =
    "flex-1 rounded-lg border px-2 py-3 text-xs font-semibold transition-all duration-200 active:scale-[0.97] sm:text-sm";

  const variantStyle = {
    primary:
      "border-indigo-500 bg-(--accent) text-white hover:bg-(--accent-hover) hover:shadow-lg hover:shadow-indigo-500/20",

    secondary:
      "border-(--border) bg-(--surface-raised) text-(--text-primary) hover:border-slate-500 hover:bg-[#303B58]",
  };

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyle[variant]}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
