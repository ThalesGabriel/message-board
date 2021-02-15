import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Page/Copyright";
import { useFormik } from "formik";
import * as yup from "yup";
import actions from "../redux/actions";
import { compose } from 'recompose';
import { connect } from 'react-redux';
import CircularProgress from "../components/CircularProgress";
import CustomSnackbar from "../components/CustomSnackbar";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
	first_name: yup
		.string("Digite seu primeiro nome"),
	last_name: yup
		.string("Digite seu sobrenome"),
  email: yup
    .string("Digite seu email")
    .email("Digite um email válido")
    .required("Campo obrigatório"),
  password: yup
    .string("Digite sua senha")
    .min(6, "Senha deve ter ao menos 6 caracteres")
    .required("Campo obrigatório"),
});

function Register(props) {
  const classes = useStyles();
  const router = useRouter();
  const [ finished, setFinished ] = React.useState(false)

  React.useEffect(() => {
    if(props.user) {
      setFinished(true)
      setTimeout(() => { 
        router.push("/") 
      }, 4000)
    }
  }, [props])

	const formik = useFormik({
    initialValues: {
			first_name: 'foo',
			last_name: 'bar',
      email: 'foobar2@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
		enableReinitialize: true,
    onSubmit: (values) => {
      props.registerUser(values)

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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
								value={formik.values.first_name}
								onChange={formik.handleChange}
								error={formik.touched.first_name && Boolean(formik.errors.first_name)}
								helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
								value={formik.values.last_name}
								onChange={formik.handleChange}
								error={formik.touched.last_name && Boolean(formik.errors.last_name)}
								helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={props.loading || finished}
            color="primary"
            className={classes.submit}
          >
            {props.loading || finished? <CircularProgress size={20}/> : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {props.error && (<CustomSnackbar text={props.error.message} cause={"error"}/>)}
      {props.user && (<CustomSnackbar text={"User successfully created. We are redirecting you."} cause={"success"}/>)}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authentication.user,
    error: state.authentication.error,
    loading: state.authentication.loading,
  };
}


export default connect(mapStateToProps, actions)(Register);