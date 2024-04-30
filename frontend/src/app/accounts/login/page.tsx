"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";
import "@/styles/login.css";
import { ReloadIcon } from "@radix-ui/react-icons";
export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log("login");
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);

      window.history.go(0);

      router.push("/users/dashboard");
    } catch (error: any) {
      console.log("Login failed", error.response.data.message);
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="accounts_container">
      <div className="accounts_container_image_bg">
        <img className="image_bg  " src="/assets/images/login_bg.jpg" alt="" />
      </div>

      <div className="accounts_container_form">
        <h1 className="accounts_container_form_title">Sign In</h1>

        <form className="accounts_container_form_input">
          <Input
            className="accounts_container_form_input_box"
            type="email"
            placeholder="Email"
            value={user.email}
            autoComplete="off"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Input
            type="password"
            className="accounts_container_form_input_box"
            placeholder="Password"
            value={user.password}
            autoComplete="off"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {!loading && (
            <Button
              className="accounts_container_form_input_b
          utton"
              size="login"
              onClick={onLogin}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onLogin();
                }
              }}
            >
              Sign In
            </Button>
          )}
          {loading && (
            <Button
              disabled
              className="accounts_container_form_input_b
          utton"
              size="login"
              onClick={onLogin}
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
        </form>

        <div className="accounts_container_bottom">
          <Link
            className="accounts_container_bottom_button"
            href={"/accounts/forgotpassword"}
          >
            Forgot Password
          </Link>
          <Link
            className="accounts_container_bottom_button"
            href={"/accounts/signup"}
          >
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
