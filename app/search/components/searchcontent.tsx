"use client";
import { Song } from "@/types"
import MediaItem from "@/components/mediaitem";
import LikeButton from "@/components/likebutton";
import useOnPlay from "@/hooks/UseOnPlay";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}
) => {

    const onPlay = useOnPlay(songs);

    if (songs.length === 0){
        return (
            <div className="flex flex-col gap-y-2 w-full py-6 text-slate-300">
                No songs Found.
            </div>
        )
    } 
        
    return ( 
        <div className="
         flex flex-col gap-y-2 w-full py-6
        ">
            {songs.map((song)=> (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className=" flex-1 ">
                        <MediaItem data={song} onClick={(id: string) => onPlay(id)}/>
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
     );
}
 
export default PageContent;