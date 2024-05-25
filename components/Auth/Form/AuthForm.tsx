"use client";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  username?: string; //optional for login
  email: string;
  password: string;
}

const AuthForm = ({ type }: { type: "register" | "login" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      type === "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let res;
    if (type === "register") {
      res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/login");
      } else {
        console.log("res:", res);
        toast.error("something went wrong");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res && res?.ok) {
        router.push("/");
      } else {
        toast.error("Invalid credentials");
      }
    }
  };
  return (
    <div className="auth">
      <div className="overlay">
        <div className="content">
          <img src="/assets/logo.png" alt="logo" />
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {type === `register` && (
              <>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    {...register("username", {
                      required: "Username is required",
                      validate: (value: string | undefined) => {
                        if (!value || value.length < 2) {
                          return "Username is too short";
                        }
                        return true;
                      },
                    })}
                  />
                  <PersonOutline sx={{ color: "white" }} />
                </div>
                {errors.username && (
                  <p className="error">{errors.username.message}</p>
                )}
                <div className="input">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input-field"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <EmailOutlined sx={{ color: "white" }} />
                </div>
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
                <div className="input">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value: string | undefined) => {
                        if (
                          !value ||
                          value.length < 5 ||
                          value.length > 20 ||
                          !/[!@#$%^&*(),.?":{}|<>]/.test(value)
                        ) {
                          return "Password must be between 5-20 with special character";
                        }
                        return true;
                      },
                    })}
                  />
                  <LockOutlined sx={{ color: "white" }} />
                </div>
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </>
            )}{" "}
            {type === `login` && (
              <>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Email"
                    className="input-field"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <PersonOutline sx={{ color: "white" }} />
                </div>
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
                <div className="input">
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value: string | undefined) => {
                        if (
                          !value ||
                          value.length < 5 ||
                          value.length > 20 ||
                          !/[!@#$%^&*(),.?":{}|<>]/.test(value)
                        ) {
                          return "Password must be between 5-20 with special character";
                        }
                        return true;
                      },
                    })}
                  />
                  <LockOutlined sx={{ color: "white" }} />
                </div>
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </>
            )}
            <button className="button">
              {type === "register" ? "Join Free" : "Let's Watch"}
            </button>
          </form>
          {type === "register" ? (
            <Link href="/login">
              <p className="link">Already have an account ? Log In Here</p>
            </Link>
          ) : (
            <Link href="/register">
              <p className="link">Don't have an account ? Register Here</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
