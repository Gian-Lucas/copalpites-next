import { Box, Container, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export default function Guess() {
  const { data: session, status } = useSession();
  const [matches, setMatches] = useState<Match[]>([]);
  const router = useRouter();

  useEffect(() => {
    getMatches();
  }, []);

  async function getMatches() {
    const res = await api.get("/matches");

    setMatches(res.data.matches);
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
          mt: 3,
          height: "calc(100vh - 56px)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography variant="h5">Faça seus palpites</Typography>

        {matches.map((match) => {
          return (
            <Box
              bgcolor="#202024"
              borderRadius="4px"
              padding={2.5}
              key={match._id}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={2.5}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Typography variant="button" fontWeight="bold">
                  {match.homeTeam.name} vs. {match.awayTeam.name}
                </Typography>
                <Typography color="darkgray" variant="overline">
                  {match.gameDate}
                </Typography>
              </Box>

              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ gap: 1.5 }}
              >
                <TextField
                  id="outlined-basic"
                  label="Gols"
                  size="small"
                  variant="outlined"
                  autoComplete="off"
                />

                <img
                  style={{ width: 40 }}
                  src={`https://flagicons.lipis.dev/flags/4x3/${match.homeTeam.image}.svg`}
                  alt={match.homeTeam.name}
                />

                <CloseIcon />

                <img
                  style={{ width: 40 }}
                  src={`https://flagicons.lipis.dev/flags/4x3/${match.awayTeam.image}.svg`}
                  alt={match.awayTeam.name}
                />
                <TextField
                  autoComplete="off"
                  id="outlined-basic"
                  label="Gols"
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{ fontWeight: "bold" }}
                endIcon={<CheckIcon />}
              >
                Confirmar
              </Button>
            </Box>
          );
        })}
      </Container>
    );
  }
  return <Loader />;
}
