import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UndoIcon } from "lucide-react";
import { ur } from "zod/v4/locales";


export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useNetWorkCall = () => {
    const NetWorkCalls = async({endpoint, method , data=null,ignoreCookie=false}) => {
        try {
            const url = `${backend_url}/${endpoint}`;
            let response;
            method = method.toUpperCase();
            var accessToken=Cookies.get('access_token');
            const refreshToken=Cookies.get('refresh_token')
            
            var headers={
                Authorization:`Bearer ${accessToken}`
            }
            
            if ((accessToken!=undefined && refreshToken!=undefined) || ignoreCookie==true) {
                if (ignoreCookie==false){
                    const decodedAccesToken=jwtDecode(accessToken,{verify:false});
                    const decodedRefreshToken=jwtDecode(refreshToken,{verify:false});
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decodedAccesToken.exp<currentTime){
                        console.warn("Access Token Expired....Geting new token");
                        if (decodedRefreshToken.exp<currentTime){
                            console.warn("Refresh token Expired....Please Login");
                            return;
                        }
                        else{
                            headers['Authorization']=`Bearer ${refreshToken}`
                            const res = await axios.get(`${backend_url}/auth/token/new`);
                            if (res.status==200){
                                accessToken=res.data.access_token;
                                Cookies.set('access_token',accessToken);
                                headers['Authorization']=accessToken;
                            }else{
                                console.error("something went wrong while getting new token",res.data)
                                return
                            }
                        }
                    }
                }
                console.log("Final headers :",headers,"final method :",method,"final url :",url);
                // var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ0FBQUFBQnBGd1d6TmtkdUxObEZTcWhkZDgyaHhTeWdfWXVoYWEyMDFjMFB4NWVVTXYxR2ZhMGxZNVF3Y2tPTG94VVJJcEdmTF94UTBmV1BYM3c1OHRZRWQzR1dsTFZWZFVOTWh3bVV5bHFGWm5aSzVobWJYaFVEVlJWbTVBS1V3MlRZUDdDaVIyckRGWTBrOU1sc2FaWkh2V3R5X05GcXhhRTJXQ0EtRUoyNUp2NjE1Y29QdnZGU204WFo0VkF4OGFQekVCRFZfRkFnY0JtaWFBYjZMMXFkc05DQjhzUUlpdz09IiwiZXhwIjoxNzYzNzIxMjY3LCJpc3MiOiJEZUItQXV0aCJ9.3KlGvUlnfpxyP_BnfbVv26JB5pVCfnA5mJ1XVERGBbQ"          
                if (method === "POST") {
                    response = await axios.post(url,data,{headers:headers});
                } else if (method === "GET") {
                    response = await axios.get(url,{headers:headers});
                } else if (method === "PUT") {
                    response = await axios.put(url,data,{headers:headers});
                } else if (method === "DELETE") {
                    response = await axios.delete(url,{headers:headers});
                }
                else if (method === "PATCH") {
                    response = await axios.patch(url,data,{headers:headers}); 
                }
                if (response.status==200){
                    return response.data;
                }
                else{
                    console.error("error :",response.data,'status code : ',response.status);
                    return;
                }
            }else{
                console.log("There is no token please login !")
            }

        }
        catch (error) {
            console.error('Network call failed', error);
            throw error;        
        }
    }
    return {NetWorkCalls}
}