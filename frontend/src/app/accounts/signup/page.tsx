"use client";
import bgImage from "@/assets/images/login_bg.jpg";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { signUpSchemas } from "@/schemas/signUpSchemas";
import { useRouter } from "next/navigation";
import "@/styles/login.css";

interface FormValues {
  studentName: string;
  email: string;
  studentRollNo: string;
  studentContactNo: string;
  password: string;
  confirmPassword: string;
}
const FormSchema: z.ZodType<FormValues> = z.object({
  studentName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  studentRollNo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  studentContactNo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      studentName: "",
      email: "",
      studentRollNo: "",
      studentContactNo: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("submited data", data);
    if (data.password !== data.confirmPassword) {
      alert("password and confirm password should be same");
    } else {
      try {
        const reqData = {
          studentName: data.studentName,
          email: data.email,
          studentRollNo: data.studentRollNo,
          studentContactNo: data.studentContactNo,
          password: data.password,
        };
        const verfiedData = signUpSchemas.parse(reqData);

        console.log("request data", reqData);
        const res = await axios.post("/api/users/signup", verfiedData);
        console.log(res);
        router.push("/accounts/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="accounts_container">
      <div className="accounts_container_image_bg">
        <img className="image_bg  " src="/assets/images/login_bg.jpg" alt="" />
      </div>

      <div className="accounts_container_form">
        <h1 className="accounts_container_form_title">Sign In</h1>

        <form
          className="accounts_container_form_input"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className="accounts_container_form_input_box"
            type="text"
            placeholder="Name"
            {...register("studentName")}
          />
          {errors.studentName && (
            <p className="accounts_error">{errors.studentName.message}</p>
          )}
          <Input
            className="accounts_container_form_input_box"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="accounts_error">{errors.email.message}</p>
          )}
          <Input
            className="accounts_container_form_input_box"
            type="text"
            placeholder="Roll No"
            {...register("studentRollNo")}
          />
          {errors.studentRollNo && (
            <p className="accounts_error">{errors.studentRollNo.message}</p>
          )}
          <Input
            className="accounts_container_form_input_box"
            type="text"
            placeholder="Contact No"
            {...register("studentContactNo")}
          />
          {errors.studentContactNo && (
            <p className="accounts_error">{errors.studentContactNo.message}</p>
          )}
          <Input
            type="text"
            className="accounts_container_form_input_box"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="accounts_error">{errors.password.message}</p>
          )}

          <Input
            type="text"
            className="accounts_container_form_input_box"
            placeholder=" Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="accounts_error">{errors.confirmPassword.message}</p>
          )}

          <Button
            className="accounts_container_form_input_b
          utton"
            size="login"
            type="submit"
          >
            Sign In
          </Button>
        </form>

        <div className="accounts_container_bottom">
          <Link
            className="accounts_container_bottom_button"
            href={"/accounts/login"}
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}
