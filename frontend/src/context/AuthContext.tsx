import React, { createContext, useState, useContext, ReactNode } from "react";

export type User = {
	name: string;
	email: string;
	image?: string;
};

type Auth = {
	user: User;
	token: string;
};

type AuthContextType = {
	auth: Auth | null;
	getAuthToken: () => string | null;
	setAuthToken: (data: any) => void;
	clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [auth, setAuth] = useState<Auth | null>(null);

	const getAuthToken = (): string | null => {
		let token = localStorage.getItem("token");
		return token;
	};

	const setAuthToken = (data: any): void => {
		localStorage.setItem("token", data.token);
		setAuth({ user: data.user, token: data.token });
	};

	const clearAuth = () => {
		localStorage.removeItem("token");
		setAuth(null);
	};

	return (
		<AuthContext.Provider
			value={{ auth, setAuthToken, getAuthToken, clearAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
