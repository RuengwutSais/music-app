"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import UseAuthModal from "@/hooks/UseAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = UseAuthModal();

    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    }

    useEffect(() => {
        if(session){
            router.refresh();
            onClose();
        }
    },[session, router, onClose]);


    return ( 
        <Modal 
            title="Welcome Back" 
            description="Login to your account" 
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth 
                magicLink
                providers={["github"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default:{
                            colors:{
                                brand: "#ED8936",
                                brandAccent: "#ED8936"
                            }
                        }
                    }
                }}
            />
        </Modal> 
    );
}
 
export default AuthModal;