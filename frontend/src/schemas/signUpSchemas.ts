import { z } from "zod"

export const studentNameValidation = z
    .string()
    .min(2, "Student name must be atlest 2 char ")
    .max(20, "student name can contain only less than 20 char")
    .regex(/^[a-zA-Z0-9_]*$/, "Double chek that the student name is not contaning any special char ");


export const signUpSchemas = z.object({
    studentName: studentNameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
    studentRollNo: z.string().min(9, {message:"Invaild Roll no"}).max(10,{message:"Invalid Roll No"}),
    studentContactNo: z.string().min(9, {message:"Invaild Mobile No"}).max(10, {message:"Invalid Mobile No"}),
    password : z.string()
    .min(8, {message:'Password must be at least 8 characters long'}),
       
})    
    