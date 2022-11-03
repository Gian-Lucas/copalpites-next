import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loader } from "../components/Loader";

export default function Account() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated") {
    router.push("/login");
  } else {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          height: "calc(100vh - 56px)",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            padding: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography color="lightgray">{session?.user?.email}</Typography>

          {session?.user?.image && session?.user?.name && (
            <Avatar alt={session?.user?.name} src={session?.user?.image} />
          )}
        </Box>

        <Typography variant="h5">Olá, {session?.user?.name}!</Typography>

        <Button
          variant="contained"
          sx={{ fontWeight: "bold", p: 1.5 }}
          startIcon={<ExitToAppIcon />}
          onClick={() => signOut()}
        >
          Fazer Logout
        </Button>
      </Container>
    );
  }
  return <Loader />;
}
