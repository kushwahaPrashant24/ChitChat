import { z } from "zod";

export  const SignupValidation = z.object({
    name:z.string().min(2, {message: 'to short'}),
    username: z.string().min(2 , {message: 'to short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message : 'Password must be atleast 8 characters.'})
  });

  export  const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message : 'Password must be atleast 8 characters.'})
  });