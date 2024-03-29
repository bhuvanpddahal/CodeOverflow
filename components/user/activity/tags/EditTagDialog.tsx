"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/Dialog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { editTag } from "@/actions/tag/editTag";
import { Textarea } from "@/components/ui/Textarea";

interface EditTagDialogProps {
    children: React.ReactNode;
    initialName: string;
    initialDescription: string | null;
}

const EditTagDialog = ({
    children,
    initialName,
    initialDescription
}: EditTagDialogProps) => {
    const { toast } = useToast();
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription || "");

    const {
        mutate: edit,
        isPending
    } = useMutation({
        mutationFn: async () => {
            const payload = { name, description };
            await editTag(payload);
        },
        onSuccess: () => {
            toast({
                description: "Tag edited successfully"
            });
        },
        onError: () => {
            toast({
                description: "Could not edit the tag",
                variant: "destructive"
            });
        }
    });

    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit tag</DialogTitle>
                    <DialogDescription>
                        Make changes to your tag. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={() => edit()} className="space-y-4">
                    <Input
                        disabled={isPending}
                        required
                        maxLength={16}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tag name"
                    />
                    <Textarea
                        disabled={isPending}
                        required
                        maxLength={200}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tag description"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            isLoading={isPending}
                        >
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default EditTagDialog;