import { Text, TextProps } from "react-native";

export function StyledText({
  className = "",
  ...props
}: TextProps & { className?: string }) {
  return <Text {...props} className={`font-inter ${className}`} />;
}
