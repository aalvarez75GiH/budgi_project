import Styled from "styled-components/native";
import { View } from "react-native";

export const ControlledContainer = Styled(View)`
width:${(props) => props.width};
height:${(props) => props.height};
background-color: ${(props) => props.color};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.alignment};
flex-direction: ${(props) => props.direction};
border-bottom-width: ${(props) => props.border_bottom_width}px;
border-bottom-color: ${(props) => props.border_bottom_color};
/* border_bottom: 4px solid #898989 */

`;
