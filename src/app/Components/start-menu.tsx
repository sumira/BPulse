"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface StartMenuProps {
  onConfigure: (data: ConfigData) => void;
}

interface ConfigData {
  userId: string;
  deviceId: string;
  current: number;
  time: string;
}

export function StartMenu({ onConfigure }: StartMenuProps) {
  const [formData, setFormData] = useState<ConfigData>({
    userId: "",
    deviceId: "",
    current: 0,
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfigure(formData);
  };

  return (
    <Card className="w-[400px] mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          BPulse Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              placeholder="Enter user ID"
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deviceId">Device ID</Label>
            <Input
              id="deviceId"
              placeholder="Enter device ID"
              value={formData.deviceId}
              onChange={(e) =>
                setFormData({ ...formData, deviceId: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current">Current (A)</Label>
            <Input
              id="current"
              type="number"
              placeholder="Enter current"
              value={formData.current}
              onChange={(e) =>
                setFormData({ ...formData, current: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time (minutes)</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Configure
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
