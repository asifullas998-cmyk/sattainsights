"use client"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";

const jodiData = [
    { week: '06/05 to 12/05', mon: '93', tue: '48', wed: '31', thu: '86', fri: '12', sat: '67', sun: '21' },
    { week: '13/05 to 19/05', mon: '78', tue: '23', wed: '59', thu: '04', fri: '42', sat: '97', sun: '79' },
    { week: '20/05 to 26/05', mon: '60', tue: '15', wed: '34', thu: '89', fri: '91', sat: '46', sun: '64' },
    { week: '27/05 to 02/06', mon: '22', tue: '77', wed: '95', thu: '40', fri: '81', sat: '36', sun: '53' },
    { week: '03/06 to 09/06', mon: '18', tue: '63', wed: '49', thu: '94', fri: '28', sat: '73', sun: '01' },
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
