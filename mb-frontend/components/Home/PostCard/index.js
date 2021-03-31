
import React, { useEffect, useMemo, useState } from "react";
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteBorderRounded from "@material-ui/icons/FavoriteBorderRounded";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { format } from "date-fns";
import {
  Grid,
  IconButton,
  AccordionSummary,
  Box,
  Typography,
  Paper,
  Avatar,
  Accordion,
  AccordionDetails,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextInput } from "../../Input";


const useStyles = makeStyles((theme) => ({
  customAccordion: {
    "& .MuiAccordionDetails-root": {
      padding: 0
    }
  }
}));

export default function PostCard(props) {
	const { post, key } = props
	const [ accordionState, setAccordionState ] = useState(false)
  const styles = useStyles();

  return (
    <Grid item xs={12} key={key} style={{ marginTop: 20 }}>
      <Paper style={{ padding: 20 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              style={{ marginRight: 10, width: 60, height: 60 }}
              src="https://picsum.photos/200/300"
            />
            <Box>
              <Typography>{post.author?.name}</Typography>
              <Typography variant="body2">thalesg88@gmail.com</Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            {format(new Date(post.createdAt), "dd/MM/yyyy, 'às' H:mm")}
          </Typography>
        </Box>
        <Box style={{ padding: 20 }}>
          <Typography>{post.content}</Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            color="secondary"
            component="span"
            onClick={() => setAccordionState(!accordionState)}
          >
            {accordionState ? (
              <ChatBubbleIcon />
            ) : (
              <ChatBubbleOutlineRoundedIcon />
            )}
          </IconButton>
          <IconButton color="secondary" component="span">
            <FavoriteBorderRoundedIcon />
          </IconButton>
        </Box>
        <Accordion expanded={accordionState} style={{border: 0, boxShadow: 0, backgroundColor: "white"}}>
          <AccordionSummary
            style={{ display: "none" }}
            aria-controls="panel1a-content"
            id="panel1a-header"
          ></AccordionSummary>
          <AccordionDetails style={{flexDirection: 'column'}}>
						<Box sty>
							<TextField label="Comentar" fullWidth/>
						</Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Grid>
  );
}
