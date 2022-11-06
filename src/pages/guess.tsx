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
import { useEffect, useState } from "react";
import { CardMatch } from "../components/CardMatch";
import { Loader } from "../components/Loader";
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
  const { data: session, status } = useSession();
  const [dataLoading, setDataLoading] = useState(true);
  const [matchType, setMatchType] = useState<string>("r1");
  const [matches, setMatches] = useState<Match[]>([]);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;
    getData();
  }, [session, matchType]);

  async function getData() {
    try {
      const resMatches = await api.get(`/matches/${matchType}`);
      const resGuesses = await api.get(`/guesses/${session?.user?.email}`);

      setMatches(resMatches.data.matches);
      setGuesses(resGuesses.data.guesses);

      setDataLoading(false);

      console.log(resMatches.data.matches);
      console.log(resGuesses.data.guesses);
    } catch (error) {
      setDataLoading(false);
      console.log(error);
      alert("Erro ao carregar dados");
    }
  }

  if (status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated") {
    router.push("/login");
  } else {
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
            <MenuItem value={"f"}>Final</MenuItem>
          </Select>
        </FormControl>

        {dataLoading && <Loader />}

        {matches.map((match) => {
          return (
            <CardMatch
              key={match._id}
              guesses={guesses}
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
