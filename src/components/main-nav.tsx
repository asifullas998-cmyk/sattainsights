"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Clapperboard,
  BarChartBig,
  BrainCircuit,
  BookMarked,
  Settings,
  Tv,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Dashboard", icon: Tv },
    { href: "/charts", label: "Charts", icon: BarChartBig },
    { href: "/analyzer", label: "AI Analyzer", icon: BrainCircuit, isNew: true },
    { href: "/diary", label: "Prediction Diary", icon: BookMarked },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Clapperboard className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tighter text-sidebar-foreground">
              Satta Insights
            </h2>
            <p className="text-xs text-sidebar-foreground/70">Your lucky number awaits</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side:"right" }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                  {item.isNew && <Badge variant="secondary" className="ml-auto">New</Badge>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
          <Button variant="ghost" className="justify-start w-full gap-2">
            <Settings className="w-4 h-4"/>
            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
          </Button>
      </SidebarFooter>
    </>
  );
}
