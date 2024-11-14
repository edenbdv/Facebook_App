// App.js

import React, { useState } from 'react';
import Navbar from './NavBar';
import Menu from './Menu';
import ThinkBox from './ThinkBox';
import Posts from '../Post/Posts';
import Feed from './Feed';
import './style.css'; // Import your CSS file

function App() {

  const [posts, setPosts] = useState(Posts); // State to manage the list of posts
  const [nightMode, setNightMode] = useState(false); // State to track night mode

  // Function to add a new post to the list
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Function to delete a post from the list
  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };


  // Function to edit a post
  const editPost = (postId, editedContent) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, text: editedContent };
      }
      return post;
    }));
  };

  // Function to toggle night mode
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
      <Navbar toggleNightMode={toggleNightMode} nightMode={nightMode} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9">
            <div className="row" style={{ height: '110px' }}>
              <ThinkBox addNewPost={addNewPost} />
            </div>
            <div className="row" style={{ height: 'calc(100% - 150px)' }}>
              <Feed posts={posts} onDeletePost={deletePost} onEditPost={editPost} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
