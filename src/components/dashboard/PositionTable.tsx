"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PositionStatusBadge } from "@/components/dashboard/PositionStatusBadge";
import { POSITIONS_TABLE } from "@/data/dashboard";
import type { PositionStatus } from "@/data/dashboard";

export function PositionTable() {
  return (
    <div className="glass-panel p-6">
      <h3 className="font-display text-lg font-semibold">All Positions</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {POSITIONS_TABLE.length} positions across all regions
      </p>
      <div className="mt-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-xs text-muted-foreground">
                ID
              </TableHead>
              <TableHead className="text-xs text-muted-foreground">
                Title
              </TableHead>
              <TableHead className="text-xs text-muted-foreground">
                Region
              </TableHead>
              <TableHead className="text-xs text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-xs text-muted-foreground">
                Days Open
              </TableHead>
              <TableHead className="text-xs text-muted-foreground">
                Clearance
              </TableHead>
              <TableHead className="text-xs text-muted-foreground">
                Recruiter
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {POSITIONS_TABLE.map((pos) => (
              <TableRow
                key={pos.id}
                className="border-white/5 transition-colors hover:bg-white/5"
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {pos.id}
                </TableCell>
                <TableCell className="font-medium">{pos.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {pos.region}
                </TableCell>
                <TableCell>
                  <PositionStatusBadge status={pos.status as PositionStatus} />
                </TableCell>
                <TableCell className="font-mono tabular-nums">
                  {pos.daysOpen}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {pos.clearance}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {pos.recruiter}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
