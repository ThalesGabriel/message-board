import React, { useEffect, useMemo, useState } from "react";
import { TextInput } from "../components/Input";
import Page from "../components/Page";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, IconButton, InputAdornment, Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
// import { onClient, sendMessage } from "../utils/socketio";
import io from "socket.io-client";

const validationSchema = yup.object({
  post: yup.string("Digite algo"),
});


export default function Home(props) {
  const [posts, setPosts] = useState([]);
  const socket = React.useMemo( () => 
    io('http://localhost:3002/room', { 
      transports : ['websocket'], 
      upgrade: false 
    }), [] 
  );

  function sendMessage(message) {
    socket.emit('send-message', { message });
  }

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      console.log('submit')
      sendMessage(values.post);
      resetForm({
        post: ''
      });
    },
  });

  useEffect(() => {
    socket.on('connect', function() {
      console.log('Connected');
    });

    socket.on('receive-message', (content) => {
      console.log('received', content)
      setPosts((prevState) => [content.message, ...prevState])
    })
  }, [socket]);

  console.log(posts)

  return (
    <Page>
      <Grid container justify="center">
        <Grid item container xs={6}>
          <Grid item xs={12}>
            <TextInput
              label="Digite o que você está pensando!"
              fieldName="post"
              formik={formik}
              multiline
              rows={3}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={formik.submitForm}
                    >
                      <SendRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            xs={12}
            style={{ marginTop: 20 }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                // style={{marginRight: 10}}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </Grid>
            {/* <Grid item>
							<Button
								variant="contained"
								color="default"
								startIcon={<CloudUploadIcon />}
							>
								Upload
							</Button>
						</Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item container xs={6}>
          {posts.map((post, key) => (
            <Grid item xs={12} key={key}>
              <Typography>{post}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Page>
  );
}
