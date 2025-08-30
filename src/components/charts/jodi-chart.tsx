"use client"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const jodiData = [
  { week: '18/03 to 24/03', mon: '44', tue: '99', wed: '81', thu: '88', fri: '33', sat: '83', sun: '38' },
  { week: '25/03 to 31/03', mon: '27', tue: '72', wed: '11', thu: '66', fri: '50', sat: '05', sun: '35' },
  { week: '01/04 to 07/04', mon: '93', tue: '48', wed: '31', thu: '86', fri: '12', sat: '67', sun: '21' },
  { week: '08/04 to 14/04', mon: '78', tue: '23', wed: '59', thu: '04', fri: '42', sat: '97', sun: '79' },
  { week: '15/04 to 21/04', mon: '60', tue: '15', wed: '34', thu: '89', fri: '91', sat: '46', sun: '64' },
];

export function JodiChart() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-primary">Week</TableHead>
          <TableHead>Mon</TableHead>
          <TableHead>Tue</TableHead>
          <TableHead>Wed</TableHead>
          <TableHead>Thu</TableHead>
          <TableHead>Fri</TableHead>
          <TableHead className="text-destructive">Sat</TableHead>
          <TableHead className="text-destructive">Sun</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jodiData.map((row) => (
          <TableRow key={row.week}>
            <TableCell className="font-medium">{row.week}</TableCell>
            <TableCell>{row.mon}</TableCell>
            <TableCell>{row.tue}</TableCell>
            <TableCell>{row.wed}</TableCell>
            <TableCell>{row.thu}</TableCell>
            <TableCell>{row.fri}</TableCell>
            <TableCell className="text-destructive">{row.sat}</TableCell>
            <TableCell className="text-destructive">{row.sun}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
