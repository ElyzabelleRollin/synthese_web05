"use server";

import { createClient } from "../_lib/supabase/server";

export const addXp = async (xp) => {
    //Access to Supabase
    const supabase = createClient();

    //Get user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    //Fetch the existing xp of the user
    const { data: xpData, error: getXpError } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", user.id)
        .single();

    //UPDATE the xp of the user in the profiles table
    const { error: xpError } = await supabase
        .from("profiles")
        .update({ xp: xpData.xp + xp })
        .eq("id", user.id);
    if (xpError) {
        console.log("[Update xp]:", xpError);
    }

    //Fetch the badges data
    const { data: badgesData, error: getBadgesError } = await supabase
        .from("badges")
        .select("id, name, description, xp_needed");
    // console.log("[Badges]", badgesData);

    //If the user has enough xp, insert the badge in the profiles_badges table, but ONLY if the badge is not already in the table
    badgesData.forEach(async (badge) => {
        if (xpData.xp >= badge.xp_needed) {
            const { data: existingBadge, error: existingBadgeError } = await supabase
                .from("profiles_badges")
                .select("id")
                .eq("profile_id", user.id)
                .eq("badge_id", badge.id)
                .single();
            if (!existingBadge) {
                const { error: insertBadgeError } = await supabase
                    .from("profiles_badges")
                    .insert({ profile_id: user.id, badge_id: badge.id });
                if (insertBadgeError) {
                    console.log("[Insert badge]:", insertBadgeError);
                }
            }
        }
    });
}
