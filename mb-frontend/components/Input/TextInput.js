import TextField from "@material-ui/core/TextField";

export default function TextInput(props) {
	const { fieldName, label, formik } = props
	
  return (
    <TextField
      variant="outlined"
      fullWidth
      id={fieldName}
      label={label}
			placeholder={label}
      name={fieldName}
      autoComplete="lname"
      value={formik.values[fieldName]}
      onChange={formik.handleChange}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
			{...props}
    />
  );
}
