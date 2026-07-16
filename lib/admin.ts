import { auth, currentUser } from '@clerk/nextjs/server';

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isAdminAuthed(): Promise<boolean> {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) return false;

  const allowlist = adminEmails();
  if (allowlist.length === 0) return false;

  const user = await currentUser();
  return Boolean(
    user?.emailAddresses.some((item) =>
      allowlist.includes(item.emailAddress.toLowerCase()),
    ),
  );
}
