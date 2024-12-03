"use client";

import { createClient } from "@/app/_lib/supabase/client";
import { useEffect } from "react";

const RealTime = () => {

    const supabase = createClient();

    useEffect(() => {

        const onChangeHandler = (payload) => {
            console.log(payload);
            const { attempts } = payload.new;
            //Trouver comment mettre à jour le state dans le parent component avec ces nouvelles valeurs
        };


        const channel = supabase
            .channel("score_real_time")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "results",
                },
                onChangeHandler
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "results",
                    // filter: `created_by=eq.${userId}`
                },
                onChangeHandler
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