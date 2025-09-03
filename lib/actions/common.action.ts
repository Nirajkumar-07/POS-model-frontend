export default async function handleErrors(error: any) {
  let errorMessage = error.response?.data?.message || error.message;
  if (error.code == "credentials") {
    errorMessage = "Invalid credentials";
  }
  switch (error.status) {
    case 401:
      error = "unauthorized user";
      break;
    case 404:
      error = error.response.data.message;
      break;
    default:
      break;
  }
  return errorMessage;
}
