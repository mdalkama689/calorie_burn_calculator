"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrPowerReset } from "react-icons/gr";

export default function Tab() {
  const activityList = [
    { value: "walking", label: "Walking (3 mph)" },
    { value: "running_moderate", label: "Running (6 mph)" },
    { value: "cycling_moderate", label: "Cycling (12-14 mph)" },
    { value: "swimming_freestyle", label: "Swimming (Freestyle, moderate)" },
    { value: "aerobics_general", label: "Aerobics (General)" },
    { value: "weight_lifting", label: "Weight Lifting (General)" },
    { value: "basketball", label: "Basketball (Game)" },
    { value: "soccer", label: "Soccer (Game)" },
    { value: "dancing_vigorous", label: "Dancing (Vigorous)" },
    { value: "hiking", label: "Hiking (Uphill)" },
  ];

  const [weight, setWeight] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [activity, setActivity] = useState<string>("");
  const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);

  const calculateCalories = () => {
    if (!weight || !duration || !activity) {
      return toast.error("Weight, duration, and activity are required!");
    }

    const metValues: { [key: string]: number } = {
      walking: 3.5,
      running_moderate: 9.8,
      cycling_moderate: 8.0,
      swimming_freestyle: 7.0,
      aerobics_general: 5.5,
      weight_lifting: 3.0,
      basketball: 8.0,
      soccer: 7.0,
      dancing_vigorous: 8.0,
      hiking: 6.0,
    };

    const met = metValues[activity] || 0;
    const caloriesPerMinute = (met * 3.5 * weight) / 200;
    const totalCalories = caloriesPerMinute * duration;

    setCaloriesBurned(Math.round(totalCalories));
    toast.success("Calories burned calculated!");
  };

  const resetValue = () => {
    setWeight(null);
    setDuration(null);
    setActivity("");
    setCaloriesBurned(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-bold text-white">
            Calorie Burn Estimator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label className="text-white">Weight (kg)</Label>
            <Select
              value={weight?.toString() || ""}
              onValueChange={(val) => setWeight(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {Array.from({ length: 111 }, (_, i) => 40 + i).map((w) => (
                    <SelectItem key={w} value={w.toString()}>
                      {w} kg
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Duration (minutes)</Label>
            <Select
              value={duration?.toString() || ""}
              onValueChange={(val) => setDuration(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {Array.from({ length: 181 }, (_, i) => i + 10).map((d) => (
                    <SelectItem key={d} value={d.toString()}>
                      {d} minutes
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Activity</Label>
            <Select value={activity} onValueChange={(val) => setActivity(val)}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-600 text-white">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                <SelectGroup>
                  {activityList.map((act) => (
                    <SelectItem key={act.value} value={act.value}>
                      {act.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[90%] bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={calculateCalories}
            >
              Calculate
            </Button>
            <GrPowerReset
              onClick={resetValue}
              className="w-fit text-white font-bold text-2xl cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {caloriesBurned !== null && (
        <div className="bg-zinc-900 text-white p-4 mt-6 md:ml-10 rounded-lg border border-zinc-700 w-full md:max-w-sm text-center space-y-2">
          <p className="text-xl font-semibold text-blue-400">
            Estimated Calories Burned
          </p>
          <p>
            Approximately{" "}
            <span className="text-blue-400">{caloriesBurned} calories</span>{" "}
            burned.
          </p>
        </div>
      )}
    </div>
  );
}
