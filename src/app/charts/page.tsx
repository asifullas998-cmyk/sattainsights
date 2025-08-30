import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JodiChart } from "@/components/charts/jodi-chart";
import { PannaChart } from "@/components/charts/panna-chart";
import { FrequencyTracker } from "@/components/charts/frequency-tracker";

export default function ChartsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Data Charts</h1>
      </div>
      <p className="text-muted-foreground">
        Visualize historical data to spot trends. Use these charts to analyze Jodi and Panna patterns over time.
      </p>
      <Tabs defaultValue="jodi" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jodi">Jodi Chart</TabsTrigger>
          <TabsTrigger value="panna">Panna Chart</TabsTrigger>
          <TabsTrigger value="frequency">Frequency Tracker</TabsTrigger>
        </TabsList>
        <TabsContent value="jodi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kalyan Jodi Chart</CardTitle>
              <CardDescription>Weekly Jodi results for the Kalyan market.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <JodiChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="panna" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kalyan Panna Chart</CardTitle>
              <CardDescription>Weekly Panna results for the Kalyan market.</CardDescription>
            </CardHeader>
            <CardContent>
              <PannaChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="frequency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Number Frequency</CardTitle>
              <CardDescription>How many times each digit (0-9) has appeared in recent results.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
               <FrequencyTracker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
