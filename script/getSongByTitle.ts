import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSong from "./getSong";

const getSongByTitle = async (title: string ): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    if(!title){
        const allSongs = await getSong();
        return allSongs
    }

    const { data,error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });
    if (error) {
        console.error(error);
    }   

    return (data as any) || [];

}

export default getSongByTitle;