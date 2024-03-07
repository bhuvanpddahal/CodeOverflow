"use server";

import { v2 as cloudinary } from "cloudinary";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { ProfilePayload, ProfileValidator } from "../lib/validators/user";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const editProfile = async (payload: ProfilePayload) => {
    try {
        const validatedFields = ProfileValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        const { userId, image, name, username, location, about, websiteLink, twitterLink, githubLink } = validatedFields.data;

        if (!session?.user || !session.user.id) return { error: "Unauthorized" };
        if(userId !== session.user.id) return { error: "Not allowed" };

        let imageUrl = image;
        if(image?.length) imageUrl = (await cloudinary.uploader.upload(image)).secure_url;

        await db.user.update({
            where: {
                id: userId
            },
            data: {
                image: imageUrl,
                name,
                username,
                location,
                about: about.trim().length ? about : undefined,
                websiteLink,
                twitterLink,
                githubLink
            }
        });

        return { success: "Profile edited" };
    } catch (error) {
        return { error: "Something went wrong" };
    }
};