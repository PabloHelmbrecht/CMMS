import { Dialog, Box } from "@mui/material";
import { useState, useEffect } from "react";

//icons imports
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

//project imports
import srcset from "../../utils/image-formatter";
import useWindowDimensions from "../../utils/WindowDimensions";

const ImageView = ({ open, onClose, imageArray }) => {
  const [index, setIndex] = useState(0);

  const handleLeftClick = () => {
    index === 0 ? setIndex(imageArray.length - 1) : setIndex(index - 1);
  };

  const handleRightClick = () => {
    index === imageArray.length - 1 ? setIndex(0) : setIndex(index + 1);
  };

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
      <LeftOutlined
        onClick={handleLeftClick}
        color="primary"
        sx={{
          position: "absolute !important",
          left: "-1.5rem",
          bottom: "50%"
        }}
      />
      <RightOutlined
        onClick={handleRightClick}
        color="primary"
        sx={{
          position: "absolute !important",
          right: "-1.5rem",
          bottom: "50%"
        }}
      />
      <Box
        component="img"
        sx={{
          maxHeight: useWindowDimensions().height * 0.8 + "px",
          maxWidth: useWindowDimensions().width * 0.8 + "px",
          borderRadius: "0.25em",
          m: 2
        }}
        alt=""
        src={imageArray[index]}
      />
    </Dialog>
  );
};

export default ImageView;
