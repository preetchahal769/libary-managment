/**
 * The Sign Up Page
 * @description This component renders the sign up page of the application
 * @author      Sajjad Serpedar
 * @since       2021-06-11
 */
"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import axios from "axios";
import { signUpSchemas } from "@/schemas/signUpSchemas";
import { useRouter } from "next/navigation";
import "@/styles/login.css";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

/**
 * The form values interface
 * @typedef FormValues
 * @property {string} studentName - The students name
 * @property {string} email - The students email address
 * @property {string} studentRollNo - The students roll number
 * @property {string} studentContactNo - The students contact number
 * @property {string} password - The students password
 * @property {string} confirmPassword - The students Confirm password
 */
interface FormValues {
  studentName: string;
  email: string;
  studentRollNo: string;
  studentContactNo: string;
  password: string;
  confirmPassword: string;
}

/**
 * The form schema
 * @constant
 * @description This constant defines the form schema
 * @type {z.ZodType<FormValues>}
 */
const FormSchema: z.ZodType<FormValues> = z.object({
  // The students name must be at least 2 characters long
  studentName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // The students email address must be a valid email address
  email: z.string().email({
    message: "Invalid email address.",
  }),
  // The students roll number must be at least 2 characters long
  studentRollNo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // The students contact number must be at least 2 characters long
  studentContactNo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // The students password must be at least 8 characters long
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  // The students confirm password must be at least 8 characters long
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

/**
 * The Sign Up Page Component
 * @description This component renders the sign up page of the application
 * @function Login
 * @returns {JSX.Element} - Rendered sign up page component
 */
export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    // Use the form schema to validate the form
    resolver: zodResolver(FormSchema),
    // Set the default form values
    defaultValues: {
      studentName: "",
      email: "",
      studentRollNo: "",
      studentContactNo: "",
      password: "",
      confirmPassword: "",
    },
  });
  /**
   * Handle the form submission
   * @description This function handles the form submission
   * @function onSubmit
   * @param {FormValues} data - The form submission data
   * @returns {Promise<void>}
   */
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("submited data", data);
    if (data.password !== data.confirmPassword) {
      // If the password and confirm password does not match
      alert("password and confirm password should be same");
    } else {
      try {
        setLoading(true);
        const reqData = {
          // The data to be sent to the server
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
      } catch (error: any) {
        console.log(error);
        toast({
          variant: "destructive",
          description: error.response.data.message,
        });
      } finally {
        setLoading(false);
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
          {/* Render the error message if there is one */}
          {errors.studentName && (
            <p className="accounts_error">{errors.studentName.message}</p>
          )}
          <Input
            className="accounts_container_form_input_box"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {/* Render the error message if there is one */}
          {errors.email && (
            <p className="accounts_error">{errors.email.message}</p>
          )}
          <Input
            className="accounts_container_form_input_box"
            type="text"
            placeholder="Roll No"
            {...register("studentRollNo")}
          />
          {/* Render the error message if there is one */}
          {errors.studentRollNo && (
            <p className="accounts_error">{errors.studentRollNo.message}</p>
          )}
          <Input
            className="accounts_container_form_input_box"
            type="text"
            placeholder="Contact No"
            {...register("studentContactNo")}
          />
          {/* Render the error message if there is one */}
          {errors.studentContactNo && (
            <p className="accounts_error">{errors.studentContactNo.message}</p>
          )}
          <Input
            type="text"
            className="accounts_container_form_input_box"
            placeholder="Password"
            {...register("password")}
          />
          {/* Render the error message if there is one */}
          {errors.password && (
            <p className="accounts_error">{errors.password.message}</p>
          )}

          <Input
            type="text"
            className="accounts_container_form_input_box"
            placeholder=" Confirm Password"
            {...register("confirmPassword")}
          />
          {/* Render the error message if there is one */}
          {errors.confirmPassword && (
            <p className="accounts_error">{errors.confirmPassword.message}</p>
          )}

          {!loading && (
            <Button
              className="accounts_container_form_input_button"
              size="login"
              type="submit"
            >
              Sign In
            </Button>
          )}
          {loading && (
            <Button
              disabled
              className="accounts_container_form_input_button"
              size="login"
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
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
