import { Box, Typography, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import { useState } from "react";
import { api } from "../lib/axios";

interface CardMatchProps {
  match: {
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
  };
  guesses: Guess[];
  userEmail: string | null | undefined;
}

interface Guess {
  // _id: string;
  matchId: string;
  userEmail: string;
  homeScore: number;
  awayScore: number;
}

export function CardMatch({ match, guesses, userEmail }: CardMatchProps) {
  const [guessesCard, setGuessesCard] = useState<Guess[]>(guesses);
  const guessSaved = guessesCard.find((guess) => guess.matchId === match._id);
  let buttonMessage = "Palpite Salvo";

  if (match.matchFinished && guessSaved) {
    if (
      match.homeScore === guessSaved.homeScore &&
      match.awayScore === guessSaved.awayScore
    ) {
      buttonMessage = "+5 Acertou o placar";
    } else if (
      (match.homeScore > match.awayScore &&
        guessSaved.homeScore > guessSaved.awayScore) ||
      (match.homeScore < match.awayScore &&
        guessSaved.homeScore < guessSaved.awayScore)
    ) {
      buttonMessage = "+2 Acertou o vencedor";
    } else if (
      match.homeScore === match.awayScore &&
      guessSaved.homeScore === guessSaved.awayScore
    ) {
      buttonMessage = "+2 Acertou o empate";
    } else {
      buttonMessage = "+0 Errou tudo";
    }
  }

  const [homeScore, setHomeScore] = useState("0");
  const [awayScore, setAwayScore] = useState("0");

  async function handleSaveGuess() {
    if (!userEmail || isNaN(Number(homeScore)) || isNaN(Number(awayScore)))
      return;

    const guess = {
      userEmail,
      matchId: match._id,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
    };

    await api.post("/guess", {
      ...guess,
    });

    setGuessesCard([...guesses, guess]);
  }

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
          disabled={match.matchFinished && !guessSaved}
          inputProps={{ readOnly: !!guessSaved }}
          value={guessSaved ? String(guessSaved.homeScore) : homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
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
          disabled={match.matchFinished && !guessSaved}
          inputProps={{ readOnly: !!guessSaved }}
          value={guessSaved ? String(guessSaved.awayScore) : awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          autoComplete="off"
          id="outlined-basic"
          label="Gols"
          size="small"
          variant="outlined"
        />
      </Box>

      {guessSaved ? (
        <Button fullWidth sx={{ fontWeight: "bold" }} variant="outlined">
          {buttonMessage}
        </Button>
      ) : (
        <Button
          disabled={match.matchFinished && !guessSaved}
          onClick={handleSaveGuess}
          fullWidth
          variant="contained"
          sx={{ fontWeight: "bold" }}
          endIcon={
            match.matchFinished && !guessSaved ? (
              <AlarmOffIcon />
            ) : (
              <CheckIcon />
            )
          }
        >
          {match.matchFinished && !guessSaved ? "Tempo esgotado" : "Confirmar"}
        </Button>
      )}
    </Box>
  );
}