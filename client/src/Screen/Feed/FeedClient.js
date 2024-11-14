import React, { useEffect, useState } from 'react';
import PostItem from '../../Post/PostItem';

const Feed = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem 
            {...post} 
            key={post.id} 
            onDeletePost={onDeletePost} 
            onEditPost={onEditPost}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Feed;
