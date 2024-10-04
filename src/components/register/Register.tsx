import { ReactElement } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card.tsx";
import { registerSchema } from "../../schemas/register.ts";
import { Link } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input.tsx";
import { Button } from "../ui/button.tsx";

export default function Register(): ReactElement {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            company: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        console.log(values);
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
                                        <FormLabel>First Name*</FormLabel>
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
                                        <FormLabel>Last Name*</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"company"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company*</FormLabel>
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
                                        <FormLabel>Email*</FormLabel>
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
                                        <FormLabel>Password*</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
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
                                        <FormLabel>Confirm Password*</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"w-full flex justify-end items-center pt-4"}>
                                <Button>Submit</Button>
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
