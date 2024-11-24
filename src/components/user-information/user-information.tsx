import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";

import { ReactElement, useEffect, useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useStoreInContext } from "@/lib/zustand.tsx";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label.tsx";
import { getInviteCode } from "@/requests/user/get-invite-code.ts";
import { Button } from "@/components/ui/button.tsx";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast.ts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { z } from "zod";
import { UploadPictureSchema } from "@/schemas/upload-picture";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import useUploadAvatar from "@/requests/user/use-upload-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import getUserAvatarUrl from "@/requests/user/get-avatar-url";

interface InviteCode {
    id: string;
    organization_id: string;
    invite_code: string;
    created_at: string;
}

export default function UserInformation(): ReactElement {
    const { sub, organization, email, lastName, firstName, loggedIn, avatarUrl } =
        useStoreInContext((state) => state.getState());
    const setAvatarUrl = useStoreInContext((state) => state.setAvatarUrl);
    const redirect: NavigateFunction = useNavigate();

    useEffect(() => {
        if (!loggedIn) redirect("/login");
    }, [loggedIn, redirect]);

    const getAvatarQuery = useQuery({
        queryKey: ["get-avatar", sub],
        queryFn: async (): Promise<AxiosResponse> => await getUserAvatarUrl(),
        retry: false,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (getAvatarQuery.isSuccess) {
            setAvatarUrl(getAvatarQuery.data.data.data.avatar_url);
        }
    }, [avatarUrl, getAvatarQuery.data]);

    const form = useForm<z.infer<typeof UploadPictureSchema>>({
        resolver: zodResolver(UploadPictureSchema),
    });
    const fileRef: UseFormRegisterReturn<"profileImage"> = form.register("profileImage");
    const uploadPhotoMutation = useUploadAvatar();

    async function onSubmit(values: z.infer<typeof UploadPictureSchema>): Promise<void> {
        const res: AxiosResponse = await uploadPhotoMutation.mutateAsync({
            file: values.profileImage[0],
        });

        if (res.status === 200) {
            setAvatarUrl(res.data[0]);
        }
    }

    const inviteCodeQuery = useQuery({
        queryKey: ["inviteCode", organization],
        queryFn: async (): Promise<AxiosResponse> => {
            return await getInviteCode({ organizationId: organization });
        },
    });

    const [orgInvitations, setInviteCode] = useState<InviteCode[]>([
        { id: "", invite_code: "", organization_id: "", created_at: "" },
    ]);

    const { toast } = useToast();

    useEffect(() => {
        if (inviteCodeQuery.data?.data) {
            setInviteCode(inviteCodeQuery.data?.data);
        }
    }, [inviteCodeQuery.data]);

    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(
                `${import.meta.env.VITE_APP_BASE_URL}/register/user/${orgInvitations[0].invite_code}`,
            );
            toast({
                title: "Copied! 💾",
                description: "You've copied the invite code to your clipboard.",
                className: "bg-green-500",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Copy Failed!",
                description: "Something went wrong!",
                variant: "destructive",
            });
        }
    }

    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card className={"shadow-2xl"}>
                <CardHeader>
                    <div className={"flex space-x-4"}>
                        <div>
                            {avatarUrl ? (
                                <Avatar>
                                    <AvatarImage src={avatarUrl!} />
                                    <AvatarFallback>
                                        <Skeleton className={"h-8 w-8 rounded-full"} />
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div>
                            <CardTitle>User Information</CardTitle>
                            <CardDescription>
                                Below is your basic user information you entered while signing up.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className={"space-y-2"}>
                    <div>
                        <Label htmlFor={"firstName"}>First Name</Label>
                        <Input id={"firstName"} value={firstName} readOnly />
                    </div>
                    <div>
                        <Label htmlFor={"lastName"}>Last Name</Label>
                        <Input id={"lastName"} value={lastName} readOnly />
                    </div>
                    <div>
                        <Label htmlFor={"email"}>Email</Label>
                        <Input id={"email"} value={email} readOnly />
                    </div>

                    {orgInvitations[0].invite_code ? (
                        <div>
                            <Label htmlFor={"inviteCode"}>Invite Code</Label>
                            <div className={"flex items-center space-x-2"}>
                                <Input
                                    className={"text-xs"}
                                    id={"inviteCode"}
                                    value={`${import.meta.env.VITE_APP_BASE_URL}/register/user/${orgInvitations[0].invite_code}`}
                                    readOnly
                                />
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size={"sm"} onClick={copyToClipboard}>
                                            <Copy className={"h-4 w-4"} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span>Copy to Clipboard</span>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {!avatarUrl ? (
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} id={"profilePicture"}>
                                    <FormField
                                        control={form.control}
                                        name={"profileImage"}
                                        render={() => (
                                            <FormItem>
                                                <div className={"flex justify-between"}>
                                                    <FormLabel htmlFor={"fileUpload"}>
                                                        Upload Profile Picture
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                                <FormControl>
                                                    <Input
                                                        id={"fileUpload"}
                                                        type={"file"}
                                                        className={"cursor-pointer"}
                                                        {...fileRef}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                            <div className={"w-full flex justify-end"}>
                                <Button form={"profilePicture"} className={"mt-2"} type={"submit"}>
                                    Upload Picture
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
