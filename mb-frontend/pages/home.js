import React, { useEffect, useMemo, useState } from "react";
import { TextInput } from "../components/Input";
import Page from "../components/Page";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Grid,
  IconButton,
  Box,
  Typography,
  Paper,
  Avatar,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
// import { onClient, sendMessage } from "../utils/socketio";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import actions from "../redux/actions";
import { connect } from 'react-redux';
import FaceIcon from '@material-ui/icons/Face';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';

import { PostCard } from "../components/Home";
import FileUpload from "../components/FileUpload";

const useStyles = makeStyles((theme) => ({
  customTextInput: {
    display: "flex",
    backgroundColor: "white",
    "& .MuiFormControl-root": {
      backgroundColor: "rgb(245, 248, 250)",
    },
    "& fieldset": {
      border: "none",
    },
  },
  customFab: {
    padding: "10px 16px",
    "& .MuiFab-label": {
      margin: "0 20px",
      fontWeight: 400,
    },
    "& .MuiSvgIcon-root": {
      marginRight: 10,
    },
  },
  customAccordion: {
    backgroundColor: 'rgb(245, 248, 250)',
    "& .MuiAccordionDetails-root": {
      padding: 0
    }
  }
}));

const validationSchema = yup.object({
  post: yup
    .string()
    .required(),
});

function Home(props) {
  const { posts, post, error, loading, createPost, getPublishedPosts } = props
  const [ myPosts, setMyPosts ] = useState(posts)
  const [ accordionState, setAccordionState ] = useState(false)
  const styles = useStyles();
  const socket = React.useMemo(
    () =>
      io("http://localhost:3002/room", {
        transports: ["websocket"],
        upgrade: false,
      }),
    []
  );

  function sendMessage(message) {
    socket.emit("send-message", { message });
  }

  const formik = useFormik({
    initialValues: {
      post: '',
      published: true
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      console.log("submit");
      createPost(values)
      resetForm({
        post: "",
        published: true
      });
    },
  });

  useEffect(() => {
    socket.on("connect", function () {
      console.log("Connected");
      getPublishedPosts()
    });

    socket.on("receive-message", (content) => {
      console.log("received", content);
      setMyPosts((prevState) => [content.message, ...prevState])
    });
  }, [socket]);

  useEffect(() => {
    if(post) {
      setMyPosts((prevState) => [post, ...prevState])
      sendMessage(post);
    }
  }, [post]);

  useEffect(() => {
    if(posts) {
      setMyPosts(posts)
    }
  }, [posts]);

  console.log('props', myPosts)

  return (
    <Page>
      <Grid container justify="center">
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <Paper style={{ padding: 20 }}>
              <Box className={styles.customTextInput}>
                <Avatar
                  alt="Remy Sharp"
                  style={{ marginRight: 10 }}
                  src="https://picsum.photos/200/300"
                />
                <TextInput
                  label="Digite o que você está pensando!"
                  fieldName="post"
                  formik={formik}
                  multiline
                  style={{ backgroundColor: "#F5F8FA", border: "none" }}
                  rows={3}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment position="start">
                  //       <IconButton
                  //         color="primary"
                  //         component="span"
                  //         onClick={formik.submitForm}
                  //       >
                  //         <SendRoundedIcon />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FileUpload
                    accept="video/*,.mp4,.mkv,.avi,.m4v"
                  >
                    <OndemandVideoIcon />
                  </FileUpload>
                  <FileUpload
                    accept="image/*"
                  >
                    <PhotoOutlinedIcon />
                  </FileUpload>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button 
                    color="secondary" 
                    style={{marginRight: 10}}
                    onClick={() => { 
                      formik.setFieldValue('published', false)
                      formik.submitForm()
                    }}
                    disabled={!formik.isValid || !formik.dirty}
                  >
                    Salvar
                  </Button>
                  <Fab
                    variant="extended"
                    color="primary"
                    className={styles.customFab}
                    onClick={formik.submitForm}
                    disabled={!formik.isValid || !formik.dirty}
                  >
                    <SendRoundedIcon />
                    Postar
                  </Fab>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item container xs={6}>
          {loading? 
            <CircularProgress/>
          : 

          <>
            <Grid item xs={12} style={{marginTop:30}}>
              <Typography variant="h5" style={{textAlign: 'center'}}>Posts</Typography>
            </Grid>
            {myPosts.map((item, key) => (
              <PostCard post={item} key={key}/>
            ))}
          </>
          }
        </Grid>
      </Grid>
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.post_methods.post,
    posts: state.post_methods.posts,
    error: state.post_methods.error,
    loading: state.post_methods.loading,
  };
}


export default connect(mapStateToProps, actions)(Home);
