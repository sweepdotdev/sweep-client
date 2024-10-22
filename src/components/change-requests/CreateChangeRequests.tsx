import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";

import { z } from "zod";
import { ReactElement, useEffect } from "react";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { changeRequestSchema } from "@/schemas/change-requests";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateChangeRequests(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const redirect = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            redirect("/login");
        }
    }, [loggedIn]);

    const form = useForm<z.infer<typeof changeRequestSchema>>({
        resolver: zodResolver(changeRequestSchema),
        defaultValues: {
            command: "",
            packageManager: "",
            packageManagerVersion: "",
            customCommitMessage: "",
            customBranchName: "",
            customPullRequestTitle: "",
            eligibleGitNamespaces: [""],
            dryRun: true,
        },
    });

    async function onSubmit(values: z.infer<typeof changeRequestSchema>): Promise<void> {
        console.log(values);
    }

    return (
        <div className={"h-full w-full flex justify-center items-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>Create a Change Request</CardTitle>
                    <CardDescription>
                        Enter the information below to create a change request
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name={"command"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Command</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the command you would like to apply across
                                            repositories.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"packageManager"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package Manager</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"packageManagerVersion"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package Manager Version</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"customCommitMessage"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Commit Message</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"customBranchName"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"customPullRequestTitle"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pull Request Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className={"w-full flex justify-end"}>
                        <Button>Submit</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
