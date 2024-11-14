import React, { useEffect, useState } from 'react';
import PostItem from '../../Post/PostItem';
import { fetchUserData, fetchUserPosts } from '../api';
const config = require('../../config'); 

const UserFeed = ({ posts, token }) => {
  const [userData, setUserData] = useState(null);
  const [postsWithUserData, setPostsWithUserData] = useState([]);

  useEffect(() => {
    // Fetch posts for the current user
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }

  }, [postsWithUserData, token]);

  useEffect(() => {
    const fetchPostsUserData = async () => {
      const postsWithUserData = await Promise.all(
        posts.map(async (post) => {
          try {

            const userData = await fetchUserData(post.createdBy, token);
           
            if (userData) {
              const { displayName, profilePic } = userData;
              // Create a new object with just displayName and profilePicture
              const authorData = { displayName, profilePicture: addPrefixIfNeeded(profilePic)  };
              const updatedPost = { ...post, authorData };
              return updatedPost;
            } else {
              console.error('Error fetching user details:');
              return post;
            }
          } catch (error) {
            console.error('Error fetching user details:', error.message);
            return post;
          }
        })
      );
      setPostsWithUserData(postsWithUserData);
    };
  
    fetchPostsUserData();
  }, [posts, token]);


  const addPrefixIfNeeded = (url) => {
    if (!url) {
      return ''; 
    }
    const prefix = 'data:image/jpeg;base64,';
    if (!url.startsWith(prefix)) {
        url = prefix + url
    }
    return url;
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
        const userPostsData = await fetchUserPosts(userData.username, token);
       setPostsWithUserData(userPostsData);
       
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
       const userPostsData = await fetchUserPosts(userData.username, token);
       setPostsWithUserData(userPostsData);
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
  
  

  
  return (
    <div className='col-12 col-md-9 d-flex flex-column'>
      {postsWithUserData.map((post) => (
        <PostItem
          _id={post._id}
          text={post.text} 
          picture={addPrefixIfNeeded(post.picture)} 
          authorP={addPrefixIfNeeded(userData.profilePic)} 
          authorN={post.authorData ? post.authorData.displayName : ''} 
          isoDate={post.createdAt} 
          username={post.createdBy}
          onDelete={deletePost} 
          onEditPost={(fieldName, newValue) => editPost(post._id, fieldName, newValue)} 
          token = {token} 

        />
      ))}
    </div>
  )
};


export default UserFeed;

