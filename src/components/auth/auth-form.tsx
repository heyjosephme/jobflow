"use client";
// components/auth/auth-form.tsx
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    try {
      setError(null);
      setLoading(true);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        router.push("/onboarding"); // For first time users
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      router.push("/onboarding");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">
          {mode === "signin" ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          {mode === "signin"
            ? "Enter your credentials to continue"
            : "Enter your details to get started"}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 mt-4">
        {mode === "signin" ? (
          <>
            <Button
              className="w-full h-11"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-primary underline-offset-4 hover:underline"
              >
                Create an account
              </button>
            </p>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={handleSignUp}
              disabled={loading}
            >
              Create Account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
