"use client"
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const pannaData = [
    { day: "Mon", openPatti: "135", jodi: "93", closePatti: "157" },
    { day: "Tue", openPatti: "248", jodi: "41", closePatti: "560" },
    { day: "Wed", openPatti: "670", jodi: "33", closePatti: "120" },
    { day: "Thu", openPatti: "389", jodi: "05", closePatti: "230" },
    { day: "Fri", openPatti: "115", jodi: "71", closePatti: "380" },
    { day: "Sat", openPatti: "580", jodi: "35", closePatti: "140" },
];

export function PannaChart() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Day</TableHead>
            <TableHead className="text-center">Open Panna</TableHead>
            <TableHead className="text-center">Jodi</TableHead>
            <TableHead className="text-center">Close Panna</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pannaData.map((row) => (
            <TableRow key={row.day}>
              <TableCell className="text-center font-bold">{row.day}</TableCell>
              <TableCell className="text-center font-mono">{row.openPatti}</TableCell>
              <TableCell className="text-center font-bold text-2xl text-accent">{row.jodi}</TableCell>
              <TableCell className="text-center font-mono">{row.closePatti}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
