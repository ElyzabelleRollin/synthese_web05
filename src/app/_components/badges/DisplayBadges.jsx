import { createClient } from '@/app/_lib/supabase/server';
import Badge from './Badge';

const DisplayBadges = async ({ userId }) => {
    //Access to the database
    const superbase = createClient();


    //Fetch the all the badges from the database
    const { data: badges } = await superbase
        .from("badges")
        .select("*")
        .order('xp_needed', { ascending: true })

    //Fetch the badges of the user from the profiles_badges table
    const { data: profilesBadges } = await superbase
        .from("profiles_badges")
        .select("*")
        .eq("profile_id", userId);

    return (
        <div>
            {badges.map((badge) => {
                // Check if user has this badge
                const isUnlocked = profilesBadges?.some(
                    (profileBadge) => profileBadge.badge_id === badge.id
                );

                return (
                    <Badge
                        key={badge.id}
                        badge={badge}
                        isUnlocked={isUnlocked}
                    />
                );
            })}
        </div>
    )
};

export default DisplayBadges;

