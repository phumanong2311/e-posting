import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const LoginPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <div className="text-purple-700 font-bold">ePosting Admin Portal</div>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <Group justify="center" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
