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
import { Checkbox } from "@/components/ui/checkbox";
import useCreateChangeRequest from "@/requests/change-requests/use-create-change-request";
import { AxiosResponse } from "axios";

export default function CreateChangeRequests(): ReactElement {
    const loggedIn: boolean = useStoreInContext((state) => state.loggedIn);
    const redirect = useNavigate();
    const changeRequestMutation = useCreateChangeRequest();

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
        const res: AxiosResponse = await changeRequestMutation.mutateAsync({
            command: values.command,
            packageManager: values.packageManager,
            packageManagerVersion: values.packageManagerVersion,
            customCommitMessage: values.customCommitMessage,
            customBranchName: values.customBranchName,
            customPullRequestTitle: values.customPullRequestTitle,
            eligibleGitNamespaces: values.eligibleGitNamespaces,
            dryRun: values.dryRun,
        });

        console.log(res);
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
                        <form
                            id={"changeRequest"}
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name={"command"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Command</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={"font-mono"}
                                                placeholder={"python -m pip install --upgrade pip"}
                                                {...field}
                                            />
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
                                            <Input
                                                className={"font-mono"}
                                                placeholder={"pip"}
                                                {...field}
                                            />
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
                                            <Input
                                                className={"font-mono"}
                                                placeholder={"24.1"}
                                                {...field}
                                            />
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
                                            <Input
                                                className={"font-mono"}
                                                placeholder={"Updated pip to latest version"}
                                                {...field}
                                            />
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
                                            <Input
                                                className={"font-mono"}
                                                placeholder={"pip-update"}
                                                {...field}
                                            />
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
                                            <Input
                                                className={"font-mono"}
                                                placeholder={"Upgraded Pip To Latest Version"}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={"dryRun"}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className={"flex items-center space-x-2"}>
                                            <FormLabel>
                                                Dry-Run ({field.value ? "Yes" : "No"})
                                            </FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    className={"h-5 w-5"}
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </div>

                                        <FormDescription>
                                            When enabled, dry run won't apply the issued command to
                                            the actual repository, but instead will will just test
                                            the command.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className={"w-full flex justify-end"}>
                        <Button form={"changeRequest"} type={"submit"}>
                            Submit
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
