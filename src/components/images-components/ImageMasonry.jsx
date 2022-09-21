import { Typography, Box, ImageListItem, ImageList } from "@mui/material";
import { useState } from "react";

//project imports
import ImageView from "./ImageView";
import srcset from "../../utils/image-formatter";

export default function ImageMasonry({
  imageArray,
  color = "primary.400",
  fontVariant = "h1",
  sxList,
  sxImage
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ImageList variant="quilted" cols={2} sx={sxList}>
        <ImageListItem
          sx={{ "& img": { ...sxImage } }}
          key={imageArray[0]}
          rows={imageArray.length > 2 ? 1 : 2}
          cols={imageArray.length > 1 ? 1 : 2}
        >
          <img
            {...srcset(
              imageArray[0],
              400,
              imageArray.length > 2 ? 1 : 2,
              imageArray.length > 1 ? 1 : 2
            )}
            loading="lazy"
            alt=""
          />
        </ImageListItem>
        {imageArray.length > 1 && (
          <ImageListItem
            sx={{ "& img": { ...sxImage } }}
            key={imageArray[1]}
            rows={imageArray.length > 2 ? 1 : 2}
            cols={1}
          >
            <img
              {...srcset(imageArray[1], 400, imageArray.length > 2 ? 1 : 2, 1)}
              loading="lazy"
              alt=""
            />
          </ImageListItem>
        )}
        {imageArray.length > 2 && (
          <ImageListItem
            sx={{ "& img": { ...sxImage } }}
            key={imageArray[2]}
            rows={1}
            cols={imageArray.length > 3 ? 1 : 2}
          >
            <img
              {...srcset(imageArray[2], 400, 1, imageArray.length > 3 ? 1 : 2)}
              loading="lazy"
              alt=""
            />
          </ImageListItem>
        )}
        {imageArray.length > 3 && (
          <ImageListItem
            sx={{ "& img": { ...sxImage } }}
            key={imageArray[3]}
            onClick={handleClickOpen}
          >
            <img {...srcset(imageArray[3], 400)} loading="lazy" alt="" />
            {imageArray.length > 4 && (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: color,
                  opacity: 0.75,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  ...sxImage
                }}
              ></Box>
            )}
            {imageArray.length > 4 && (
              <Typography
                variant={fontVariant}
                color="white"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                +{imageArray.length - 4}
              </Typography>
            )}
          </ImageListItem>
        )}
      </ImageList>
      <ImageView onClose={handleClose} open={open} imageArray={imageArray} />
    </>
  );
}
