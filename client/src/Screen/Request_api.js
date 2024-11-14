// api.js
const config = require('../config'); 
export const acceptFriendRequest = async (userId, friendId, token) => {
    const url = `http://${config.server.ip}:${config.server.port}/api/users/${userId}/friends/${friendId}`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to accept friend request');
        }

        // If the response is successful, return null
        return null;
    } catch (error) {
        // If there's an error, throw it
        throw new Error(`Error accepting friend request: ${error.message}`);
    }
};

export const deleteFriendRequest = async (userId, friendId, token) => {
    const url = `http://${config.server.ip}:${config.server.port}/api/users/${userId}/friends/${friendId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete friend request');
        }

        // If the response is successful, return null
        return null;
    } catch (error) {
        // If there's an error, throw it
        throw new Error(`Error deleting friend request: ${error.message}`);
    }
};
