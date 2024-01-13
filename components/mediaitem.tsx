"use client";

import useLoadImage from "@/hooks/UseLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import DefaultImg from "@/public/images/liked.png"
import usePlayer from "@/hooks/UsePlayer";

interface MediaItemProps {
    data: Song;
    onClick?: (id:string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const handleClick = () =>{
        if(onClick){
            return onClick(data.id);
        }
        return player.setId(data.id);
    }
    return ( 
        <div onClick={handleClick}
        className="
         flex items-center gap-x-3 cursor-pointer hover:bg-slate-200 w-full p-2 rounded-md transition
        ">
            <div className=" relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden ">
             <Image alt="library-img"
             fill
             src={imageUrl || DefaultImg}
             className=" object-cover"
             />
            </div>
            <div className=" flex flex-col gap-y-1 overflow-hidden">
                <p className=" truncate">{data.title}</p>
                <p className=" truncate text-slate-400 text-sm">{data.author}</p>
            </div>
        </div>
     );
}
 
export default MediaItem;