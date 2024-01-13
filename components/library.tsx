"use client";
import {TbPlaylist} from "react-icons/tb"
import {AiOutlinePlus} from "react-icons/ai"
import UseAuthModal from "@/hooks/UseAuthModal";
import { useUser } from "@/hooks/UseUser";
import UseUploadModal from "@/hooks/UseUploadModal";
import { Song } from "@/types";
import MediaItem from "./mediaitem";
import useOnPlay from "@/hooks/UseOnPlay";
import UseSubscriptionModal from "@/hooks/UseSubcriptionModal";

interface LibraryProps{
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = UseAuthModal();
    const uploadModal = UseUploadModal();
    const subscriptionModal =  UseSubscriptionModal();
    const { user, subscription } = useUser();
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }
        if(!subscription){
            return subscriptionModal.onOpen();
        }

        return uploadModal.onOpen();
    }
    return ( 
    <div className="flex flex-col">
        <div 
        className="flex
         item-center
         justify-between
         px-5
         pt-4
         text-zinc-900">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist className="" size={26} />
                <p className="font-medium text-md ">Your Library</p>
            </div>
            <AiOutlinePlus
            onClick={onClick}
            className="cursor-pointer hover:text-orange-500 transition"
            size={26}
            />
        </div>
        <div className="flex flex-col text-zinc-900 gap-y-2 mt-4 px-3">
            {songs.map((item) => (
                <MediaItem 
                onClick={(id: string) => onPlay(id)}
                key={item.id}
                data={item}
                />
            ))}
        </div>
    </div>
     );
}
 
export default Library;