"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const UserCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>WS</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">whoshriyansh</CardTitle>
            <CardDescription>
              Full-Stack Dev | Freelancer | Alpha-in-progress
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
        <div className="space-y-1">
          <p className="font-medium text-primary">Username</p>
          <p>@whoshriyansh</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-primary">Projects</p>
          <p>18 Active</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-primary">Tasks Completed</p>
          <p>147</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-primary">Clients</p>
          <p>12 Total</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-primary">Hours Worked</p>
          <p>986 hrs</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-primary">Hourly Rate</p>
          <p>$45/hr</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-primary">Total Earnings</p>
          <p>$44,370</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Full Profile</Button>
      </CardFooter>
    </Card>
  );
};

export const DeleteAccountCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Actions</CardTitle>
      </CardHeader>
      <hr className="border border-white/5" />
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Close Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export const ThemeBox = () => {
  const { setTheme } = useTheme();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>
          Change Theme from here or Toogle from Profile Menu
        </CardDescription>
      </CardHeader>
      <hr className="border border-white/5" />
      <CardFooter className="flex justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};
