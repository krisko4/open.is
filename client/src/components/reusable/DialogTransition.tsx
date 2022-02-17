import { SlideProps, Slide } from "@mui/material";
import React from "react";

const DialogTransition = React.forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export default DialogTransition 