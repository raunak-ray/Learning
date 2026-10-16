import TaskCard from "./TaskCard";

const TASKS = [
  { id: 1, title: "Title 1" },
  { id: 2, title: "Title 2" },
  { id: 3, title: "Title 3" },
];

function TaskList() {
  return (
    <section className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
      {TASKS.map((task) => (
        <TaskCard key={task.id} title={task.title} />
      ))}
    </section>
  );
}

export default TaskList;
