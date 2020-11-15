import * as actions from './actionType';

export const addCount = () =>{
    return{
        type: actions.REFRESH
    }
}

export const setStatus = () =>{
    return{
        type:actions.STATUS
    }
}

export const setAuthentication = (status) =>{
    return{
        type:actions.AUTHENTICATED,
        payload:status
    }
}
