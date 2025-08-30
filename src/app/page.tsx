import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CircleDot } from "lucide-react";

type GameResult = {
  name: string;
  openPatti: string;
  open: string;
  jodi: string;
  close: string;
  closePatti: string;
  chartLink: string;
};

type GameSchedule = {
  name: string;
  time: string;
  live: boolean;
};

const liveResults: GameResult[] = [
  { name: "KALYAN", openPatti: "589", open: "2", jodi: "27", close: "7", closePatti: "160", chartLink: "/charts" },
  { name: "MAIN BAZAR", openPatti: "340", open: "7", jodi: "71", close: "1", closePatti: "290", chartLink: "/charts" },
  { name: "MILAN NIGHT", openPatti: "680", open: "4", jodi: "45", close: "5", closePatti: "140", chartLink: "/charts" },
  { name: "RAJDHANI NIGHT", openPatti: "237", open: "2", jodi: "29", close: "9", closePatti: "450", chartLink: "/charts" },
];

const gameSchedule: GameSchedule[] = [
    { name: "MILAN MORNING", time: "10:00 AM - 11:00 AM", live: false },
    { name: "KALYAN MORNING", time: "11:00 AM - 12:00 PM", live: true },
    { name: "SRIDEVI", time: "11:30 AM - 12:30 PM", live: false },
    { name: "MADHURI", time: "12:00 PM - 01:00 PM", live: false },
    { name: "KALYAN", time: "04:10 PM - 06:10 PM", live: true },
    { name: "SRIDEVI NIGHT", time: "07:00 PM - 08:00 PM", live: false },
    { name: "MADHURI NIGHT", time: "08:30 PM - 09:30 PM", live: false },
    { name: "MILAN NIGHT", time: "09:00 PM - 11:00 PM", live: true },
    { name: "RAJDHANI NIGHT", time: "09:30 PM - 11:45 PM", live: true },
    { name: "MAIN BAZAR", time: "10:00 PM - 11:59 PM", live: true },
];

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milan Morning</CardTitle>
            <span className="text-sm text-muted-foreground">369-8</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">369-81-470</div>
            <p className="text-xs text-muted-foreground">Result at 11:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sridevi Day</CardTitle>
             <span className="text-sm text-muted-foreground">128-1</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128-19-450</div>
             <p className="text-xs text-muted-foreground">Result at 12:30 PM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Bazar</CardTitle>
             <span className="text-sm text-muted-foreground">580-3</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">580-31-146</div>
            <p className="text-xs text-muted-foreground">Result at 01:30 PM</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kalyan Live</CardTitle>
            <CircleDot className="text-accent animate-pulse"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">589-2</div>
            <p className="text-xs">Close at 06:10 PM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Results</CardTitle>
            <CardDescription>Real-time updates from popular markets.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Market</TableHead>
                  <TableHead className="text-center" colSpan={3}>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveResults.map((result) => (
                  <TableRow key={result.name}>
                    <TableCell className="font-bold text-primary">{result.name}</TableCell>
                    <TableCell className="text-center">{result.openPatti}</TableCell>
                    <TableCell className="text-center text-2xl font-bold text-accent">
                      {result.jodi}
                    </TableCell>
                    <TableCell className="text-center">{result.closePatti}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Game Schedule</CardTitle>
            <CardDescription>Result timings for all major markets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gameSchedule.map((game) => (
                <div key={game.name} className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-muted/50">
                  <div>
                    <p className="font-semibold">{game.name}</p>
                    <p className="text-sm text-muted-foreground">{game.time}</p>
                  </div>
                  {game.live && (
                    <Badge variant="outline" className="flex items-center gap-2 border-accent text-accent">
                      <CircleDot className="h-3 w-3 animate-pulse" />
                      Live
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
