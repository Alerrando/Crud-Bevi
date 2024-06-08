export type LoginBody = {
  email: string;
  password: string;
};

export type LoginProps = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export async function login() {
  const response = await fetch("http://34.71.240.100/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "alerrandro2@gmail.com",
      password: "N9b0qxko",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);

  return response;
}
