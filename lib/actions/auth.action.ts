type Signup = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
};

export async function signup(
  prevState: Signup | undefined,
  formData: FormData
) {}
