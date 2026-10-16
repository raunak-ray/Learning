import { Card, CardContent } from "../ui/card";

interface TaskCardProps {
  title: string;
}

function TaskCard({ title }: TaskCardProps) {
  return (
    <Card className="w-full min-w-0 bg-card">
      <CardContent className="p-6">{title}</CardContent>
    </Card>
  );
}

export default TaskCard;
