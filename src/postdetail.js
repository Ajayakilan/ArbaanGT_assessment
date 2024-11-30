import React, { useState } from "react";
import axios from "axios";

function PostDetails({ post, onBack }) {
  const [body, setBody] = useState(post.body);

  const savePost = () => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      ...post,
      body,
    }).then(() => {
      alert("Post saved!");
    });
  };

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <br />
      <button onClick={savePost}>Save</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default PostDetails;
