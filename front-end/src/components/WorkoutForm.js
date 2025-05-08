import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutForm() {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [emptyFields, setEmptyFields] = useState([]);

    const [error, setError] = useState(null);

    async function handleForm(e) {
        e.preventDefault()

        if(!user) {
            setError("You must be logged in first!");
            return ;
        }

        const workout = {title, reps, load}

        const response = await fetch("/api/workouts", {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setTitle('');
            setLoad('');
            setReps('');            
            setEmptyFields([])
            dispatch({ type: "CREATE_WORKOUT", payload: json })
        }
    }

    return(
        <form className="create" onSubmit={handleForm}>
            <h4>Add a New Workout</h4>
            
            <label>
                Title:
            </label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>
                Load (in Kg):
            </label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>
                Reps:
            </label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout +</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}