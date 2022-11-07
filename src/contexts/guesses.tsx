import { createContext, ReactNode, useState } from "react";

interface Guess {
  // _id: string;
  matchId: string;
  userEmail: string;
  homeScore: number;
  awayScore: number;
}

interface GuessesContextData {
  guesses: Guess[];
  updateGuesses: (guesses: Guess[]) => void;
}

export const GuessesContext = createContext({} as GuessesContextData);

interface GuessesContextProviderProps {
  children: ReactNode;
}

export function GuessesContextProvider({
  children,
}: GuessesContextProviderProps) {
  const [guesses, setGuesses] = useState<Guess[]>([]);

  function updateGuesses(guessesArray: Guess[]) {
    setGuesses(guessesArray);
  }

  return (
    <GuessesContext.Provider value={{ guesses, updateGuesses }}>
      {children}
    </GuessesContext.Provider>
  );
}
