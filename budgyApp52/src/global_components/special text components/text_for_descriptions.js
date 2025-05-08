import Styled from "styled-components/native";
import { Text } from "react-native";
import { theme } from "../../infrastructure/theme";

export const TextForDescription = Styled(Text)`
font-family: ${theme.fonts.regular};
font-size: ${(props) => props.size}px;
color: ${theme.colors.text.p_142223C};
/* text-decoration: underline; */
multiline: ${(props) => props.multiline};
`;
