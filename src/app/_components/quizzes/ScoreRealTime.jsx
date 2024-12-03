// "use client";
// import { createClient } from "@/app/_lib/supabase/client";
// import { useEffect } from "react";

// //NOTE FROM AME: WILL DELETE THIS COMPONENT LATER

// const ScoreRealTime = ({ highestScore, attempts, nbQuestions, userId }) => {

//     console.log(userId);
//     const supabase = createClient();


//     useEffect(() => {
//         const channel = supabase
//             .channel("score_real_time")
//             .on(
//                 "postgres_changes",
//                 {
//                     event: "UPDATE",
//                     schema: "public",
//                     table: "results",
//                     // filter: `created_by=eq.${userId}`
//                 },
//                 (payload) => {
//                     console.log('[realtime]', payload); // les modifications s'y trouvent
//                 }
//             )
//             .subscribe();

//         // on se désabonne de l'écouteur d'événement quand la composante quitte le navigateur
//         return () => {
//             supabase.removeChannel(channel);
//         };
//     }, [supabase]);

//     return (
//         <div>
//             <p>
//                 Highest score: {highestScore} / {nbQuestions}
//             </p>
//             <p>Number of attempts: {attempts}</p>
//         </div>
//     )
// };

// export default ScoreRealTime;
