import Styled from "styled-components/native";
import { Text } from "react-native";
import { theme } from "../../infrastructure/theme";

export const UnderlinedRegularCaption = Styled(Text)`
font-family: ${theme.fonts.regular};
font-size: ${(props) => props.size}px;
color: ${theme.colors.text.p_142223C};
text-decoration: underline;
`;
export const UnderlinedRegularCaptionLightColor = Styled(Text)`
font-family: ${theme.fonts.regular};
font-size: ${(props) => props.size}px;
color: ${theme.colors.text.s_FFFFFF};
text-decoration: underline;
`;
export const UnderlinedBoldCaption = Styled(Text)`
font-family: ${theme.fonts.bold};
font-size: ${(props) => props.size}px;
color: ${theme.colors.text.p_142223C};
text-decoration: underline;
`;
export const UnderlinedBoldWhiteCaption = Styled(Text)`
font-family: ${theme.fonts.bold};
font-size: ${(props) => props.size}px;
color: ${theme.colors.text.s_FFFFFF};
/* text-decoration: underline; */
`;

export const UnderlinedBoldCaptionLightColor = Styled(Text)`
font-family: ${theme.fonts.bold};
font-size: ${(props) => props.size}px;
color: ${theme.colors.text.s_FFFFFF};
text-decoration: underline  ; 
/* text-decoration-color: #FFFFFF; */

`;
