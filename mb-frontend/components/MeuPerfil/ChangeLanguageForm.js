import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SelectInput } from "../Input";
import { translate } from "../../translations";

import {
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    fill: "#b6b6b6",
    width: "0.7em",
    borderWidth: "2px",
    "& label.MuiDialogActions-root": {
      padding: "0px",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1),
    height: "41px",
    textTransform: "uppercase",
  },
  submitClose: {
    margin: theme.spacing(1),
    height: "41px",
    marginRight: 10,
    textTransform: "uppercase",
  },
  textoErro: {
    fontWeight: 400,
    color: "#d72027",
  },
  submitBox: {
    textAlign: "right",
  },
  repeat: {
    textAlign: "center",
    margin: "16px 0",
  },
  dropdownIdioma: {
    marginBottom: "30px",
    height: "39px",
  },
}));

export default function ChangeLanguageForm({
  handleClose,
  language,
  setLanguage,
  options = [],
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  return (
    <>
      <FormControl variant="outlined" className={classes.dropdownIdioma}>
        <Select
          elevation={1}
          onChange={setLanguage}
          value={language}
          style={{padding: 0}}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem value="pt">{translate('pages.components.profile.change_language.possibilities.pt')}</MenuItem>
          <MenuItem value="en">{translate('pages.components.profile.change_language.possibilities.en')}</MenuItem>
        </Select>
      </FormControl>

      <Box className={classes.submitBox}>
        <Button className={classes.submitClose} onClick={handleClose}>
          {translate("cancel")}
        </Button>
      </Box>
    </>
  );
}
