import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/Validation/index";
import { z } from "zod";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {useSignInAccount} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/Context/AuthContext";

import { useState } from "react"; // Import useState

export default function SigninForm() {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const [isPending, setIsPending] = useState(false); // Add state to manage loading state
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    setIsPending(true); // Set loading to true when submission starts
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast({ title: "Failed, Please try again" });
        setIsPending(false); // Set loading back to false
        return;
      }

      const isLoggedIn = await checkAuthUser();
      console.log("Is Logged In: ", isLoggedIn); // Debugging step to ensure user is logged in

      if (isLoggedIn) {
        form.reset(); // Reset the form after successful sign-in
        navigate("/"); // Redirect to homepage
      } else {
        toast({ title: "Login not successful" });
      }
    } catch (error: any) {
      console.error("Login error:", error); // Log error for debugging
      if (error.code === 409) {
        toast({ title: "User already exists. Please login." });
      } else {
        toast({ title: "An error occurred during login." });
      }
    } finally {
      setIsPending(false); // Set loading back to false after submission
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login To your Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use ChitChat, please enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary" disabled={isPending || isUserLoading}>
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
