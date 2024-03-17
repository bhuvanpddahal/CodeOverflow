"use client";

import {
    ChangeEvent,
    useRef,
    useState,
    useTransition
} from "react";
import Link from "next/link";
import JoditEditor from "jodit-react";
import { notFound, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import FormError from "@/components/FormError";
import UserAvatar from "@/components/UserAvatar";
import FormSuccess from "@/components/FormSuccess";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form";
import {
    ProfilePayload,
    ProfileValidator
} from "@/lib/validators/user";
import { Input } from "@/components/ui/Input";
import { editProfile } from "@/actions/user/editProfile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button, buttonVariants } from "@/components/ui/Button";

interface EditProfileProps {
    userId: string;
    profileName: string;
    username: string;
    image: string | null;
    location: string | null;
    about: string | null;
    websiteLink: string | null;
    twitterLink: string | null;
    githubLink: string | null;
    isCurrentUser: boolean;
}

const EditProfile = ({
    userId,
    profileName,
    username,
    image,
    location,
    about,
    websiteLink,
    twitterLink,
    githubLink,
    isCurrentUser
}: EditProfileProps) => {
    const router = useRouter();
    const editor = useRef(null);
    const user = useCurrentUser();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, startTransition] = useTransition();

    const handleImgChange = (
        e: ChangeEvent<HTMLInputElement>,
        form: UseFormReturn<ProfilePayload, any, ProfilePayload>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                form.setValue("image", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const form = useForm<ProfilePayload>({
        resolver: zodResolver(ProfileValidator),
        defaultValues: {
            userId,
            image: image || "",
            name: profileName,
            username,
            location: location || undefined,
            about: about || "",
            websiteLink: websiteLink || undefined,
            twitterLink: twitterLink || undefined,
            githubLink: githubLink || undefined
        }
    });

    const onSubmit = (payload: ProfilePayload) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            editProfile(payload).then((data: {
                error: string;
                success?: undefined;
            } | {
                success: string;
                error?: undefined;
            }) => {
                if (data.success) {
                    setSuccess(data.success);
                    if(user) {
                        user.image = form.getValues("image");
                        user.name = form.getValues("name");
                        user.username = form.getValues("username");
                    }
                    router.push(`/users/${form.getValues("username")}/edit`);
                }
                if (data.error) {
                    setError(data.error);
                }
            });
        });
        console.log("Form submitted");
    };

    if (!isCurrentUser) return notFound();

    return (
        <div className="flex-1 space-y-4">
            <h3 className="text-xl sm:text-2xl pb-2 font-bold text-slate-700 mb-2 border-b border-zinc-300">Edit your profile</h3>
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div>
                            <h4 className="text-lg sm:text-xl text-zinc-800 mb-2">Public information</h4>
                            <div className="p-3 sm:p-5 border border-b-zinc-300 space-y-3 rounded-md bg-zinc-50/50">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                <h4 className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">Profile image</h4>
                                                <UserAvatar user={{
                                                    name: profileName,
                                                    image: form.getValues("image") // Update the image value
                                                }} className='h-[80px] sm:h-[110px] md:h-[140px] w-[80px] sm:w-[110px] md:w-[140px] rounded-md' />
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='file'
                                                    className="hidden"
                                                    onChange={(e) => handleImgChange(e, form)}
                                                    disabled={isLoading}
                                                    accept='image/*'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">Display name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    className="bg-white max-w-sm"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">User name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    className="bg-white max-w-sm"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">Location</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    className="bg-white max-w-sm"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="about"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">About me</FormLabel>
                                            <FormControl>
                                                <JoditEditor
                                                    {...field}
                                                    ref={editor}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg sm:text-xl text-zinc-800 mb-2">Links</h4>
                            <div className="p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border border-b-zinc-300 rounded-md bg-zinc-50/50">
                                <FormField
                                    control={form.control}
                                    name="websiteLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800 -mb-2">Website link</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    className="bg-white"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="twitterLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">Twitter link</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    className="bg-white"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="githubLink"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm sm:text-base md:text-[17px] font-semibold text-zinc-800">GitHub link</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    className="bg-white"
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormSuccess message={success} />
                        <FormError message={error} />

                        <div className="sm:space-x-3 space-y-3">
                            <Button type="submit" isLoading={isLoading} className="w-full sm:w-fit">
                                {isLoading ? "Saving..." : "Save profile"}
                            </Button>
                            <Link href={`/users/${username}`} className={buttonVariants({
                                variant: "ghost",
                                className: "w-full sm:w-fit"
                            })}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div >
    )
};

export default EditProfile;