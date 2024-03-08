"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WatchTagPayload, WatchTagValidator } from "@/lib/validators/tag";

export const ignoreTag = async (payload: WatchTagPayload) => {
    try {
        const validatedFields = WatchTagValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        const { tagId } = validatedFields.data;

        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        if(!user) throw new Error("User not found");

        const tag = await db.tag.findUnique({
            where: {
                id: tagId
            }
        });
        if(!tag) throw new Error("Tag not found");

        const alreadyIgnoring = tag.ignorerIds.find((id) => id === session.user.id);

        if(alreadyIgnoring) {
            // If the user is already ignoring the tag,
            // simply remove the user's id from the ignorerIds to unignore it in Tag,
            // & remove the tag's id from the ignoredTagIds to unignore it in User
            const newIgnorerIds = tag.ignorerIds.filter((id) => id !== session.user.id);
            const newIgnoredTagIds = user.ignoredTagIds.filter((id) => id !== tagId);

            await db.tag.update({
                where: {
                    id: tagId
                },
                data: {
                    ignorerIds: newIgnorerIds
                }
            });
            await db.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    ignoredTagIds: newIgnoredTagIds
                }
            });
        } else {
            // If the user is not ignoring the tag
            const alreadyWatching = tag.watcherIds.find((id) => id === session.user.id);
            const newIgnorerIds = [...tag.ignorerIds, session.user.id];
            const newIgnoredTagIds = [...user.ignoredTagIds, tagId];

            if(alreadyWatching) {
                // If the user is watching the tag, unwatch it by removing user's id from the watcherIds
                // and add the user's id to the ignorerIds to ignore the tag in Tag.
                // For User, remove the tag id from the watchedTagIds and add it to ignoredTagIds
                const newWatcherIds = tag.watcherIds.filter((id) => id !== session.user.id);
                const newWatchedTagIds = user.watchedTagIds.filter((id) => id !== tagId);

                await db.tag.update({
                    where: {
                        id: tagId
                    },
                    data: {
                        watcherIds: newWatcherIds,
                        ignorerIds: newIgnorerIds
                    }
                });
                await db.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: {
                        watchedTagIds: newWatchedTagIds,
                        ignoredTagIds: newIgnoredTagIds
                    }
                });
            } else {
                // Else if the user is not watching the tag,
                // simply and add the user's id to the ignorerIds to ignore the tag in Tag,
                // and add the tag's id in the ignoredTagIds to ignore the tag in User
                await db.tag.update({
                    where: {
                        id: tagId
                    },
                    data: {
                        ignorerIds: newIgnorerIds
                    }
                });
                await db.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: {
                        ignoredTagIds: newIgnoredTagIds
                    }
                });
            }
        }

        return { status: 200 };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};