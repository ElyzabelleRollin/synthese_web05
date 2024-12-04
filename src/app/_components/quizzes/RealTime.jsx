"use client";

import { createClient } from "@/app/_lib/supabase/client";
import { useEffect } from "react";

const RealTime = ({ userId, setCurrentScore }) => {
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("score_real_time")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "quizzes",
          // filter: `created_by=eq.${userId}`
        },
        (payload) => {
          console.log(payload); // les modifications s'y trouvent
          const { attempts, average, id } = payload.new;
          //Trouver comment mettre à jour le state dans le parent component avec ces nouvelles valeurs
          setCurrentScore({ attempts, average, id });
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
  );
};

export default RealTime;
