import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ userId, onViewPost }) {
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    // Fetch posts
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => setPosts(res.data));

    // Fetch todos
    axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then(res => setTodos(res.data));

    // Fetch comments count
    axios.get(`https://jsonplaceholder.typicode.com/comments`)
      .then(res => {
        const userComments = res.data.filter(comment => 
          posts.some(post => post.id === comment.postId)
        );
        setCommentsCount(userComments.length);
      });
  }, [userId]);

  const deletePost = (postId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
        alert("Post deleted!");
      });
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      {/* Summary Section */}
      <div className="summary">
        <p>Posts: {posts.length}</p>
        <p>Comments: {commentsCount}</p>
        <p>To-Dos: {todos.filter(todo => todo.completed).length} Completed</p>
      </div>

      {/* Posts List */}
      <h2>Posts</h2>

      <ul className="posts-list">
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
            <div id="button">

            <button  onClick={() => onViewPost(post)}>View</button>
             
            <button  onClick={() => deletePost(post.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>


    </div>
  );
}

export default Dashboard;
