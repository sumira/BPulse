"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface GaugeMeterProps {
  minValue: number;
  maxValue: number;
  value: number;
  description: string;
  title?: string;
  icon?: LucideIcon;
}

export function GaugeMeter({
  minValue = 0,
  maxValue = 100,
  value,
  description,
  title = "Gauge Meter",
  icon: Icon,
}: GaugeMeterProps) {
  const normalizedValue = Math.min(Math.max(value, minValue), maxValue);

  const percentage =
    ((normalizedValue - minValue) / (maxValue - minValue)) * 100;

  const data = [
    {
      value: normalizedValue,
      fill: `hsl(${percentage * 1.2}, 70%, 50%)`,
    },
  ];

  return (
    <Card className="w-[300px] bg-zinc-50  border-blue-600">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {Icon && <Icon size={30} />}
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center">
          <RadialBarChart
            width={300}
            height={300}
            cx={150}
            cy={150}
            innerRadius={80}
            outerRadius={140}
            barSize={20}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[minValue, maxValue]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
              fill={data[0].fill}
            />
          </RadialBarChart>
        </div>
        <div className="text-center ">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">
            Range: {minValue} - {maxValue}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
