import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
//import Button from '@material-ui/core/Button'
import Paper from "@material-ui/core/Paper";
import Dropzone from "react-dropzone";
import { Button, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paperWraper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: "41px",
		borderRadius: "3px",
		border: "none",
		boxShadow: "unset",
		fontSize: "0.75rem",
		backgroundColor: "#e8e7e6",
		color: "#d72027",
		width: "100%",

		"& .drag-drop-title": {
			display: "flex",
			"@media (max-width: 600px)": {
				textAlign: "center",
			},
			"& img": {
				"@media (max-width: 600px)": {
					marginLeft: 10,
				},
				"@media (min-width: 600px)": {
					marginRight: 10,
				},
			},
		},
	},
	progressbar: {
		height: "15px",
		marginRight: "10px",
		marginLeft: "10px",
	},
	rootGrid: {
		height: "100%",
	},
}));

let abort;

const FileUpload = ({ accept, style, children }) => {
	const classes = useStyles();
	const [progress, setProgress] = React.useState(0);
	const [aborted, setAborted] = React.useState(false);

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
		<Dropzone
			onDrop={handleUpload}
			disabled={aborted}
			accept={accept}
		>
			{({ getRootProps, getInputProps }) => (
				<IconButton
					{...getRootProps()}
					color="secondary"
					component="span"
				>
					<input {...getInputProps()} />

					{children}
				</IconButton>
			)}
		</Dropzone>
	);
};

export default FileUpload;