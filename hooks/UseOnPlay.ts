import { Song } from "@/types";
import usePlayer from "./UsePlayer";
import UseAuthModal from "./UseAuthModal";
import { useUser } from "./UseUser";
import UseSubscriptionModal from "./UseSubcriptionModal";

const useOnPlay = (song: Song[]) => {
    const player = usePlayer();
    const authModal = UseAuthModal();
    const subscriptionModal = UseSubscriptionModal();
    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if(!user){
            return authModal.onOpen();
        }
        if(!subscription){
            return subscriptionModal.onOpen();
        }

        player.setId(id);
        player.setIds(song.map((song) => song.id));
    }

    return onPlay;
}

export default useOnPlay;