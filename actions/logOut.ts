"use server";

import { signOut } from "@/auth";

export const logOut = async () => {
    // some server stuff you want to do before logging out
    await signOut();
};