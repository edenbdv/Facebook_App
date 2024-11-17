const config = require('../config');

//user:

export const fetchUserPosts = async (userId, token) => {
    try {
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}/posts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userPostsData = await response.json();
            return userPostsData; // Return the posts
        } else {
            console.error('Failed to fetch user posts:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user posts:', error.message);
        return null;
    }
};

export const fetchUserData = async (userId, token) => {
        // Fetch updated user details
        try {
            // Make a GET request to fetch user details using the provided token
            const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                // If the request is successful, parse the response
                const userData = await response.json();
                return userData;
            } else {
                // Handle error if the request fails
                console.error('Error fetching user details:', response.statusText);
            }
        } catch (error) {
            // Handle any other errors that may occur during the request
            console.error('Error fetching user details:', error.message);
        }
    };

export const deleteUserProfile = async (userId, token) => {
    const url = `http://${config.server.ip}:${config.server.port}/api/users/${userId}`;
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete user profile');
        }

        // If the response is successful, return null
        return null;
    } catch (error) {
        // If there's an error, throw it
        throw new Error(`Error deleting user profile: ${error.message}`);
    }
};

//friends:

export const fetchFriendsList = async (userId, token) => {
    try {
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}/friends`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const friendsData = await response.json();
            return friendsData.friends;
        } else {
            console.error('Failed to fetch friends list:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching friends list:', error.message);
    }
};

export const sendFriendRequest = async (friendUsername, token) => {
    try {
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${friendUsername}/friends`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // If the response is successful, return an object indicating success
            return { success: true };
        } else {
            // If there's an error, parse the error message from the response and return it
            const errorData = await response.json();
            return { success: false, error: errorData.message };
        }
    } catch (error) {
        // If an error occurs during the request, throw it to be handled in the component
        throw error;
    }
};


//posts:

export const saveChanges = async (userId, fieldName, fieldValue, token) => {
    try {


        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ fieldName, fieldValue})
        });

        
        if (!response.ok) {
            throw new Error('Failed to save changes');
        }
          // Parse the response and return it
          const data = await response.json(); 
          return { success: true, message: "Changes saved successfully", data }; 

        } catch (error) {
            console.error('Error saving changes:', error.message);
            return { success: false, message: error.message }; 
        } 
  
};

//comments:

export const fetchCommentsList = async (postId, token) => {
    try {
        const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            const commentLst = []
            for (const comment of data) {
                commentLst.push(comment);
            }
            return commentLst;
        } else {
            console.error('Failed to fetch comments:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching comments:', error.message);
    }
};


export const createComment = async (postId, text, token) => {
    
   try {
    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({text})

    });

    if (response.ok) {
        const comment = await response.json();
        return comment;

    } else {
        console.error('Failed to create comment:', response.statusText);
    }

    } catch (error) {
        console.error('Error create comment:', error.message);
    }

};

export const  updateComment = async (postId, commentId ,text, token) => {

    const url = `http://${config.server.ip}:${config.server.port}/api/posts/${postId}/comments/${commentId}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text }) 
    });

    if (response.ok) {
        return response;
    } else {
        const errorData = await response.json();
        console.error("Failed to update comment", errorData);

    }
}

export const  deleteComment =  async (postId, commentId ,token) => {

    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/posts/${postId}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.ok) {
        return response
    } else {
        console.error("Failed to delete comment");
    }

}

//likes:

export const getLikes = async (postId, token) => {

    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/posts/${postId}/likes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.ok) {
        const likes = await response.json();
        console.log(`get likes successfully:`, likes);
        return likes;
     

    } else {
        console.error("Failed to like a post");
    }
};


export const likePost = async (postId, token) => {

    const response = await fetch(`http://${config.server.ip}:${config.server.port}/api/posts/${postId}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.ok) {
        const likes = await response.json();
        console.log(`post liked successfully:`, likes);
        return likes;
     

    } else {
        console.error("Failed to like a post");
    }
};


export const unlikePost = async (postId, token) => {

    const response = await fetch(`http://${config.server.ip}:${config.server.port}api/posts/${postId}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (response.ok) {
        const likes = await response.json();
        console.log(`post unliked successfully:`, likes);
        return likes;
    } else {
        console.error("Failed to like a post");
    }
}