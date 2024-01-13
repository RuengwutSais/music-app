"use client"
import { Price, ProductWithPrice } from "@/types";
import Modal from "./modal";
import Button from "./button";
import { useState } from "react";
import { useUser } from "@/hooks/UseUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import UseSubscriptionModal from "@/hooks/UseSubcriptionModal";

interface SubscriptionModalProps{
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
    products
}) => {
    const subscriptionModal = UseSubscriptionModal();
    const { user, isLoading, subscription} = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();

    const Onchange =(open: boolean) => {
        if(!open){
            subscriptionModal.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if(!user){
            setPriceIdLoading(undefined)
            return toast.error('Must be logged in')
        }

        if(subscription){
            setPriceIdLoading(undefined)
            return toast('You already subscribed')
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId});

        } catch (error) {
            toast.error((error as Error)?.message)
        } finally  {
            setPriceIdLoading(undefined);
        }

    }

    let content = (
        <div className="text-center">
            No plans avaliable.
        </div>
    );

    if(products.length) {
        content = (
           <div>
                {products.map((product) => {
                    if(!product.prices?.length){
                        return (
                            <div key={product.id}>
                                No prices available
                            </div>
                        )
                    }
                    return product.prices.map((price) => (
                        <Button key={price.id} className="text-white" 
                        onClick={() => handleCheckout(price)}
                        disabled={isLoading || price.id === priceIdLoading}>
                            {`Subscribe for ${formatPrice(price)}/${price.interval}`}
                        </Button>
                    ))
                })}
           </div>
        )
    }

    if(subscription) {
        content = (
            <div className="text-center">
                You already subscribed
            </div>
        )
    }


    return ( 
        <Modal title="Only for premium users" 
        description="Relax to music with Music App Premium" 
        isOpen={subscriptionModal.isOpen}
        onChange={Onchange}>
            {content}
        </Modal>
     );
}
 
export default SubscriptionModal;