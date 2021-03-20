import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  action: {
    marginBottom: 30,
		borderRadius: 20,
    "& .definition": {
      textTransform: "uppercase",
      marginBottom: 10,
    },
    "& .custom-card": {
      "@media (min-width: 960px)": {
        width: "97%",
      },
      marginBottom: 30,
      height: 50,
      "& .MuiButtonBase-root.MuiCardActionArea-root": {
        display: "flex",
        padding: "0 15px",
        height: "100%",
        justifyContent: "start",
        "& .text": {
          marginLeft: 8,
          textTransform: "uppercase",
          color: "#ff3366",
        },
        "& .MuiSvgIcon-root": {
          marginLeft: "auto",
          color: "#ff3366",
        },
      },
    },
  },
}));

export default function UserAction(props) {
  const classes = useStyles();

  const { definition, button_label, icon_path, onClick } = props;

  return (
    <Box className={classes.action}>
      <Typography variant="h6" component="h6" className="definition">
        {definition}
      </Typography>
      <Card className="custom-card" style={{backgroundColor: '#28282a', borderRadius: 20}}>
        <CardActionArea onClick={onClick}>
          <img src={icon_path} />
          <Typography className="text" variant="h6" color="primary">
            {button_label}
          </Typography>
          <KeyboardArrowRightIcon />
        </CardActionArea>
      </Card>
    </Box>
  );
}

UserAction.propTypes = {
  definition: PropTypes.string.isRequired,
  button_label: PropTypes.string.isRequired,
  icon_path: PropTypes.string.isRequired,
};

UserAction.defaultProps = {
  definition: "",
  button_label: "",
  icon_path: "",
};
