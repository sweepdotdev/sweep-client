import { ReactElement, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card.tsx";
import { registerSchema } from "../../schemas/register.ts";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";
import { AxiosResponse } from "axios";
import useRegisterUser from "../../requests/register/use-register.tsx";
import { useStoreInContext } from "../../lib/zustand.tsx";

export default function Register(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const registerMutation = useRegisterUser();

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            organizationName: "",
            email: "",
            password: "",
            confirm: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>): Promise<void> {
        const res: AxiosResponse = await registerMutation.mutateAsync({
            firstName: values.firstName,
            lastName: values.lastName,
            organizationName: values.organizationName,
            email: values.email,
            password: values.password,
        });

        if (res.status === 204) {
            navigate("/");
        }
    }
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Enter the information below to sign up for our service.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2"}>
                            <FormField
                                control={form.control}
                                name={"firstName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            First Name
                                            <span className={"text-red-600 p-0 m-0"}>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"lastName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Last Name<span className={"text-red-600"}>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"organizationName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Organization Name
                                            <span className={"text-red-600"}>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email<span className={"text-red-600"}>*</span>
                                        </FormLabel>
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
                                        <FormLabel>
                                            Password<span className={"text-red-600"}>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"confirm"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm Password
                                            <span className={"text-red-600"}>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"w-full flex justify-end items-center pt-4"}>
                                <Button type={"submit"}>Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className={"w-full flex justify-center items-center"}>
                        <p className={"text-xs"}>
                            Already a member?{" "}
                            <Link to={"/login"} className={"text-blue-500"}>
                                Login
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
