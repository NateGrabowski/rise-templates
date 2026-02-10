"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FillRateReport } from "@/components/dashboard/FillRateReport";
import { RegionalReport } from "@/components/dashboard/RegionalReport";
import { ClearanceReport } from "@/components/dashboard/ClearanceReport";
import { RecruiterReport } from "@/components/dashboard/RecruiterReport";

export function ReportTabs() {
  return (
    <Tabs defaultValue="fill-rate">
      <TabsList className="glass-panel w-full justify-start gap-1 border-white/10 p-1">
        <TabsTrigger value="fill-rate">Fill Rate</TabsTrigger>
        <TabsTrigger value="regional">Regional</TabsTrigger>
        <TabsTrigger value="clearance">Clearance</TabsTrigger>
        <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
      </TabsList>
      <TabsContent value="fill-rate" className="mt-6">
        <FillRateReport />
      </TabsContent>
      <TabsContent value="regional" className="mt-6">
        <RegionalReport />
      </TabsContent>
      <TabsContent value="clearance" className="mt-6">
        <ClearanceReport />
      </TabsContent>
      <TabsContent value="recruiter" className="mt-6">
        <RecruiterReport />
      </TabsContent>
    </Tabs>
  );
}
