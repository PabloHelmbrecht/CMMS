//Imports
import { Stack, Avatar, Paper, Typography } from "@mui/material";

//Project imports
import ImageMasonry from "../../components/images-components/ImageMasonry";

export default function UpdateMessage({
  type = "comment",
  content,
  avatar,
  time,
  imageArray,
}) {
  const colors = {
    workOrder: "primary",
    update: "secondary",
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      {type === "comment" && <Avatar src={avatar}>U</Avatar>}
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-end"
        spacing={1}
        sx={{ width: "100%" }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 1,
            p: 1,
            borderTop: type !== "comment" ? "4px solid" : "",
            borderColor: `${colors[type] || "secondary"}.main`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {imageArray && (
            <ImageMasonry
              imageArray={imageArray}
              color={`${colors[type] || "secondary"}.main`}
              sxImage={{ borderRadius: "0.25em" }}
              sxList={{ mt: 1, mb: 2 }}
            />
          )}
          <Typography variant="body1" color="textPrimary">
            {content}
          </Typography>
        </Paper>
        <Typography variant="Gutter Bottom" color="textSecondary">
          {time}
        </Typography>
      </Stack>
    </Stack>
  );
}
