import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface User {
  email: string;
  name: string;
  image: string;
  score: number;
}

interface UserContextData {
  users: User[];
  updateUser: (email: string, score: number) => void;
}

export const UserContext = createContext({} as UserContextData);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/users");

        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function updateUser(email: string, score: number) {
    if (email === "") return;

    const usersUpdated = users.map((user) => {
      if (user.email === email)
        return {
          ...user,
          email,
          score,
        };

      return user;
    });

    setUsers(usersUpdated);
  }

  return (
    <UserContext.Provider value={{ users, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
