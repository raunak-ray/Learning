import { Blocks, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

function StatsCard({ label, value = 0, icon: Icon }: StatsCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-muted-foreground">{label}</h3>
          <Icon className="size-5" />
        </div>
      </CardHeader>
      <CardContent className="text-2xl">{value}</CardContent>
    </Card>
  );
}

const stats = [
  { id: "total", label: "Total", value: 0, icon: Blocks },
  { id: "pending", label: "Pending", value: 0, icon: Blocks },
  { id: "total", label: "Total", value: 0, icon: Blocks },
];

function Stats() {
  return (
    <section className="mt-6 flex gap-4 flex-wrap items-center justify-center">
      {stats.map((item) => (
        <StatsCard
          key={item.id}
          label={item.label}
          icon={item.icon}
          value={item.value}
        />
      ))}
    </section>
  );
}

export default Stats;
