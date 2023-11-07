"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      });

      if (res.ok) {
        router.push("/auth/login");
      }

      const resJson = await res.json();
      console.log(resJson);
    } catch (error: any) {
      console.log(error);
    }
  });

  const inputStyle = `px-3 py-2 border rounded-lg bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-slate-600 text-white placeholder-neutral-400 transition-all focus:ring-offset-2 focus:ring-offset-neutral-950  focus:border-transparent`;
  return (
    <main className="flex min-h-screen flex-col   p-24">
      <form
        className="flex flex-col  justify-center gap-6 max-w-md w-full"
        onSubmit={onSubmit}
      >
        <fieldset className="flex flex-col gap-4">
          <legend className="text-2xl mb-4  text-slate-400 font-bold">
            Register
          </legend>

          <div className="flex gap-2 flex-col">
            <label className="text-sm  text-slate-500" htmlFor="username">
              Username
            </label>
            <input
              className={`${inputStyle}`}
              id="username"
              autoComplete="username"
              {...register("username", {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              placeholder="JohnDoe"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <label className="text-sm  text-slate-500" htmlFor="email">
              Email
            </label>
            <input
              className={`${inputStyle}`}
              type="email"
              id="email"
              {...register("email", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
              autoComplete="email"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <label className="text-sm  text-slate-500" htmlFor="password">
              Password
            </label>
            <input
              className={`${inputStyle}`}
              type="password"
              id="password"
              {...register("password", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
              autoComplete="new-password"
              placeholder="Password"
            />{" "}
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            <label
              className="text-sm  text-slate-500"
              htmlFor="confirmPassword"
            >
              Password
            </label>
            <input
              className={`${inputStyle}`}
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
              autoComplete="new-password"
              placeholder="Confirm Password"
            />{" "}
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message?.toString()}
              </span>
            )}
          </div>
        </fieldset>

        <button
          className=" rounded-lg text-lg px-4 py-2 focus:outline-none  transition-all text-white
        bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-950
        "
          type="submit"
        >
          Register
        </button>
      </form>
    </main>
  );
}
