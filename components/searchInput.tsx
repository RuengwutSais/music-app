"use client";

import qs from "query-string"
import useDebounce from "@/hooks/UseDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./input";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debounce = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debounce,
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        })

        router.push(url);

    }, [debounce, router])
    return ( 
        <Input placeholder="Search your songs" value={value} onChange={(e)=> setValue(e.target.value)}/>
     );
}
 
export default SearchInput;
