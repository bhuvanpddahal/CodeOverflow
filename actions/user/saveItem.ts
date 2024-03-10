"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { SaveItemPayload, SaveItemValidator } from "@/lib/validators/user";

export const saveItem = async (payload: SaveItemPayload) => {
    try {
        const validatedFields = SaveItemValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        const { itemId, itemType } = validatedFields.data;

        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        if(!user) throw new Error("User not found");

        const alreadySaved = await db.save.findFirst({
            where: {
                saverId: session.user.id,
                itemId
            }
        });

        if(alreadySaved) {
            // Remove the item from saves if user is unsaving it
            await db.save.delete({
                where: {
                    id: alreadySaved.id
                }
            });
        } else {
            // Save the item by creating a new document
            await db.save.create({
                data: {
                    saverId: session.user.id,
                    itemId,
                    itemType
                }
            });
        }

        return { status: 200 };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};