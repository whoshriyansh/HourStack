"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc"; // Google Icon

export default function SignIn() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-background via-sidebar to-sidebar-border text-foreground flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:20px_20px] z-0 pointer-events-none" />

      <Card className="w-[370px] bg-accent border border-white/10 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-col items-center text-center space-y-4">
          <CardTitle>
            <Image
              src="/ChronogridLogo.png"
              alt="Chronogrid Logo"
              width={160}
              height={60}
              className="object-contain"
            />
          </CardTitle>
          <CardDescription className="text-white/70">
            Create your account to start tracking
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Username */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="johndoe" />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@gmail.com" />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          {/* Register Button */}
          <Button className="w-full">Create Account</Button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-white/40 text-xs mt-2">
            <div className="h-px flex-1 bg-white/20" />
            OR
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Google SignUp Button */}
          <Button variant="outline" className="w-full flex gap-2 text-sm">
            <FcGoogle className="text-lg" />
            Sign up with Google
          </Button>
        </CardContent>

        {/* Footer - Login link */}
        <CardFooter className="flex justify-center text-sm text-white/70 pt-2">
          Already have an account?&nbsp;
          <a href="/login" className="hover:underline text-white">
            Log in
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
