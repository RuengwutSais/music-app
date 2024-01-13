"use client";

import UseAuthModal from "@/hooks/UseAuthModal";
import { useUser } from "@/hooks/UseUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = UseAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() =>{
        if(!user?.id){
            return;
        }
        const fetchData = async () => {
            const { data, error } =  await supabaseClient
            .from('fav_song')
            .select('*')
            .eq('user_id',user.id)
            .eq('song_id',songId)
            .single()

            if(!error && data){
                setIsLiked(true);
            }


        }
        
        fetchData();

    }, [songId, supabaseClient, user?.id]);

    const Icon =  isLiked ? AiFillHeart :  AiOutlineHeart;
    const handleLike = async () => {
        if(!user){
            return authModal.onOpen();
        }

        if(isLiked){
            const { error } = await supabaseClient
            .from("fav_song")
            .delete()
            .eq("user_id",user.id)
            .eq("song_id",songId)

            if(error){
                toast.error(error.message);
            }
            else{
                setIsLiked(false);
            }
        }
        else
        {
            const { error } = await supabaseClient
            .from("fav_song")
            .insert({
                song_id: songId,
                user_id: user.id
            });
            if(error){
                toast.error(error.message);
            }
            else
            {
                setIsLiked(true);
                toast.success("Liked!")
            }
        }
        router.refresh();
    }

    return ( 
        <button className="hover:opacity-75 transition" onClick={handleLike}>
            <Icon color={isLiked ? "#f97316" : '#18181b'} size={25} />
            
        </button>
     );
}
 
export default LikeButton;