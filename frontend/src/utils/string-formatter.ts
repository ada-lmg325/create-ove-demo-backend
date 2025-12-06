export function formatString(input: string): string {
  return input
    .replace(/_/g, " ")
    .split(" ") // split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
