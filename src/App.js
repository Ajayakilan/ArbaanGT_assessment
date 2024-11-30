import React, { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import PostDetails from "./postdetail";

function App() {
  const [userId] = useState(1); 
  const [selectedPost, setSelectedPost] = useState(null);

  return ( 
    <div className="App">
      {selectedPost ? (
        
        <PostDetails
          post={selectedPost}
          onBack={() => setSelectedPost(null)}
        />
      ) : (
        <Dashboard userId={userId} onViewPost={setSelectedPost} />
      )}
    </div>
  );
}

export default App;
