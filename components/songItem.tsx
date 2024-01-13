"use client";
import useLoadImage from "@/hooks/UseLoadImage";
import { Song } from "@/types"
import Image from "next/image";
import DefaultImg from "@/public/images/liked.png"
import PlayButton from "@/components/playbutton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;

};

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadImage(data);

    return ( 
        <div onClick={() => onClick(data.id)}
        className="
        relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-slate-100
        cursor-pointer hover:bg-slate-200 transition p-3
        "
        >
            <div className="
             relative aspect-square w-full h-full rounded-md overflow-hidden
            ">
                <Image className="
                 object-cover
                " src={imagePath || DefaultImg}
                fill
                priority
                alt="imageCover" 
                />
            </div>
            <div className="
             flex flex-col items-center w-full pt-4 gap-y-1
            ">
                <p className="font-semibold truncate w-full ">{data.title}</p>
                <p className="text-slate-400 pb-4 text-sm w-full truncate">By {data.author}</p>
            </div>
            <div className="
             absolute bottom-24 right-5 
            ">
                <PlayButton />
            </div>
        </div>
     );
}
 
export default SongItem
