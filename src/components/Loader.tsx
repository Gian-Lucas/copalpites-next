import { Container, CircularProgress } from "@mui/material";

export function Loader() {
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
      <CircularProgress />
    </Container>
  );
}
