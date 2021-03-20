import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
	Grid,
	Box,
  IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { translate } from "../../translations";
import Dropzone from "react-dropzone";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  CustomCard: {
    "@media (min-width: 960px)": {
      width: "97%",
    },
    padding: 15,
    marginBottom: 30,
    "& div.MuiCardContent-root": {
      padding: 0,
    },
    "& h3.title": {
      textTransform: "uppercase",
      fontSize: '1.7rem',
      fontWeight: 800
    },
    "& h6.custom-h6": {
      fontWeight: 500,
    },
  },
}));


let abort;

export default function Summary(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0)
  const [uploadObject, setUploadObject] = React.useState(null);
  const [aborted, setAborted] = React.useState(false)  

	// React.useEffect(() => {
  //   if (avatar) setUploadObject(avatar);
	// }, [avatar])
	
	const handeFileUploadComplete = (data) => {
    setUploadObject(data.singleUpload)
  };

  // if (profile) {
  //   name = profile.nome;
  //   city_name = profile.cidade;
	// }

  const handleUpload = (acceptedFiles) => {

    if (!acceptedFiles[0]) {
      return;
    }

    setAborted(false);
    upload({
      variables: {
        file: acceptedFiles[0],
      },

      context: {
        fetchOptions: {
          useUpload: true,
          onProgress: (ev) => {
            const newValue = Math.round((ev.loaded / ev.total) * 100);
            setProgress(newValue);
          },
          onAbortPossible: (abortHandler) => {
            abort = abortHandler;
          },
        },
      },
    });
  };

  return (
    <Card className={classes.CustomCard}>
      <CardContent>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography component="h3" variant="h3" className="title">
              Nome
            </Typography>
            <Typography component="h6" variant="h6">
              algo
            </Typography>
            <Typography component="h6" variant="h6" className="custom-h6">
              eita
            </Typography>
          </Grid>
          <Grid item>
            {/* {
							uploadObject ?
								<Grid container alignItems="center">
									<Grid item>
										<IconButton aria-label="delete" color="primary" onClick={() => setUploadObject(null)}>
											<DeleteIcon />
										</IconButton>
									</Grid>
									<Grid item>
										<Typography>{uploadObject.filename}</Typography>
									</Grid>
								</Grid>
								: 
								<SingleFileUpload onFileUploadComplete={handeFileUploadComplete} />
						{/* }          */}
            <Dropzone
              onDrop={handleUpload}
              disabled={false}
              accept="image/*"
            >
							{({getRootProps, getInputProps}) => ( 
								<Box {...getRootProps()}>
									<input {...getInputProps()} />

										<IconButton
											disableRipple="true"
											disableFocusRipple="true"
											component="span"
										>
											<Box style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
												<img width="100%" src={ uploadObject ? uploadObject.downloadURL : "/assets/add-photo.svg"} width="100px" height="100px" style={!uploadObject? {marginLeft: 6} : {borderRadius: 50}}/>
												{uploadObject && ( <EditIcon style={{position: 'absolute', bottom: 0, right: 0, color: '#d72027'}}/> )}
											</Box>
										</IconButton>
								</Box>
							)}
            </Dropzone>
          </Grid>
        </Grid>
        <br />
          <Typography component="h6" variant="h6" className="custom-h6">
            Membro desde
          </Typography> 
        
      </CardContent>
    </Card>
  );
}

Summary.propTypes = {
  name: PropTypes.string.isRequired,
  broker_name: PropTypes.string.isRequired,
  city_name: PropTypes.string.isRequired,
  member_since: PropTypes.string.isRequired,
};

Summary.defaultProps = {
  name: "-",
  broker_name: "-",
  city_name: "-",
  member_since: `${new Date().toLocaleDateString().substr(-4)}`,
};
