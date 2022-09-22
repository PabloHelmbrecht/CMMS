import { Dialog, Box, IconButton, Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState } from "react";

//icons imports
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

//project imports
import useWindowDimensions from "../../utils/WindowDimensions";
import useKeyPress from "../../utils/useKeyPress";
import { useEffect } from "react";

const ImageView = ({ open, onClose, imageArray }) => {
  const theme = useTheme();
  const windowDimensions = useWindowDimensions()
  const ArrowLeft = useKeyPress('ArrowLeft');
  const ArrowRight = useKeyPress('ArrowRight');
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageDimentions, setImageDimentions] = useState({ height: windowDimensions.height, width: windowDimensions.width })

  //Change to the previous image
  const handleLeftClick = () => {
    index === 0 ? setIndex(imageArray.length - 1) : setIndex(index - 1);
    setLoading(true)
  };

  //Change to the next image
  const handleRightClick = () => {
    index === imageArray.length - 1 ? setIndex(0) : setIndex(index + 1);
    setLoading(true)
  };

  //Set the skeleton dimentions and handle the loading status
  const handleLoading = async ({ target: img }) => {
    setLoading(false)
    setImageDimentions({ height: (await img).offsetHeight, width: (await img).offsetWidth })
  }


  //Listen to keyboard event
  useEffect(() => {

    if (open) {
      ArrowLeft && handleLeftClick()
      ArrowRight && handleRightClick()
    }

  }, [ArrowLeft, ArrowRight,open])



  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth={"l"}
      PaperProps={{
        style: {
          overflow: "inherit"
        }
      }}
    >
      <IconButton onClick={handleLeftClick} size="large" color="default" sx={{ position: "absolute", bottom: isMobile?"-4rem":"50%", left: isMobile?"30%":"-3rem", color: theme.palette.secondary.A100 }} >
        <LeftOutlined />
      </IconButton>
      <IconButton onClick={handleRightClick} size="large" color="default" sx={{ position: "absolute", bottom: isMobile?"-4rem":"50%", right: isMobile?"30%":"-3rem", color: theme.palette.secondary.A100 }} >
        <RightOutlined />
      </IconButton>



      <>
        {loading &&
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={imageDimentions.width}
            height={imageDimentions.height}
            sx={{ m: 2, borderRadius: "0.25em" }}
          />}

        <Box
          component="img"
          sx={{
            maxHeight: loading ? "0px" : windowDimensions.height * 0.8 + "px",
            maxWidth: loading ? "0px" : windowDimensions.width * 0.8 + "px",
            borderRadius: "0.25em",
            m: 2,
            visibility: loading ? "hidden" : "visible",
            position: loading ? "absolute" : ""
          }}
          alt=""
          src={imageArray[index]}
          loading="lazy"
          onLoad={handleLoading}
        />
      </>

    </Dialog>
  );
};

export default ImageView;
