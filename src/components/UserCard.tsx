import { Avatar, Box, Chip, Typography } from "@mui/material";

interface UserCardProps {
  index: number;
  score: number;
  name: string;
  image: string;
}

export function UserCard({ index, score, name, image }: UserCardProps) {
  return (
    <Box
      width="100%"
      bgcolor="#202024"
      borderRadius="4px"
      borderBottom={2}
      borderColor="lightskyblue"
      padding={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2.5}
    >
      <Box
        display="flex"
        // flexDirection="column"
        alignItems="center"
        gap={1}
      >
        <Avatar alt={name} src={image} />
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography fontWeight="bold">{name}</Typography>

          <Typography variant="caption" color="darkgray">
            {score} ponto(s)
          </Typography>
        </Box>
      </Box>

      {index > 2 ? (
        <Chip
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          color="primary"
          label={`${index + 1}º`}
        />
      ) : (
        <Chip
          sx={{ fontWeight: "bold" }}
          color="primary"
          label={`${index + 1}º`}
        />
      )}
    </Box>
  );
}
