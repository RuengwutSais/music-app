import Header from "@/components/header";
import SearchInput from "@/components/searchInput";
import getSongByTitle from "@/script/getSongByTitle";
import SearchContent from "./components/searchcontent";

export const revalidate = 0;

interface SearchProps{
    searchParams:{
        title: string;
    }
};

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongByTitle(searchParams.title);

    return (
        <div className=" bg-white rounded-lg w-full h-full overflow-hidden overflow-y-auto">
            <Header className=" from-bg-bg-white">
                <div className=" md-2 flex flex-col gap-y-6 ">
                    <h1 className="text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput />
                </div>
                <SearchContent songs={songs} />
            </Header>
        </div>
    )
}

export default Search;