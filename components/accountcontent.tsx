"use client"

import UseSubscriptionModal from "@/hooks/UseSubcriptionModal";
import { useUser } from "@/hooks/UseUser";
import { postData } from "@/libs/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./button";


const AccountContent = () => {
    const router = useRouter();
    const subscriptionModal = UseSubscriptionModal();
    const { isLoading, subscription, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!isLoading && !user){
            router.replace('/');
        }
    },[isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        } catch (error) {   
            if(error) {
                toast.error((error as Error).message);
            }
        }
        setLoading(false);
    }

    return ( 
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan.</p>
                    <Button onClick={subscriptionModal.onOpen}
                    className="w-[300px] text-white">
                        Subscription
                    </Button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4 ">
                    <p>
                      You  are currently on the <b>{subscription?.price?.product?.name}</b> plan.  
                    </p>
                    <Button className="w-[300px] text-white"
                    disabled={loading || isLoading}
                    onClick={redirectToCustomerPortal}>
                        Open customer portal
                    </Button>
                </div>
            )}
        </div>
     );
}
 
export default AccountContent;