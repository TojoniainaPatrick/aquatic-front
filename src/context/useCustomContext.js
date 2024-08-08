import { useContext } from "react";
import CustomContext from "./CustomContext";

export default function useCustomContext(){
    return useContext(CustomContext)
}