import axios from "axios";


export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useNetWorkCall = () => {
    const NetWorkCalls = async({endpoint, method , data= null}) => {
        try {
            const url = `${backend_url}/${endpoint}`;
            let response;
            method = method.toUpperCase();
            var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ0FBQUFBQnBGY0txb0hvVGRabzhLQzVzdGpHaDFfb2dmUm1RLVFHZXhCOUh1Y09YV1ppRDZEV2lCMFBDN3pvUG9qdm12SUU1RjFieUQ4YXdCaDFlLUhkZ0lfbWwycmZLWnNpM1FvM1N3T0psUHFiYVEtV2ZiUGhvR25NeWdjcXU2bWhtZjZZZE5DREZHRkRBbHkxOW43SHJGQnBSSnJHYkZ3PT0iLCJleHAiOjE3NjM2Mzg1NzAsImlzcyI6IkRlQi1BdXRoIn0.bKTj_6abPs5ITgQTng-fw58Ztro0UCunjwSbAwGGv7o"
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