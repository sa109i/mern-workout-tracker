
import { WorkoutsContext } from "../contexts/workoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if(!context){
        throw Error("useWorkoutsContext must be used inside the workoutscontextprovider!")
    }

    return context;
}