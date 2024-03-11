"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
    GetUserSavedItemsPayload,
    GetUserSavedItemsValidator
} from "@/lib/validators/user";

export const getUserSavedItems = async (payload: GetUserSavedItemsPayload) => {
    try {
        const validatedFields = GetUserSavedItemsValidator.safeParse(payload);
        if (!validatedFields.success) throw new Error("Invalid fields");

        const session = await auth();
        const { sort, page, limit } = validatedFields.data;
        let orderByCaluse = {};

        if (!session?.user || !session.user.id) throw new Error("Unauthorized");

        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        });
        if(!user) throw new Error("User not found");
        
        // TODO - Implement the sorting of tags
        if (sort === "score") {
            orderByCaluse = {};
        } else if (sort === "views") {
            orderByCaluse = {};
        } else if (sort === "newest") {
            orderByCaluse = {};
        }

        const items = await db.save.findMany({
            where: {
                saverId: session.user.id
            },
            orderBy: orderByCaluse,
            take: limit,
            skip: (page - 1) * limit,
            include: {
                question: {
                    select: {
                        votes: {
                            select: {
                                type: true
                            }
                        },
                        answers: {
                            select: {
                                id: true
                            }
                        },
                        views: true,
                        title: true,
                        tags: {
                            select: {
                                name: true
                            }
                        },
                        asker: {
                            select: {
                                image: true,
                                name: true,
                                username: true
                            }
                        },
                        askedAt: true
                    }
                },
                answer: {
                    select: {
                        question: {
                            select: {
                                id: true,
                                votes: {
                                    select: {
                                        type: true
                                    }
                                },
                                answers: {
                                    select: {
                                        id: true
                                    }
                                },
                                views: true,
                                title: true,
                                tags: {
                                    select: {
                                        name: true
                                    }
                                },
                                asker: {
                                    select: {
                                        image: true,
                                        name: true,
                                        username: true
                                    }
                                },
                                askedAt: true,
                                updatedAt: true
                            }
                        },
                        votes: {
                            select: {
                                type: true
                            }
                        },
                        content: true,
                        answerer: {
                            select: {
                                image: true,
                                name: true,
                                username: true
                            }
                        },
                        answeredAt: true,
                        updatedAt: true
                    }
                }
            }
        });

        const totalItems = await db.save.count({
            where: { saverId: session.user.id }
        });
        const lastPage = Math.ceil(totalItems / limit);

        return { items, totalItems, lastPage };
    } catch (error) {
        throw new Error("Something went wrong");
    }
};