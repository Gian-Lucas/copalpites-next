import BottomNav from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paper } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

export function BottomNavigation() {
  const router = useRouter();
  const [value, setValue] = useState(router.asPath);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNav
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(`/${newValue}`);
        }}
      >
        <BottomNavigationAction
          value=""
          label="Conta"
          icon={<AccountCircleIcon />}
        />
        <BottomNavigationAction
          value="guess"
          label="Palpites"
          icon={<SportsSoccerIcon />}
        />
        <BottomNavigationAction
          value="ranking"
          label="Ranking"
          icon={<TrendingUpIcon />}
        />
      </BottomNav>
    </Paper>
  );
}
