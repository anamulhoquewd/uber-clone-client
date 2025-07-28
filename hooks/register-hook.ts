import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

import api from "@/api";

const registerUserFormValidation = z
  .object({
    fullname: z.string().min(3, "Full name is required"),
    email: z
      .string()
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: "Must be a valid email address",
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const registerCaptainFormValidation = registerUserFormValidation.extend({
  vehicle: z.object({
    vehicleType: z.enum(["car", "bike", "truck", "cng"]),
    plateNumber: z.string().min(1, "Plate number is required"),
    color: z.string().min(1, "Color is required"),
    capacity: z.number().positive("Capacity must be a positive number"),
  }),
});

const useCaptainRegister = () => {
  const router = useRouter();

  const captainForm = useForm<z.infer<typeof registerCaptainFormValidation>>({
    resolver: zodResolver(registerCaptainFormValidation),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      vehicle: {
        vehicleType: "car",
        plateNumber: "",
        color: "",
        capacity: 1,
      },
    },
  });

  const onSubmit = async (
    data: z.infer<typeof registerCaptainFormValidation>
  ) => {
    try {
      // Send registration request
      const response = await api.post(`/captains/register`, data);

      console.log("response : ", response.data);

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Registration failed");
      }

      // Clear form
      captainForm.reset({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        vehicle: {
          vehicleType: "car",
          plateNumber: "",
          color: "",
          capacity: 1,
        },
      });

      // Redirect to the specified page
      router.push("/auth/login");
    } catch (error: any) {
      // Handle error
      if (error.response && error.response.data) {
        const res = error.response.data;

        // Set form errors if fields are present
        if (res.fields) {
          res.fields.forEach((field: { name: string; message: string }) => {
            captainForm.setError(field.name as "email" | "password", {
              message: field.message,
            });
          });
        } else {
          // Show general error message
          captainForm.setError("root", {
            message: res.message || "Login failed",
          });
        }
      } else {
        // Handle network or other errors
        captainForm.setError("root", {
          message: error.message || "An error occurred",
        });
      }
    }
  };

  return {
    captainForm,
    onSubmit,
    isSubmitting: captainForm.formState.isSubmitting,
  };
};

const useUserRegister = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerUserFormValidation>>({
    resolver: zodResolver(registerUserFormValidation),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerUserFormValidation>) => {
    try {
      // Send registration request
      const response = await api.post(`/auth/register`, data);

      console.log("response : ", response.data);

      if (!response.data.success) {
        throw new Error(response.data?.error?.message || "Registration failed");
      }

      // Clear form
      form.reset({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to the specified page
      router.push("/auth/login");
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

export { useUserRegister, useCaptainRegister };
