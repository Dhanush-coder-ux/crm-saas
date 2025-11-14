import axios from "axios";


export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useNetWorkCall = () => {
    const NetWorkCalls = async({endpoint, method , data= null}) => {
        try {
            const url = `${backend_url}/${endpoint}`;
            let response;
            method = method.toUpperCase();
            var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ0FBQUFBQnBGd1d6TmtkdUxObEZTcWhkZDgyaHhTeWdfWXVoYWEyMDFjMFB4NWVVTXYxR2ZhMGxZNVF3Y2tPTG94VVJJcEdmTF94UTBmV1BYM3c1OHRZRWQzR1dsTFZWZFVOTWh3bVV5bHFGWm5aSzVobWJYaFVEVlJWbTVBS1V3MlRZUDdDaVIyckRGWTBrOU1sc2FaWkh2V3R5X05GcXhhRTJXQ0EtRUoyNUp2NjE1Y29QdnZGU204WFo0VkF4OGFQekVCRFZfRkFnY0JtaWFBYjZMMXFkc05DQjhzUUlpdz09IiwiZXhwIjoxNzYzNzIxMjY3LCJpc3MiOiJEZUItQXV0aCJ9.3KlGvUlnfpxyP_BnfbVv26JB5pVCfnA5mJ1XVERGBbQ"
            const config = {
                        headers: {
                            "Authorization":`Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        }
                        
                    };           
                if (method === "POST") {
                    response = await axios.post(url,data,config);
                } else if (method === "GET") {
                    response = await axios.get(url,config);
                } else if (method === "PUT") {
                    response = await axios.put(url,data,config);
                } else if (method === "DELETE") {
                    response = await axios.delete(url,config);
                }
                else if (method === "PATCH") {
                    response = await axios.patch(url,data,config); 
                }
                if (response.status==200){
                    return response.data;
                }
                else{
                    console.error("error :",response.data,'status code : ',response.status);
                    return;
                }

        }
        catch (error) {
            console.error('Network call failed', error);
            throw error;        
            }
        }
    return {NetWorkCalls}
}