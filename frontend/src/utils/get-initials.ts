export function getInitials(fullname: string): string {
  let initials = "";
  const names = fullname?.split(" ") || "";
  for (const name of names) {
    initials += name?.charAt(0)?.toUpperCase();
  }
  return initials;
}
