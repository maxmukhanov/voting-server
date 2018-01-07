import {vote, next, setEntries, INITIAL_STATE} from "./core";

export default function reducer(state = INITIAL_STATE, action) {
    const actionType = action.type;
    switch (actionType) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return state.update('vote', voteState => vote(voteState, action.entry));
        default:
            return state;

    }
}