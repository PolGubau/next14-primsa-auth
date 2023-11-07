"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.error) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      alert(res?.error);
      return;
    } catch (error: any) {
      console.log(error);
    }
  });

  const inputStyle = `px-3 py-2 border rounded-lg bg-slate-700 border-none focus:outline-none focus:ring-2 focus:ring-slate-600 text-white placeholder-neutral-400 transition-all focus:ring-offset-2 focus:ring-offset-neutral-950  focus:border-transparent`;
  return (
    <main className="flex min-h-screen flex-col items-center md:items-start  p-24">
      <form
        className="flex flex-col  justify-center gap-6 max-w-md w-full"
        onSubmit={onSubmit}
      >
        <fieldset className="flex flex-col gap-4">
          <legend className="text-2xl mb-4  text-slate-400 font-bold">
            Login
          </legend>

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
              placeholder="hello@polgubau.com"
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
              autoComplete="current-password"
              placeholder="********"
            />{" "}
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message?.toString()}
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
          Login
        </button>
      </form>
    </main>
  );
}
