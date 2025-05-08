import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export default function useLogout() {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutsDispatch } = useWorkoutsContext()

    const logout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'});
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null});
    }

    return {logout};
}