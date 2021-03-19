import { useEffect, useState } from "react";
import { TextInput } from "../components/Input";
import Page from "../components/Page";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, IconButton, InputAdornment } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
// import { onClient, sendMessage } from "../utils/socketio";

import io from "socket.io-client";
import * as uuid from "uuid";

const socket = io("http://localhost:3001");

const validationSchema = yup.object({
  post: yup.string("Digite algo"),
});

export default function Home(props) {
  const [messages, setMessages] = useState([]);

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      sendMessage();
      resetForm();
    },
  });

  function sendMessage() {
    socket.emit("Message", formik.values.post);
  }

  useEffect(() => {
    socket.on("Message", (data) => {
      const message = document.createElement("p");
      message.textContent = data;
      app.appendChild(message);
      console.log(data);
    });
  
    socket.on("Connect", (data) => {
      const connect = document.createElement("p");
      connect.textContent = "A client has connected";
      connect.style.color = "green";
      app.appendChild(connect);
      console.log(data);
    });
    
    console.log('after connect', socket);
    
    socket.on("Disconnect", (data) => {
      const disconnect = document.createElement("p");
      disconnect.textContent = "A client has disconnected";
      disconnect.style.color = "red";
      app.appendChild(disconnect);
      console.log(data);
    });
  });


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
    </Page>
  );
}
