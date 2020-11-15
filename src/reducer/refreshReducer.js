import * as actions from '../action/actionType';

const initialState ={
    count:0,
    status:true,
    authentication:false,
}

const refreshReducer = (state=initialState, action) =>{
    switch(action.type){
        case actions.REFRESH:
            return {
                ...state,
                count:state.count+1
            }
        case actions.STATUS:
            return{
                ...state,
                status:!state.status
            }
        case actions.AUTHENTICATED:
                return {
                    ...state,
                    authentication:action.payload
                }

        default:
            return state;
    }
}

export default refreshReducer;