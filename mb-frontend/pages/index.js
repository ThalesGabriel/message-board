import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as yup from "yup";
import { TextInput } from "../components/Input";
import actions from "../redux/actions";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import CustomSnackbar from "../components/CustomSnackbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        <a style={{color:"inherit"}} href="https://material-ui.com/">
          Message Board
        </a>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
	username: yup
		.string("Digite seu primeiro nome"),
  password: yup
    .string("Digite sua senha")
    .min(6, "Senha deve ter ao menos 6 caracteres")
    .required("Campo obrigatório"),
});

function SignIn(props) {
  const classes = useStyles();
  const router = useRouter();
  const [ finished, setFinished ] = React.useState(false)

  React.useEffect(() => {
    if(props.token) {
      setFinished(true)
      router.push("/home") 
    }
  }, [props])

  const formik = useFormik({
    initialValues: {
			username: '',
      password: '',
    },
    validationSchema: validationSchema,
		enableReinitialize: true,
    onSubmit: (values) => {
      props.login(values)
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextInput
            label="Username"
            fieldName="username"
            formik={formik}
            style={{marginBottom: 20}}
          />
          <TextInput
            label="Password"
            fieldName="password"
            formik={formik}
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.loading || finished}
            color="primary"
            className={classes.submit}
          >
            {props.loading || finished? <CircularProgress size={20}/> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {props.error && (<CustomSnackbar text={props.error.message} cause={"error"}/>)}
      {props.user && (<CustomSnackbar text={"User successfully created. We are redirecting you."} cause={"success"}/>)}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    error: state.authentication.error,
    loading: state.authentication.loading,
  };
}


export default connect(mapStateToProps, actions)(SignIn);