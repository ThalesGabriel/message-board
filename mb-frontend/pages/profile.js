import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { translate } from "../translations";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Page from "../components/Page";
import {
  Summary,
  UserAction,
  Bio,
  ChangePasswordForm,
  ChangeLanguageForm,
} from "../components/MeuPerfil";
import CircularProgress from "../components/CircularProgress";
import { setISODay } from "date-fns";
import actions from "../redux/actions";
import { compose } from 'recompose';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  customContainer: {
		margin: 'auto',
    "& h6.definition": {
      textTransform: "uppercase",
      marginBottom: 10,
    },
    "& .personal-info .container": {
      "@media (min-width: 960px)": {
        width: "97%",
      },
      marginLeft: "auto",
    },
  },
  dialog: {
    "& .MuiPaper-root": {
      "@media (min-width: 600px)": {
        width: "40vw",
      },
      "@media (max-width: 600px)": {
        width: "100vw",
      },
    },

    "& .MuiDialogTitle-root": {
      textAlign: "center",
    },

    "& .MuiDialogContentText-root": {
      color: "black",
      paddingTop: 8,
      textAlign: "center",
    },
  },
  centered: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const languages = ["PORTUGUÊS", "INGLÊS"];
const I18N_STORAGE_KEY = "i18nextLng";

function Profile(props) {
  const [data, setData] = React.useState({});
  const [id, setId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState(
    'pt'
  );
  const [openLanguage, setOpenLanguage] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenLanguage = () => {
    setOpenLanguage(true);
  };

  const handleCloseLanguage = () => {
    setOpenLanguage(false);
  };

  const handleSignOut = async () => {
    signOut();
    router.push("/");
    await client.resetStore();
  };

  const handleSelectLanguage = (event) => {
    localStorage.setItem(I18N_STORAGE_KEY, event.target.value);
    window.location = window.location;
  };

  useEffect(() => {
    console.log(props)
    if(!props.user) props.profile()
  },[ props ])

  if (false) {
    return (
      <Page>
        <Box className={classes.centered}>
          <CircularProgress />
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      <Grid container xs={10} justifyContent="center" className={classes.customContainer}>
        <Grid item md={6} xs={12}>
          <Typography variant="h6" component="h6" className="definition">
            Minhas informações
          </Typography>
          <Summary user={props.user} uploadFile={props.uploadFile} filename={props.filename}/>
          <UserAction
            definition={"Alteração de senha"}
            icon_path="/assets/alterarpalavrapasse.svg"
            button_label={'Alterar senha'}
            onClick={handleClickOpen}
          />
          <UserAction
            definition={"Alteração de idioma"}
            icon_path="/assets/idioma.svg"
            button_label="Alterar idioma"
            onClick={handleClickOpenLanguage}
          />
          <UserAction
            definition={"Finalizar sessão"}
            icon_path="/assets/logout.svg"
            button_label={"Finalizar sessão"}
            onClick={handleSignOut}
          />
        </Grid>
        <Grid item md={6} xs={12} className="personal-info">
          <Box className="container">
            <Typography variant="h6" component="h6" className="definition">
              Resumo
            </Typography>
            {/* <Bio my_profile={data} /> */}
          </Box>
        </Grid>
      </Grid>

      {/* Modal alterar senha */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle>
          <Typography variant="h5" component="h5">
            ALTERAR SENHA
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* <ChangePasswordForm
            handleClose={handleClose}
            email={dataProfile?.profile?.data?.email}
          /> */}
        </DialogContent>
      </Dialog>

      {/* Modal alterar idioma */}

      <Dialog
        open={openLanguage}
        onClose={handleCloseLanguage}
        aria-labelledby="alert-dialog-title-language"
        aria-describedby="alert-dialog-description-language"
        className={classes.dialog}
      >
        <DialogTitle>
          <Typography variant="h5" component="h5">
            ALTERAR IDIOMA
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ChangeLanguageForm
            handleClose={handleCloseLanguage}
            setLanguage={handleSelectLanguage}
            language={language}
            options={languages}
          />
        </DialogContent>
      </Dialog>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    error: state.authentication.error,
    loading: state.authentication.loading,
  };
}


export default connect(mapStateToProps, actions)(Profile);
