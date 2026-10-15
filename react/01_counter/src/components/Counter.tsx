import { useEffect, useState } from "react";
import Button from "./Button";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  // useEffect(() => {
  //   console.log("The count is: ", count);
  // }, [count]);

  useEffect(() => {
    console.log("Component mounted.");

    return () => {
      console.log("Component unmounted");
    };
  }, []);

//   useEffect(() => {
//     console.log("Effect ran after every render");
// 
//     return (() => {
//       console.log("Effect ran in cleanup")
//     })
//   });

  return (
    <section className="mt-5 rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-2xl shadow-black/20 sm:p-7">
      {/* Count display */}
      <div className="mb-5 rounded-xl border border-(--border) bg-(--app-bg) px-4 py-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-muted)">
          Current count
        </p>

        <h3
          aria-live="polite"
          className="my-4 text-6xl font-bold tracking-tight text-(--text-primary) tabular-nums"
        >
          {count}
        </h3>

        <p className="text-sm text-(--text-secondary)">
          {count === 0
            ? "Ready for your first increment"
            : `${count} ${count === 1 ? "step" : "steps"} counted`}
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button title="Increment" onClick={handleIncrement} variant="primary" />

        <Button title="Reset" onClick={handleReset} />

        <Button title="Decrement" onClick={handleDecrement} />
      </div>
    </section>
  );
}

export default Counter;
