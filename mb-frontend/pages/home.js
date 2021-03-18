import { TextInput } from "../components/Input";
import Page from "../components/Page";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Grid, IconButton, InputAdornment } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

const validationSchema = yup.object({
	post: yup
		.string("Digite algo"),
});

export default function Home(props) {

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
    },
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
										<IconButton color="primary" aria-label="upload picture" component="span">
                    	<SendRoundedIcon />
										</IconButton>
                  </InputAdornment>
                )
              }}
						/>
					</Grid>
					<Grid item container justify="flex-end" xs={12} style={{marginTop: 20}}>
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
