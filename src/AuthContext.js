import React, { useState, createContext, useContext, useEffect } from "react";
import io from "socket.io-client";

// const serverURL = "http://localhost:5000"; 
const serverURL = "https://studyboardchat.azurewebsites.net/";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [socket, setSocket] = useState(null);

	const login = (userData) => {
		setUser(userData);
	};

	const logout = () => {
		handleDisconnect(user);
		setUser(null);
		localStorage.removeItem("user");
	};

	const handleConnect = () => {
		console.log("Socket connected");
	};

	const handleDisconnect = (user) => {
		// Emit a user_disconnect event with the user's email for proper removal
		socket.emit("user_disconnect", { email: user.email });
	};
	useEffect(() => {
		if (socket) {
			socket.on("connect", handleConnect);
			socket.on("disconnect", handleDisconnect);

			return () => {
				socket.off("connect", handleConnect);
				socket.off("disconnect", handleDisconnect);
			};
		}
	}, [socket]);

	useEffect(() => {
		if (user && user.name && user.email) {
		  const userData = {
			name: user.name,
			email: user.email,
		  };
		  // Only connect to the socket if user data is available
		  const newSocket = io.connect(serverURL); 
		  newSocket.emit("user_connected", userData);
		  setSocket(newSocket);
		} else if (socket) {
		  // Disconnect from the socket if user data is not available
		  socket.disconnect();
		}
	  }, [user]);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	// Update localStorage or cookies when user data changes
	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	return <AuthContext.Provider value={{ user, login, logout, isLoading, socket }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
