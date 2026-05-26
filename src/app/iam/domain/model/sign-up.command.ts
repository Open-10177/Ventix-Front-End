export interface SignUpCommand {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  photoUrl?: string;
}
