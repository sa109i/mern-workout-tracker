import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails.js"
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

export default function Home() {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await res.json()

            if(res.ok){
                dispatch({ type: "SET_WORKOUTS", payload: json })
            }
        }

        if(user) {
            fetchWorkouts();
        }
        

    }, [dispatch, user])

    return(
        <div className="home">
            <div className="workouts">
                {
                    workouts ?
                    workouts.map(workout => {
                            return (
                                <WorkoutDetails key={workout._id} workout={workout} />
                            ) 
                    }) : "No workouts!"
                }
            </div>
            <div>
                {<WorkoutForm />}
            </div>
        </div>
    )
}