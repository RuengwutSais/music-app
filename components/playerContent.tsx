"use client"

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { Song } from "@/types";
import MediaItem from "./mediaitem";
import LikeButton from "./likebutton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "./slider";
import usePlayer from "@/hooks/UsePlayer";
import { useEffect, useState } from "react";
import useSound from 'use-sound';

interface PlayerContentProps{
    song: Song,
    songUrl: string,
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
}) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsplaying] = useState(false);
    const Icon = isPlaying ? BsPauseFill :  BsPlayFill
    const VolumnIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if(player.ids.length === 0){
            return;
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId );
        const nexSong = player.ids[currentIndex + 1];

        if(!nexSong){
            return player.setId(player.ids[0]);
        }

        player.setId(nexSong);
    }

    const onPlayPrevious = () => {
        if(player.ids.length === 0){
            return;
        }
        const currentIndex = player.ids.findIndex((id) => id === player.activeId );
        const previousSong = player.ids[currentIndex - 1];

        if(!previousSong){
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsplaying(true),
            onend: () => {
                setIsplaying(false);
                onPlayNext();
            },
            onpause: () => setIsplaying(false),
            format: ["mp3"]
        }
    );

    useEffect(() => {
        sound?.play();
        
        return () => {
            sound?.unload();
        }
    },[sound]);

    const handlePlay = () =>{
        if(!isPlaying){
            play();
        }
        else{
            pause();
        }
    }

    const toggleMute = () => {
        if(volume === 0){
            setVolume(1);
        }
        else{
            setVolume(0);
        }
    }

    return ( 
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>

            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div onClick={handlePlay}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 p-1 cursor-pointer">
                    <Icon size={30} className="text-white"/>
                </div>
            </div>

            <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward size={30} 
                className="text-slate-900 cursor-pointer hover:text-orange-500 transition"
                onClick={onPlayPrevious}/>

                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 p-1 cursor-pointer" 
                onClick={handlePlay}>
                    <Icon size={30} className="text-white"/>
                </div>

                <AiFillStepForward size={30} 
                className="text-slate-900 cursor-pointer hover:text-orange-500 transition"
                onClick={onPlayNext}/>
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumnIcon onClick={toggleMute}
                    className="cursor-pointer"
                    size={34}/>
                    <Slider value={volume} onChange={(value) => setVolume(value)}/>
                </div>

            </div>
        </div>
     );
}
 
export default PlayerContent;