import { Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Loader } from "../components/Loader";
import { UserCard } from "../components/UserCard";
import { UserContext } from "../contexts/users";

export default function Ranking() {
  const { users } = useContext(UserContext);

  const usersSortedByScore = users.sort(
    (userA, userB) => userB.score - userA.score
  );

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
          overflowY: "scroll",
          mb: "57px",
          height: "calc(100vh - 56px)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography mt={3} variant="h5">
          Ranking
        </Typography>

        {usersSortedByScore.map((user, index) => {
          return <UserCard key={user.email} index={index} {...user} />;
        })}
      </Container>
    );
  }
  return <Loader />;
}
