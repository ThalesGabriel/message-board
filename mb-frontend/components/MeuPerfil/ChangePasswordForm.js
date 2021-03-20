import React from "react";
import { useRouter } from "next/router";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import AlterarIdiomaLogIn from './alterarIdiomaLogIn.js';
import { translate } from '../../translations';
import {TextInput} from '../Input'
import CustomSnackbar from "../CustomSnackbar";

import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@material-ui/core";

const validationSchema = yup.object({
  oldPassword: yup
    .string(translate('validations.password'))
    .required(translate('validations.required')),
  password: yup
    .string(translate('validations.password'))
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*_#?ç&]{8,}$/,
      translate('pages.components.change_password.rules.subrule1')
    )
    .required(translate('validations.required')),
  repeatPassword: yup
    .string(translate('validations.password'))
    .required(translate('validations.required'))
    .oneOf([yup.ref('password'), null], translate('validations.passwordConfirmation')),
});


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
    minWidth: '450px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: "41px",
    textTransform: 'uppercase'
  },
  submitClose: {
    margin: theme.spacing(3, 0, 2),
    height: "41px",
    marginRight: 10,
    textTransform: 'uppercase'
  },
  textoErro: {
    fontWeight: 400,
    color: "#d72027",
  },
  submitBox: {
    textAlign: 'right',
  },
  repeat: {
    textAlign: 'center',
    margin: '16px 0'
  },
  input: {
    marginTop: 16,
    marginBottom: 8,
    "& input": {
      height: 40,
      padding: 0
    },
    textoErro: {
      fontWeight: 400,
      color: "#d72027",
    },
  },
  pwdRules: {
    alignSelf: 'flex-start',
    textAlign: 'left'
  }
}));


function IconStyled2() {
  const classes = useStyles();
  return <LockOutlinedIcon className={classes.root}></LockOutlinedIcon>;
}

export default function ChangePasswordForm({handleClose, email}) {
  const classes = useStyles();
  const [serverError, setServerError] = React.useState(null)
  const snackbar = useSnackbar();

  const formik = useFormik({
    initialValues: {
      password: '',
      oldPassword: '',
      repeatPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setFieldValue }) => {
      setServerError(null)
      updatePassword({
        variables: {
          oldPassword: values.oldPassword,
          newPassword: values.password
        },
      })
    },
  });

  const [updatePassword] = useMutation(UPDATE_PASSWORD, {
    onCompleted: (data) => {
      formik.setSubmitting(false)
      if (data?.updatePassword) {
        const { valid } = data.updatePassword
        handleClose()
        snackbar.showSuccessMessage(translate('successResponse.updatePassword'));
      }
      
    },
    onError: (error) => {
      formik.setSubmitting(false)
      console.log(error.message)

      if (error?.graphQLErrors.length) {
        let errMsg = "";
        error.graphQLErrors.map((er) => {
          errMsg += er.message + " "
        })
        setServerError(errMsg);
      } else {
        setServerError(translate('errors.serverError'));
      }
      
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>


      <TextInput
        label={translate("oldPassword")}
        fieldName="oldPassword"
        type="password"
        formik={formik}
        className={classes.input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconStyled2 />
            </InputAdornment>
          ),
        }}
      />

      <Box className={classes.repeat}>
        <Typography variant="body1" component="p" className={classes.pwdRules}>
          {translate('pages.components.change_password.subtitle')} 
          <br></br>
          <br></br>
          {translate('pages.components.change_password.rules.rule1')}<br></br>
          {translate('pages.components.change_password.rules.rule2')}<br></br>
          {translate('pages.components.change_password.rules.rule3')}<br></br>
          {translate('pages.components.change_password.rules.rule4')}<br></br>  
        </Typography>
              
      </Box>

      <TextInput
        label={translate("repeatPassword")}
        fieldName="password"
        type="password"
        formik={formik}
        className={classes.input}
        inputProps={{
          maxLength: 20
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconStyled2 />
            </InputAdornment>
          ),
        }}
      />
      

      <Box className={classes.repeat}>
        <Typography
          variant="body1"
          component="body1"
          className={classes.repeat}
        >
          {translate('repeatPassword2')}
        </Typography>
      </Box>

      <TextInput 
        label={translate('repeatPassword')}
        fieldName="repeatPassword"
        type="password"
        formik={formik}
        className={classes.input}
        inputProps={{
          maxLength: 20
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconStyled2 />
            </InputAdornment>
          ),
        }}
      />
      <Box className={classes.submitBox}>
        <Button className={classes.submitClose} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        {/* <SubmitButton 
          className={classes.submit} 
          label={translate('change')}
          dirty={formik.dirty} 
          isSubmitting={formik.isSubmitting} 
          isValid={formik.isValid}
        /> */}
      </Box>

      {
        serverError ? 
          <Typography variant="caption" className={classes.textoErro}>
            <br></br>
            {serverError}
          </Typography>
        : null
      }
      <br></br>
    </form>
  );
}
