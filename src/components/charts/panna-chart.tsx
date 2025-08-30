"use client"
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const pannaData = [
    { day: "Mon", openPatti: "237", jodi: "29", closePatti: "450" },
    { day: "Tue", openPatti: "680", jodi: "45", closePatti: "140" },
    { day: "Wed", openPatti: "340", jodi: "71", closePatti: "290" },
    { day: "Thu", openPatti: "589", jodi: "27", closePatti: "160" },
    { day: "Fri", openPatti: "115", jodi: "78", closePatti: "350" },
    { day: "Sat", openPatti: "580", jodi: "30", closePatti: "127" },
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
