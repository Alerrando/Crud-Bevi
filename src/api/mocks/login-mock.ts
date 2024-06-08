import { HttpResponse, http } from "msw";
import { LoginBody } from "../login";

export const loginMock = http.post<never, LoginBody>("http://34.71.240.100/api/auth/login", async ({ request }) => {
  const { email, password } = await request.json();

  if (email === "alerrandro2@gmail.com" && password === "N9b0qxko") {
    return HttpResponse.json({
      access_token: "fake_access_token",
      token_type: "Bearer",
      expires_in: 3600,
    });
  }

  return new HttpResponse(`{   "error": "Unauthorized" }`, { status: 401 });
});
