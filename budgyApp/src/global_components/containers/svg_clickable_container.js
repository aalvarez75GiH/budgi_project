import Styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { theme } from "../../infrastructure/theme";

export const SvgClickableContainer = Styled(TouchableOpacity)`
width: 20%;
height: 100%;
/* background-color: ${theme.colors.neutrals.p_B7B7B7}; */
/* background-color: red; */
justify-content: ${(props) => props.justify};
align_items: center;
position: ${(props) => props.position};
left: ${(props) => props.left};
top: ${(props) => props.right};
`;
