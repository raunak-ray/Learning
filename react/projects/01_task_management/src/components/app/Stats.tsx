import { Card, CardContent, CardHeader } from "../ui/card";
import IconView, { type IconName } from "../shared/IconView";
import TextView from "../shared/TextView";
import type { Tone } from "../../theme/tokens";
import { taskStatusTones } from "../../theme/tokens";

interface StatsCardProps {
  label: string;
  value: number;
  icon: IconName;
  tone: Tone;
  description?: string;
}

function StatsCard({
  label,
  value = 0,
  icon,
  tone,
  description,
}: StatsCardProps) {
  return (
    <Card className="min-w-0 w-full rounded-xl border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <TextView variant="label" tone="muted">
          {label}
        </TextView>

        <IconView name={icon} tone={tone} boxSize="md" rounded="lg" />
      </CardHeader>

      <CardContent>
        <TextView variant="value">{value.toLocaleString("en-IN")}</TextView>

        {description && (
          <TextView variant="caption" tone="muted" className="mt-1">
            {description}
          </TextView>
        )}
      </CardContent>
    </Card>
  );
}

const stats = [
  {
    id: "total",
    label: "Total Tasks",
    value: 0,
    icon: "Blocks",
    tone: taskStatusTones.total,
    description: "All tasks created",
  },
  {
    id: "pending",
    label: "Pending",
    value: 0,
    icon: "Clock",
    tone: taskStatusTones.pending,
    description: "Awaiting attention",
  },
  {
    id: "in-progress",
    label: "In Progress",
    value: 0,
    icon: "Loader",
    tone: taskStatusTones["in-progress"],
    description: "Currently being worked on",
  },
  {
    id: "completed",
    label: "Completed",
    value: 0,
    icon: "Check",
    tone: taskStatusTones.completed,
    description: "Successfully finished",
  },
] satisfies {
  id: string;
  label: string;
  value: number;
  icon: IconName;
  tone: Tone;
  description: string;
}[];

function Stats() {
  return (
    <section
      aria-label="Task statistics"
      className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4"
    >
      {stats.map((item) => (
        <StatsCard
          key={item.id}
          label={item.label}
          value={item.value}
          icon={item.icon}
          tone={item.tone}
          description={item.description}
        />
      ))}
    </section>
  );
}

export default Stats;
