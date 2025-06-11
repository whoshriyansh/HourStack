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

      <Card className="w-[350px] bg-accent border border-foretext-foreground/10 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-col items-center text-center space-y-4">
          <CardTitle>
            <Image
              src="/hourStackLogo.png"
              alt="Chronogrid Logo"
              width={160}
              height={60}
              className="object-contain"
            />
          </CardTitle>
          <CardDescription className="text-foreground/70">
            Log in and start tracking now
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="john@gmail.com" />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a
              href="#"
              className="text-foreground/70 hover:underline hover:text-foreground"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <Button className="w-full">Login</Button>

          {/* Divider */}
          <div className="flex items-center gap-2 text-foreground/40 text-xs mt-2">
            <div className="h-px flex-1 bg-foretext-foreground/20" />
            OR
            <div className="h-px flex-1 bg-foretext-foreground/20" />
          </div>

          {/* Google Auth Button */}
          <Button variant="outline" className="w-full flex gap-2 text-sm">
            <FcGoogle className="text-lg" />
            Login with Google
          </Button>
        </CardContent>

        {/* Footer - Sign up link */}
        <CardFooter className="flex justify-center text-sm text-foreground/70 pt-2">
          New here?&nbsp;
          <a href="/register" className="hover:underline text-foreground">
            Create an account
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
