import AccountContent from "@/components/accountcontent";
import Header from "@/components/header";

const Account = () => {
    return ( 
        <div className="bg-white rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-white">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-3xl text-zinc-900 font-semibold">
                        Account Setting
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
     );
}
 
export default Account;