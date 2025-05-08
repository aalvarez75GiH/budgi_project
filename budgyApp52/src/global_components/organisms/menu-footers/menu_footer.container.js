import Styled from "styled-components/native";
import { View } from "react-native";

export const FooterMenuContainer = Styled(View)`
width: 100%;
height: 100%;
background-color:${(props) => props.color};
/* border: 2px solid #000000; */
/* border-radius: 50px; */
`;
