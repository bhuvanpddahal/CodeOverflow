"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { EditTagPayload, EditTagValidator } from "@/lib/validators/tag";

export const editTag = async (payload: EditTagPayload) => {
    try {
        const validatedFields = EditTagValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        const { name, description } = validatedFields.data;
        const trimmedDescription = description.trim();

        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const tag = await db.tag.findUnique({
            where: { name }
        });
        if(!tag) throw new Error("Tag not found");

        if(tag.creatorId !== session.user.id) throw new Error("Not allowed");

        await db.tag.update({
            where: { name },
            data: {
                name,
                description: trimmedDescription ? trimmedDescription : undefined
            }
        });

        return { success: "Tag edited" };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};