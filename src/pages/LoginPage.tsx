import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { IconEye, IconMail } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppProviderCtx } from "../app-provider";
import { toast } from "../lib/toast";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { LoginPayload } from "../types/Auth";
import { ResponseWrapper } from "../types/ResponseWrapper";

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    func: { updateUser },
  } = useAppProviderCtx();
  const [showPass, setShowPass] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const getUser = useMutation({
    mutationFn: () =>
      userService.getMe().then((res: ResponseWrapper) => {
        if (res.result) {
          updateUser(res.result);
          toast.success("Login Successful !");
          navigate("/dashboard/profile");
        }
      }),
    onError: async (error: Error) => {
      toast.error(`Login Failed !, ${error.message}`);
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    await authService.login(data).then((r) => {
      localStorage.setItem("accessToken", r.accessToken);
    });
    await getUser.mutateAsync();
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="min-w-[800px]">
        <div className="text-purple-700 font-bold text-3xl mb-[50px]">
          ePosting Admin Portal
        </div>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label={<p className="text-lg text-black-300 mb-2">Email Address</p>}
            placeholder="william@eposting.com"
            className="w-full"
            size="lg"
            radius={10}
            leftSection={<IconMail className="text-black" color="black" />}
            {...form.getInputProps("email")}
          />
          <p className="text-sm text-gray-300 mt-2">
            must use an email under the domain "@eposting.com"
          </p>
          <TextInput
            label={<p className="text-lg text-black-300 mb-2">Password</p>}
            placeholder="Password"
            type={!showPass ? "password" : "text"}
            className="w-full mt-5"
            size="lg"
            radius={10}
            rightSection={
              <IconEye
                onClick={() => setShowPass(!showPass)}
                className="text-black"
                color="black"
              />
            }
            {...form.getInputProps("password")}
          />
          <p className="text-sm text-gray-300 mt-2">
            this is a different email password than your ePosting google account
            password
          </p>
          <Group justify="center" mt="xl">
            <Button
              type="submit"
              className="w-full bg-[#7167e8]"
              size="lg"
              radius={10}
            >
              Sign in
            </Button>
          </Group>
          <div className="mt-4 w-full flex justify-between items-center">
            <Checkbox
              label={
                <p className="text-[16px] font-medium text-black">
                  Remember me
                </p>
              }
            />

            <Link to="/forgot-password">
              <p className="text-[16px] font-medium text-[#7e75ea]">
                Forgot password?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
