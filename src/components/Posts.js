import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { URL_GET_POSTS } from "../helpers/UrlHelper";
import Post from "./Post";

const Posts = () => {
  const userId = useSelector((store) => store.user?.user?._id);
  const bearerToken = useSelector((store) => {
    return store.user.bearerToken;
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("sad" + `${URL_GET_POSTS}/${userId}`);
    axios
      .get(`${URL_GET_POSTS}/${userId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 200) {
          setPosts(response.data.posts);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userId]);
console.log(posts)
  return posts ? <div>
        {
            posts.map((post)=>{
                return <Post key={post._id} post={post} />
            })
        }
  </div> : <div>No Posts</div>;
};

export default Posts;
