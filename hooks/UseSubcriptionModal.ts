import { create } from "zustand";

interface SubscriptionModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const UseSubscriptionModal = create<SubscriptionModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })

}))

export default UseSubscriptionModal;