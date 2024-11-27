"use client";

import { createClient } from "@/app/_lib/supabase/client";
import { useEffect } from "react";

const RealTime = () => {

    const supabase = createClient();

    useEffect(() => {
        const channel = supabase
            .channel("score_real_time")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "results",
                    // filter: `created_by=eq.${userId}`
                },
                (payload) => {
                    console.log('[realtime]', payload); // les modifications s'y trouvent
                }
            )
            .subscribe();

        // on se désabonne de l'écouteur d'événement quand la composante quitte le navigateur
        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    return (
        <div>
            <p>RealTime?</p>
        </div>
    )
}

export default RealTime;