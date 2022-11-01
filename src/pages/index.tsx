import { Button, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loader } from "../components/Loader";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }
  return (
    <Button
      variant="contained"
      sx={{ fontWeight: "bold", p: 1.5 }}
      startIcon={<ExitToAppIcon />}
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
}
