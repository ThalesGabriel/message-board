import React, { useEffect } from "react";
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
import { format } from "date-fns";

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
  const {user, uploadFile, filename} = props;
  const [ loading, setLoading ] = React.useState(true)
  const [ image, setImage ] = React.useState(null)

  useEffect(() => {
    console.log(props)
    if(user?.avatar?.file?.filename) {
      console.log(true)
      setImage(user.avatar.file.filename)
    }
    if(filename) setImage(filename)
    setLoading(false)
  }, [user, filename])

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

  const handleUpload = async (acceptedFiles) => {

    if (!acceptedFiles[0]) {
      return;
    }

    setAborted(false);
    
    await uploadFile({
      file: acceptedFiles[0],
      user: user.id
    })
  };

  if(loading) return null 

  return (
    <Card className={classes.CustomCard}>
      <CardContent>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography component="h3" variant="h3" className="title">
              {user?.name}
            </Typography>
            <Typography component="h6" variant="h6">
              {user?.email.toLowerCase()}
            </Typography>
            <Typography component="h6" variant="h6" className="custom-h6">
              Recife
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
												<img width="100%" src={ image ? `tmp/uploads/${image}` : "/assets/add-photo.svg"} width="100px" height="100px" style={!image? {marginLeft: 6} : {borderRadius: 50}}/>
												{/* <img width="100%" src="tmp/uploads/d0733557d01fe58aa59c5d8ef0a6cccb" width="100px" height="100px" style={!uploadObject? {marginLeft: 6} : {borderRadius: 50}}/> */}
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
            Membro desde {user ? format(new Date(user?.createdAt), "dd/MM/yyyy") : ""}
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
