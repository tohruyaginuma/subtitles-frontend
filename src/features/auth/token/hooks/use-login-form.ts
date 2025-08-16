import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/features/auth/token/schemas/login-schema";
import { useUserStore } from "@/features/auth/me/stores/use-user-store";
import { useLoginDialogStore } from "@/features/auth/token/stores/use-login-dialog-store";
import { loginService } from "@/features/auth/token/services/login-services";
import { toast } from "sonner";
import { meService } from "@/features/auth/me/services/me-services";

export function useLoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useUserStore();
  const { onClose } = useLoginDialogStore();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const fail = (msg = "Login failed.", desc = "Please try again.") => {
      form.setError("email", {});
      form.setError("password", {});
      toast.error(msg, { description: desc });
    };

    try {
      const loginResponse = await loginService(values.email, values.password);
      if (loginResponse && "error" in loginResponse && loginResponse.error) {
        fail(loginResponse.error.message ?? "Login failed.");
        return;
      }

      const meResponse = await meService();

      if (meResponse && "error" in meResponse && meResponse.error) {
        fail(meResponse.error.message ?? "Login failed.");
        return;
      }

      if ("email" in meResponse) {
        login({ email: meResponse.email });
      }

      onClose();
      toast.success("Login successful.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : undefined;
      fail("Login failed.", msg ?? "Please try again.");
    }
  }

  return {
    form,
    onSubmit,
  };
}
