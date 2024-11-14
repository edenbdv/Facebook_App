import React, { useEffect, useState } from 'react';
import PostItem from '../../Post/PostItem';
import { fetchUserData } from '../api';
import { addPrefixIfNeeded } from '../../utils';

const Feed = ({ posts, onDeletePost, onEditPost, token }) => {

  const [postsWithUserData, setPostsWithUserData] = useState([]);

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



  

  return (
    <div>
      {postsWithUserData.map((post) => (
        <PostItem
          _id={post._id}
          text={post.text} 
          picture={addPrefixIfNeeded(post.picture)} 
          authorP={addPrefixIfNeeded(post.authorData ? post.authorData.profilePicture : '')} // Corrected prop name
          authorN={post.authorData ? post.authorData.displayName : ''} 
          isoDate={post.createdAt} 
          username={post.createdBy}
          onDelete={onDeletePost} 
          onEditPost={(fieldName, newValue) => onEditPost(post._id, fieldName, newValue)}
          token = {token} 
        />
      ))}
    </div>
  )
};


export default Feed;

