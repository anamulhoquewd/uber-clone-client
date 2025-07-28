import api from "@/api";
import { setStorage } from "@/storage/local";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormValidation = z.object({
  email: z
    .string()
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Must be a valid email address",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const useLogin = (
  role: "auth" | "captains",
  { redirectTo = `/${role}/dashboard` }: { redirectTo?: string }
) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormValidation>>({
    resolver: zodResolver(loginFormValidation),
    defaultValues: {
      email: "anamulhoquewd@gmail.com",
      password: "pass1234",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormValidation>) => {
    try {
      // Send login request
      const response = await api.post(`/${role}/login`, data);

      console.log("response : ", response.data);

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Login failed");
      }
      // Set auth token
      const authToken = response.data.token;

      // Set auth token in local storage
      setStorage("token", authToken);

      // Clear form
      form.reset({
        email: "",
        password: "",
      });

      // Redirect to home page
      router.push(redirectTo);
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        const res = error.response.data;

        // Set form errors if fields are present
        if (res.fields) {
          res.fields.forEach((field: { name: string; message: string }) => {
            form.setError(field.name as "email" | "password", {
              message: field.message,
            });
          });
        } else {
          // Show general error message
          form.setError("root", {
            message: res.message || "Login failed",
          });
        }
      } else {
        // Handle network or other errors
        form.setError("root", {
          message: error.message || "An error occurred",
        });
      }
    }
  };

  return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
};

export default useLogin;
