import { ReactElement } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card.tsx";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/login.ts";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import useLogin from "../../requests/login/use-login.tsx";
import Cookies from "js-cookie";
import verifyJWT from "../../lib/security.ts";
import { SessionActions, SessionState, useStoreInContext } from "../../lib/zustand.tsx";

export default function Login(): ReactElement {
    const loginMutation = useLogin();
    const setState = useStoreInContext((state: SessionState & SessionActions) => state.setState);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>): Promise<void> {
        await loginMutation.mutateAsync({
            email: values.email,
            password: values.password,
        });

        const rawSessionToken: string = Cookies.get("id_token") || "";

        const { payload } = await verifyJWT(rawSessionToken);

        setState({
            firstName: payload.first_name as string,
            lastName: payload.last_name as string,
            email: payload.email as string,
            expires: new Date(payload.expiry as string),
            organization: payload.organization as string,
            iss: payload.iss as string,
            sub: payload.sub as string,
        });
    }
    return (
        <div className={"h-full w-full flex justify-center items-center"}>
            <Card className={"shadow-2xl"}>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your email and password to login into your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"password"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"w-full flex justify-end pt-4"}>
                                <Button type={"submit"}>Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className={"w-full flex justify-center items-center"}>
                        <p className={"text-xs"}>
                            Don't have an account?{" "}
                            <Link to={"/register"} className={"hover:underline text-blue-500"}>
                                Register
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
