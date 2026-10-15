import ButtonView from "../shared/ButtonView";
import TextView from "../shared/TextView";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <section className="mt-5 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <TextView variant="h1">Your tasks, in focus.</TextView>
        <TextView variant="caption" tone="muted">
          A little clarity. A little progress. All in one place.
        </TextView>
      </div>

      <ButtonView leftIcon="Plus">New Task</ButtonView>
    </section>
  );
}

export default Header;
