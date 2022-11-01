import { Button, Avatar, Container, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.image && session.user?.name && (
          <Avatar
            sx={{ bgcolor: "lightskyblue" }}
            alt={session.user.name}
            src={session.user.image}
          />
        )}
        Signed in as {session.user?.email} <br />
        <Button
          variant="contained"
          sx={{ fontWeight: "bold" }}
          startIcon={<LogoutIcon />}
          onClick={() => signOut()}
        >
          DESLOGAR
        </Button>
      </>
    );
  }
  return (
    <Container
      sx={{
        height: "calc(100vh - 56px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        display="flex"
        color="ghostwhite"
        fontSize="h3.fontSize"
        component="h1"
      >
        <Typography color="lightskyblue" fontSize="h3.fontSize">
          COPA
        </Typography>
        LPITES
      </Typography>

      <Button
        variant="contained"
        sx={{ fontWeight: "bold", p: 1.5 }}
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
      >
        ENTRAR COM GOOGLE
      </Button>
    </Container>
  );
}
