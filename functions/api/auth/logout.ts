// functions/api/auth/logout.ts
export const onRequestPost = async () => {
  return Response.json(
    { success: true, message: 'Logged out successfully' },
    {
      headers: {
        'Set-Cookie': 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure',
      },
    }
  );
};
