import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <section className="mt-5 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-foreground font-sans tracking-wide text-lg md:text-2xl font-bold">
          Your tasks, in focus.
        </h1>
        <p className="text-muted-foreground text-xs md:text-md">
          A little clarity. A little progress. All in one place.
        </p>
      </div>

      <Button className="inline-flex gap-1 bg-primary text-muted px-4 py-2 rounded-lg items-center justify-center text-sm font-normal">
        <Plus className="w-4 h-4" />
        New Task
      </Button>
    </section>
  );
}

export default Header;
