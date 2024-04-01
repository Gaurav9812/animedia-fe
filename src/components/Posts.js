import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URL_GET_POSTS } from "../helpers/UrlHelper";

const Posts = ()=>{

    const userId = useSelector((store)=>store.user?.user?._id);
    const bearerToken = useSelector((store) => {
        return store.user.bearerToken;
      });
    
    const [posts,setPosts] = useState([]); 

    useEffect(()=>{
        console.log("sad"+`${URL_GET_POSTS}/${userId}`);
        axios.get(`${URL_GET_POSTS}/${userId}`,{
            
            headers: {
                Authorization: `Bearer ${bearerToken}`,
              },
        }).then(function(response){
                console.log(response);
        }).catch(function(error){
            console.log(error);
        })
        

    },[userId]);

    return (<div>

    </div>);

}

export default Posts;