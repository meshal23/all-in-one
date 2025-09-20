import React from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { MagicCard } from "../../components/magicui/magic-card";
import type { Route } from "../+types/root";
import { Form, Link, redirect, useActionData } from "react-router";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import {
  ServerValidateError,
  createServerValidate,
  formOptions,
  initialFormState,
} from "@tanstack/react-form/remix";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import axiosInstance from "~/lib/axios";
// import { useTheme } from "next-themes";
import Cookies from "js-cookie";

const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.email)) {
      return "Enter valid email address";
    }
    if (!/^.{8,}$/.test(value.password)) {
      return "Enter a strong password";
    }
  },
  onSubmit: ({ value }) => {
    console.log("Server Submitted Data: ", value);
  },
});

export async function clientAction({ request }: Route.ClientActionArgs) {
  await axiosInstance.get("/sanctum/csrf-cookie", {
    baseURL: "http://localhost:8000",
  });
  const formData = await request.formData();
  
  try {
    // get csrf cookie to prevernt csrf attacks
    // when you use frontend, backend seperately
    const validatedData = await serverValidate(formData);
    const regData = Object.fromEntries(formData);
    console.log("validatedData", validatedData);
    console.log("registerData", regData);

    // login user
    const response = await axiosInstance({
      method: "post",
      url: "/login",
      data: validatedData,
    });

    console.log(response.data);
    console.log(response.status);

    localStorage.setItem("userLoggedIn", "true");

    return redirect("/admin");
  } catch (e) {
    if (e instanceof ServerValidateError) {
      console.log(e);
      return e.formState;
    }
    // Some other error occurred while validating your form
    throw e;
  }
}

const Login = ({ actionData }: Route.ComponentProps) => {
  const data = actionData;
  const form = useForm({
    ...formOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, data ?? {}),
      [data]
    ),
    onSubmit: ({ value }) => {
      console.log("Submitted data:", value);
    },
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  console.log(formErrors);

  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <Card className="p-0 max-w-sm w-full shadow-none border-none">
        <MagicCard
          // gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          gradientColor="#D9D9D955"
          className="p-0"
        >
          <CardHeader className="border-b flex flex-col w-full items-center  border-border p-4 [.border-b]:pb-4">
            <CardTitle className="text-2xl uppercase motion-preset-oscillate">
              Login
            </CardTitle>
            <CardDescription>
              Login here to navigate to admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <Form method="post" onSubmit={() => form.handleSubmit()}>
              <div className="grid gap-4">
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      return !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        value
                      )
                        ? "Please enter valid email address"
                        : "";
                    },
                  }}
                >
                  {(field) => {
                    return (
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors.map((error: any) => {
                          console.log("error: ", error);
                          return (
                            <p
                              className="motion-preset-shake text-red-500 "
                              key={error as string}
                            >
                              {error}
                            </p>
                          );
                        })}
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) => {
                      return !/^.{8,}$/.test(value)
                        ? "Password atleast contain 8 digits"
                        : "";
                    },
                  }}
                >
                  {(field) => {
                    return (
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors.map((error: any) => {
                          console.log("error: ", error);
                          return (
                            <p
                              className="motion-preset-shake text-red-500 "
                              key={error as string}
                            >
                              {error}
                            </p>
                          );
                        })}
                      </div>
                    );
                  }}
                </form.Field>
              </div>
              <CardFooter className="p-4 flex flex-col border-t border-border [.border-t]:pt-4">
                <form.Subscribe
                  selector={(formState: any) => [
                    formState.canSubmit,
                    formState.isSubmitted,
                  ]}
                >
                  {([canSubmit, isSubmitting]) => {
                    return (
                      <Button
                        onClick={() => console.log("clicked")}
                        disabled={!canSubmit}
                        style={{
                          cursor: !canSubmit ? "not-allowed" : "",
                        }}
                        type="submit"
                        className="w-full"
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </Button>
                    );
                  }}
                </form.Subscribe>
                <p className="mt-2 text-slate-500">
                  Create an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:underline"
                  >
                    register
                  </Link>
                </p>
              </CardFooter>
            </Form>
          </CardContent>
        </MagicCard>
      </Card>
    </section>
  );
};

export default Login;
