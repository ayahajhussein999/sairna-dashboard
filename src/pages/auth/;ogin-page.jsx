import { useState } from "react";
import { useLogin } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/token-storage";
import CustomButton from "../../components/ui/custom-button";
import CustomInput from "../../components/ui/custom-input";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();

    login(form, {
      onSuccess: (data) => {
        if (!data?.accessToken) {
          console.error("Login response has no accessToken:", data);
          return;
        }

        setToken(data.accessToken);
        navigate("/overview");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-primary bg-surface p-8 shadow-xl shadow-dark/5 sm:p-10">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-dark">
            SAIRNA
            <span className="text-primary"> ADMIN</span>
          </h1>

          <p className="mt-3 text-sm text-muted">
            Sign in to manage your dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <CustomInput
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {isError && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              Login failed:{" "}
              {error?.response?.data?.message ||
                error.message}
            </p>
          )}

          <div className="w-full pt-2">
  <CustomButton type="submit" loading={isPending}>
    Login
  </CustomButton>
</div>
        </form>

        <div className="mt-7 border-t border-border pt-5 text-center">
          <p className="text-xs text-muted">
            Secure access to your dashboard
          </p>
        </div>
      </div>
    </div>
  );
}