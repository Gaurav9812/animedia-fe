const Post = ({ post }) => {
  console.log(post);
  let date = new Date(post.createdAt).getDate();
  
  return (
    <div className="py-2 bg-[var(--color-light-black)] my-4">
      <div className="flex px-4">
        <div className="flex">
          <div className="rounded-3xl overflow-hidden w-10 ">
            <img src={post.user.profilePhoto} className="" />
          </div>
            <div className="ml-2 flex flex-col items-start">
                <p>{post.user.name.firstName +" "+post.user.name.lastName}</p>
                <p>{date}</p>
            </div>
        </div>
      </div>
      <div className="my-3 w-full ">
        <img src={post.photo} className="aspect-video object-fill" />
      </div>
    </div>
  );
};

export default Post;
