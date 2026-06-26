"use client";
import { SignOutButton } from "@clerk/nextjs";

export function SignOut() {
  return (
    <SignOutButton redirectUrl="/sign-in">
      <button>Cerrar Sesión</button>
    </SignOutButton>
  );
}
