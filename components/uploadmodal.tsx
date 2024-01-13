"use client";

import uniqid from "uniqid";
import useUploadModal from "@/hooks/UseUploadModal";
import Modal from "./modal";
import Input from "./input";
import Button from "./button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUser } from "@/hooks/UseUser";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading , setIsLoading] = useState(false);
    const router = useRouter();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const { 
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    })
    const onChange = (open: boolean) => {
        if(!open){
            reset();
            return uploadModal.onClose();
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user){
                toast.error("Missing fields")
                return;
            }
            const uniqueId = uniqid();

            // upload song file
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
            .storage
            .from('songs')
            .upload(`song-${values.title}-${uniqueId}`, songFile,{
                cacheControl: "3600",
                upsert: false,
            });

            if (songError){
                setIsLoading(false);
                return toast.error("Failed to upload song")
            }

            //upload image file
            const {
                data: imageData,
                error: imageError,
            
            } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.title}-${uniqueId}`, imageFile,{
                cacheControl: "3600",
                upsert: false,
            })
            if (imageError){
                setIsLoading(false);
                return toast.error("Failed to upload image")
            }
            const {
                error: supabaseError,
            } = await supabaseClient.from('songs')
            .insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path,
            });
            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message)
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Upload successfully");
            reset();
            uploadModal.onClose();
            
        } catch (error) {

        toast.error("Something went wrong");

        }finally{
            setIsLoading(false);
        }
    }
    return (  
        <Modal 
            title="Add a song" 
            description="Upload a MP3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <Input id="title" 
                    disabled={isLoading} 
                    {...register('title', { required: true })}
                    placeholder="Song title"
                    />
                    <Input id="author" 
                    disabled={isLoading} 
                    {...register('author', { required: true })}
                    placeholder="Author Name"
                    />
                    <div>
                        <div className="pb-1">
                            Slect MP3 file
                        </div>
                        <Input 
                        id="song" 
                        disabled={isLoading} 
                        {...register('song', { required: true })}
                        type="file"
                        accept=".mp3"
                        />
                    </div>
                    <div>
                        <div className="pb-1">
                            Slect a cover image
                        </div>
                        <Input 
                        id="image" 
                        disabled={isLoading} 
                        {...register('image', { required: true })}
                        type="file"
                        accept="image/*"
                        />
                    </div>
                    <Button disabled={isLoading} type="submit" className="text-white">
                        Upload Song
                    </Button>
                </form>
        </Modal>
    );
}
 
export default UploadModal;