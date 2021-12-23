export type CreateAccountEntityPayload = {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
};
