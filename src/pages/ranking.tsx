import { Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { UserCard } from "../components/UserCard";
import { api } from "../lib/axios";

interface User {
  name: string;
  email: string;
  image: string;
  score: number;
}

export default function Ranking() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/users");

      setUsers(res.data.users);
    })();
  }, []);

  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") return <Loader />;

  if (status === "unauthenticated") router.push("/login");

  if (status === "authenticated") {
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

        {users.length === 0 && <Loader />}

        {users.map((user, index) => {
          return (
            <UserCard
              key={user.email}
              sessionEmail={session.user?.email}
              index={index}
              {...user}
            />
          );
        })}
      </Container>
    );
  }

  return <Loader />;
}
