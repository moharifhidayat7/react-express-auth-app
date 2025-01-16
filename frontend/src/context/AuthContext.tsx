import React, { createContext, useState, useContext, ReactNode } from "react";
import { decodeJwt } from "jose";

export type User = {
	name: string;
	email: string;
	avatar?: string;
};

type Auth = {
	user: User;
	token: string;
};

type AuthContextType = {
	auth: Auth | null;
	setAuthFromToken: (data: any) => void;
	clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [auth, setAuth] = useState<Auth | null>(null);

	const setAuthFromToken = (data: any): void => {
		setAuth({ user: data.user, token: data.token });
	};

	const clearAuth = () => {
		setAuth(null);
	};

	return (
		<AuthContext.Provider value={{ auth, setAuthFromToken, clearAuth }}>
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