import axios from "axios";


export const backend_url = import.meta.env.VITE_BACKEND_URL;

export const useNetWorkCall = () => {
    const NetWorkCalls = async({endpoint, method , data= null}) => {
        try {
            const url = `${backend_url}/${endpoint}`;
            let response;
            method = method.toUpperCase();
            var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ0FBQUFBQnBERjN0dWphS3BtdDdkTmJCSTV5RHhZYm5taUhieDQ0QktOVGtKYWlfRzlRUlotRGFqSFpxa0ptU2FoWGJ2b2NKSUVFMDZyT0xCNTJVOEtQV191S1dvOU9CdGpHWnNXaXVEMzNOY2dUd0tZNlh3NlVMbWNiVVpzeFliWmstUGEyUzVDVURwRzhzdExsUS14UUJPc19MUkJUdU1nPT0iLCJleHAiOjE3NjMwMjI5NTcsImlzcyI6IkRlQi1BdXRoIn0.cDz3bxjLEWsaWe4JfAjBxDdOyAX4veqNRPcdBO1yH2k"
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