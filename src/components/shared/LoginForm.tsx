import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Title from "../ui/title";
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from "@/lib/helpers/notification";
import { requestLogin } from "@/api/user/user";
import { uiActions } from "@/store/ui";
import { useDispatch } from "react-redux";
import { fetchUser } from "@/store/ui/thunks";

const formSchema = z.object({
  email: z.string().email({ message: "incorrect email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await requestLogin(values.email, values.password);
      showInfoNotification("Запрашиваем данные об аккаунте...");
      await fetchUser(dispatch);
      showSuccessNotification("Вы успешно вошли в аккаунт!");
      dispatch(uiActions.closeModal());
    } catch (e) {
      alert(JSON.stringify(e));
      showErrorNotification("Не удалось войти в аккаунт, попробуйте еще раз.");
    }
  }
  return (
    <div className="w-96 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col space-y-1.5 p-6 m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          <Title size="sm" text={"Авторизация"} />
          <p>
            Введите свой адрес электронной почты ниже, чтобы войти в свою
            учетную запись
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </Form>
      <a
        className="text-black text-center mx-auto cursor-pointer"
        onClick={() => dispatch(uiActions.setModalOpened("register"))}
      >
        Нет аккаунта? Зарегистрироваться!
      </a>
    </div>
  );
};

export default LoginForm;
