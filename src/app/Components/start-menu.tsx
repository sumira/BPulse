"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StartMenuProps {
  userId: string;
  deviceId: string;
  setUserId: (userId: string) => void;
  setDeviceId: (deviceId: string) => void;
  onSubmit: () => void;
}

export function StartMenu({
  userId,
  deviceId,
  setUserId,
  setDeviceId,
  onSubmit,
}: StartMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Enter BPulse Device Details</DialogTitle>
            <DialogDescription>
              You need to have a Bpulse User ID and Device ID to proceed
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userid" className="text-right">
                User ID
              </Label>
              <Input
                id="userid"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deviceid" className="text-right">
                Device ID
              </Label>
              <Input
                id="deviceid"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Conenct</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
