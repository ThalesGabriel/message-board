import {
  UPLOAD_FAIL,
	UPLOAD_REQUESTED,
	UPLOAD_SUCCESS
} from "../types";
import axios from "axios";
import api from "../../utils/api";
import { setCookie } from "../../utils/cookie";

const uploadFile = (values) => {
  return (dispatch) => {
    let formatFile = values.file
    formatFile.filename = values.file.name
    
    console.log("upload file", formatFile);
    dispatch({ type: UPLOAD_REQUESTED });
    console.log("UPLOAD_REQUESTED", values);

    let formData = new FormData()

    formData.append('image', formatFile)

    let variables = {
      file: formData,
    };

		if(values.user) variables.user = values.user
		if(values.post) variables.post = values.post

    fetch('http://localhost:3001/file-upload/one', {
        method: 'POST',
        body: formData,
      })
      .then((response) => {
        console.log('res', response);
        dispatch({
          type: UPLOAD_SUCCESS,
          filename: response.data
        });
      })
      .catch((error) => {
        console.log("error");
        console.log(error.response);
        dispatch({
          type: UPLOAD_FAIL,
          error: {
            message: error.response.data.message,
          },
        });
      });
  };
};

export default {
  uploadFile,
};
