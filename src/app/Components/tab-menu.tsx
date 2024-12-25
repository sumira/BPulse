"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TabMenu() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold">Battery Settings</h1>

      <Tabs defaultValue="battery">
        <TabsList>
          <TabsTrigger value="lead-acid">Lead-Acid</TabsTrigger>
          <TabsTrigger value="li-ion">Li-ion</TabsTrigger>
          <TabsTrigger value="ni-mh">Ni-MH</TabsTrigger>
          <TabsTrigger value="ni-cd">Ni-Cd</TabsTrigger>
        </TabsList>

        <TabsContent value="lead-acid">
          <Card>
            <CardHeader>
              <CardTitle>Lead-acid Battery</CardTitle>
              <CardDescription>
                Insert The Lead-acid Battery discharge rate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="dischargerate">Discharge Rate(A)</Label>
                <Input id="dischargerate" defaultValue="6A" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time">Time(h)</Label>
                <Input id="time" defaultValue="1h" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="li-ion">
          <Card>
            <CardHeader>
              <CardTitle>Li-ion Battery</CardTitle>
              <CardDescription>
                Insert Li-ion Battery discharge rate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="dischargerate">Discharge Rate(A)</Label>
                <Input id="dischargerate" defaultValue="2A" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time">Time(h)</Label>
                <Input id="time" defaultValue="1h" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ni-mh">
          <Card>
            <CardHeader>
              <CardTitle>Ni-MH Battery</CardTitle>
              <CardDescription>
                Insert Ni-MH Battery discharge rate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="dischargerate">Discharge Rate(A)</Label>
                <Input id="dischargerate" defaultValue="1.5A" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time">Time(h)</Label>
                <Input id="time" defaultValue="1h" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ni-cd">
          <Card>
            <CardHeader>
              <CardTitle>Ni-Cd Battery</CardTitle>
              <CardDescription>
                Insert Ni-Cd Battery discharge rate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="dischargerate">Discharge Rate(A)</Label>
                <Input id="dischargerate" defaultValue="1A" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="time">Time(h)</Label>
                <Input id="time" defaultValue="1h" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
