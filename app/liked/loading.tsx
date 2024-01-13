"use client"

import Box from "@/components/box";
import { BarLoader } from "react-spinners";

const Loading = () => {
    return ( 
        <Box className="h-full flex justify-center items-center">
            <BarLoader color="#f97316" />
        </Box>
     );
}
 
export default Loading;