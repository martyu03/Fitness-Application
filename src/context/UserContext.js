import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // To hold user details
    const [token, setToken] = useState(null); // To hold authentication token

    useEffect(() => {
        // Load user and token from localStorage or API if needed
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedToken = localStorage.getItem('token');

        if (storedUser) {
            setUser(storedUser);
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Function to unset the user and token
    const unsetUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user'); // Clear user from localStorage
        localStorage.removeItem('token'); // Clear token from localStorage
    };

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, unsetUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
