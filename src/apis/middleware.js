import store from 'redux/store';
import * as authActions from 'redux/actions/auth'; 
import * as authUtil from 'utils/auth.util';


export async function apply(res) {
    // Fill res.json with json data if content type is application/json
    res.json = {};
    const contentType = res.headers.get('content-type');
    if(contentType && contentType.indexOf('application/json') !== -1) {
        res.json = await res.json();
    }

    // If "not authorized" 401 error but there is logged in user stored, logg the user out
    if(res.status === 401 && authUtil.isLogged()) {
        console.log("HERE");
        store.dispatch(authActions.logout());
    }
}