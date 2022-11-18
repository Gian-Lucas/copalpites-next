import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CardMatch } from "../components/CardMatch";
import { Loader } from "../components/Loader";
import { GuessesContext } from "../contexts/guesses";
import { api } from "../lib/axios";

interface Match {
  _id: string;
  gameDate: string;
  homeTeam: {
    name: string;
    image: string;
  };
  awayTeam: {
    name: string;
    image: string;
  };
  homeScore: number;
  awayScore: number;
  matchFinished: boolean;
  type: "r1" | "r2" | "r3" | "r16" | "qf" | "sf" | "f";
}

interface Guess {
  // _id: string;
  matchId: string;
  userEmail: string;
  homeScore: number;
  awayScore: number;
}

export default function Guess() {
  const { updateGuesses } = useContext(GuessesContext);

  const { data: session, status } = useSession();

  const [dataLoading, setDataLoading] = useState(true);
  const [matchType, setMatchType] = useState<string>("r1");
  const [matches, setMatches] = useState<Match[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;

    (async () => {
      const res = await api.get("/matches");
      const resGuesses = await api.get(`/guesses/${session?.user?.email}`);

      const guessesLoaded: Guess[] = resGuesses.data.guesses;

      updateGuesses(guessesLoaded);
    })();
  }, [session]);

  useEffect(() => {
    if (!session?.user?.email) return;
    getMatches();
  }, [session, matchType]);

  async function getMatches() {
    try {
      setDataLoading(true);
      const resMatches = await api.get(`/matches/${matchType}`);

      setMatches(resMatches.data.matches);

      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
      console.log(error);
      alert("Erro ao carregar dados");
    }
  }

  if (status === "loading") return <Loader />;

  if (status === "unauthenticated") router.push("/login");

  if (status === "authenticated") {
    return (
      <Container
        sx={{
          overflowY: "scroll",
          mb: "57px",
          height: "calc(100vh - 56px)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography mt={3} variant="h5">
          {matches.length === 0 && !dataLoading
            ? "Ainda não há jogos"
            : "Faça seus palpites"}
        </Typography>

        <FormControl>
          <InputLabel id="select-label">Jogos</InputLabel>
          <Select
            labelId="select-label"
            value={matchType}
            label="Jogos"
            onChange={(e) => setMatchType(e.target.value)}
          >
            <MenuItem value={"r1"}>Rodada 1</MenuItem>
            <MenuItem value={"r2"}>Rodada 2</MenuItem>
            <MenuItem value={"r3"}>Rodada 3</MenuItem>
            <MenuItem value={"r16"}>Oitavas de final</MenuItem>
            <MenuItem value={"qf"}>Quartas de final</MenuItem>
            <MenuItem value={"sf"}>Semi finais</MenuItem>
            <MenuItem value={"tf"}>Terceiro lugar</MenuItem>
            <MenuItem value={"f"}>Final</MenuItem>
          </Select>
        </FormControl>

        {dataLoading && <Loader />}

        {matches.map((match) => {
          return (
            <CardMatch
              key={match._id}
              match={match}
              userEmail={session?.user?.email}
            />
          );
        })}
      </Container>
    );
  }

  return <Loader />;
}
