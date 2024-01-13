"use client"

import useGetSongById from "@/hooks/UseGetSongById";
import usePlayer from "@/hooks/UsePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import PlayerContent from "./playerContent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl ||  !player.activeId){
        return null;
    } 



    return ( 
        <div className="fixed bottom-0 bg-slate-100 w-full py-2 h-[80px] px-4">
            <PlayerContent 
            song={song} 
            songUrl={songUrl} 
            key={songUrl}/>
        </div>
     );
}
 
export default Player;
