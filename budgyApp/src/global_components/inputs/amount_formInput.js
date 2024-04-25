import Styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const AmountFormInput = Styled(TextInput)`
width: ${(props) => props.width || "100%"};
height: ${(props) => props.height || "50px"};
background-color: ${(props) => props.color || "transparent"};  
font-family: ${theme.fonts.bold};
font-weight: ${theme.fontWeights.bold};
font-size: ${(props) => props.font_size || "16px"};
border-radius: ${(props) => props.border_radius || "0px"};
text-align: center;
/* margin-top: ${(props) => props.marginTop || "0px"};
margin-bottom: ${(props) => props.marginBottom || "0px"};
margin-right: ${(props) => props.marginRight || "0px"};
margin-left: ${(props) => props.marginLeft || "0px"};   
padding: ${(props) => props.padding || "0px"};   */
/* border-radius: 50px; */
`;
