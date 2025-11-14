import Cookies from 'js-cookie';
import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext=createContext();

const AuthContextProvider = (props) => {
    const {NetWorkCalls}=useNetWorkCall();
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const navigateTo=useNavigate();

    const getLoginUrl=async()=>{
        try{
            const res=await NetWorkCalls({endpoint:'auth',method:'get',ignoreCookie:true});
            window.open(res.login_url,'_self')
        }
        catch (e){
            console.error(e);
        }
    }

    const checkIsLoggedIn=()=>{
        const LoggedIn=Cookies.get('is_logged_in');
        if (LoggedIn!=null){
            setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }

    const setLoggedInTokens=({access_token,refresh_token,profile_url,user_name})=>{
        Cookies.set('access_token',access_token)
        Cookies.set('refresh_token',refresh_token)
        Cookies.set('is_logged_in',true)
        Cookies.set('profile_url',profile_url)
        Cookies.set('user_name',user_name)
        setIsLoggedIn(true)
        navigateTo('/',{'replace':true})
    }

    const logout=async()=>{
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        Cookies.remove('is_logged_in')
        Cookies.remove('profile_url')
        Cookies.remove('user_name')
        setIsLoggedIn(false)
    }

    useEffect(()=>{
        checkIsLoggedIn();
    },[])

    const value={
        getLoginUrl,
        checkIsLoggedIn,
        setLoggedInTokens,
        logout,
        isLoggedIn,
        setIsLoggedIn
    }
    

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider