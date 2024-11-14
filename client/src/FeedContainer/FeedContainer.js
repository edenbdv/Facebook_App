import React, { useState, useEffect } from 'react';
import Navbar from '../Screen/NavBar';
import Menu from '../Screen/Menu';
import ThinkBox from '../Screen/Feed/ThinkBox';
import Feed from '../Screen/Feed/Feed';
import {fetchUserPosts} from '../Screen/api'
import '../Screen/style.css'; 
const config = require('../config'); 

function FeedContainer({ token }) {

  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [nightMode, setNightMode] = useState(false); 


  useEffect(() => {
    // Fetch posts for the current user
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }

    if (token) {
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const request = new Request(`http://${config.server.ip}:${config.server.port}/api/posts`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      const response = await fetch(request);

      if (response.ok) {
        const postData = await response.json();
        setPosts(postData);
      } else {
        console.error('Error fetching posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



const addNewPost = async (text, picture) => {
  try {
    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userData.username}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, picture })
    });
    
    if (response.ok) {
      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
    } else {
      if (response.status === 403) {
        // Post not allowed
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.setAttribute('role', 'alert');
        alert.innerText = 'Sorry, your post is not allowed.';
        
        // Append the alert 
        const container = document.getElementById('notification-container');
        container.appendChild(alert);
        
        // Remove the alert 
        setTimeout(() => {
          container.removeChild(alert);
        }, 5000); // Remove after 5 seconds
      } else {
        console.error('Error adding post:', response.statusText);
      }
    }
  } catch (error) {
    console.error('Error adding post:', error);
  }
};



const deletePost = async (postId) => {
  try {
    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/Users/${userData.username}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      // If the request was successful, update the state by filtering out the deleted post
      setPosts(posts.filter(post => post.id !== postId));
      fetchPosts();
      fetchUserPosts(userData.username, token);
    } else {
      console.error('Error deleting post:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

const editPost = async (postId, fieldName, newValue) => {
  try {
    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/Users/${userData.username}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fieldName: fieldName, fieldValue: newValue }) 
    });
    if (response.ok) {
      // If the request was successful, reload the page to reflect the changes
      fetchPosts();
      fetchUserPosts(userData.username, token);
    } else {
      if (response.status === 403) {
        // Post editing not allowed
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.setAttribute('role', 'alert');
        alert.innerText = 'Sorry, you are not allowed to edit this post.';
        
        // Append the alert 
        const container = document.getElementById('notification-container');
        container.appendChild(alert);
        
        // Remove the alert 
        setTimeout(() => {
          container.removeChild(alert);
        }, 5000); 
      } else {
        console.error('Error editing post:', response.statusText);
      }
    }
  } catch (error) {
    console.error('Error editing post:', error);
  }
};


const toggleNightMode = () => {
  setNightMode(!nightMode);
};



return (
  <div className={`app-container ${nightMode ? 'night-mode' : ''}`}>
    
      <Navbar toggleNightMode={toggleNightMode}
          nightMode={nightMode}
          userProfilePicture={userData ? userData.profilePic : ''}
          userDisplayName={userData ? userData.displayName : ''}
        />
     
     
    

    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <Menu
            proPic={userData ? userData.profilePic : ''}
            username={userData ? userData.username : ''} 
            />
        </div>

    
      <div className="col-12 col-md-9 col-lg-9 col-xl-6 d-flex flex-column">
            <ThinkBox
              addNewPost={addNewPost}
              proPic={userData ? userData.profilePic : ''}
              authorName={userData ? userData.displayName : ''} 
            />

        <div className="flex-grow-1 d-flex flex-column" >
            {/* Notification container */}
            <div id="notification-container"></div>

            <Feed posts={posts}
              onDeletePost={deletePost}
              onEditPost={editPost}
              token={token} />

          </div>
        </div>
      </div>
    </div>
  </div>
);

};
export default FeedContainer;