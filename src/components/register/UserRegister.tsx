import { ReactElement } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUserSchema } from "@/schemas/register-member.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AxiosResponse } from "axios";
import { useToast } from "@/hooks/use-toast.ts";
import { verifyJWT } from "@/lib/security.ts";
import { useStoreInContext } from "@/lib/zustand.tsx";
import useRegisterUser from "@/requests/register/use-register.tsx";
import Cookies from "js-cookie";

export interface StatePayload {
    avatarUrl: string;
    loggedIn: boolean;
    firstName: string;
    lastName: string;
    email: string;
    expires: Date;
    organization: string;
    iss: string;
    sub: string;
}

export default function UserRegister(): ReactElement {
    const registrationMutation = useRegisterUser();
    const setState = useStoreInContext((state) => state.setState);
    const { toast } = useToast();
    const { code } = useParams();
    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm: "",
        },
    });
    const redirect: NavigateFunction = useNavigate();

    async function onSubmit(values: z.infer<typeof registerUserSchema>): Promise<void> {
        if (!code) {
            toast({
                title: "Oops! 😬",
                description: "Something went wrong!",
                variant: "destructive",
            });

            return;
        }
        const res: AxiosResponse = await registrationMutation.mutateAsync({
            firstName: values.firstName,
            lastName: values.lastName,
            inviteCode: code,
            organizationName: null,
            email: values.email,
            password: values.password,
        });

        if (res.status === 204) {
            const idToken: string | undefined = Cookies.get("id_token");

            if (!idToken) {
                toast({
                    title: "Oops!",
                    description: "Something went wrong!",
                    variant: "destructive",
                });
                return;
            }

            const { payload } = await verifyJWT(idToken);

            setState({
                avatarUrl: "",
                loggedIn: true,
                firstName: payload.first_name,
                lastName: payload.last_name,
                email: payload.email,
                expires: new Date(payload.expiry as string),
                organization: payload.organization,
                iss: payload.iss,
                sub: payload.sub,
            } as StatePayload);
        }

        redirect("/");
    }
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>User Register</CardTitle>
                    <CardDescription>
                        Fill out the information below to register as a part of a pre-existing
                        organization.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={"firstName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            First Name<span className={"text-red-500"}>*</span>
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
                                            Last Name<span className={"text-red-500"}>*</span>
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
                                            Email<span className={"text-red-500"}>*</span>
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
                                            Password<span className={"text-red-500"}>*</span>
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
                                            <span className={"text-red-500"}>*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type={"password"} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"w-full flex justify-end items-center pt-8"}>
                                <Button type={"submit"}>Submit</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className={"flex justify-center items-center"}>
                    <p className={"text-xs"}>
                        Already a member?{" "}
                        <Link className={"text-blue-500"} to={"/login"}>
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
