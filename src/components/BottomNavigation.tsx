import BottomNav from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Paper } from "@mui/material";
import { useState } from "react";

export function BottomNavigation() {
  const [value, setValue] = useState(0);

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
        }}
      >
        <BottomNavigationAction label="Conta" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Palpites" icon={<SportsSoccerIcon />} />
        <BottomNavigationAction label="Ranking" icon={<TrendingUpIcon />} />
      </BottomNav>
    </Paper>
  );
}
