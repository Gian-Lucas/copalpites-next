import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/");
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
