import Styled from "styled-components/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ResponsiveContainer = Styled(View)`
    width: ${(props) => {
      wp(props.width);
    }};
    
    height: ${(props) => {
      hp(props.height);
    }};
    
    flex-direction: ${(props) => props.direction};
    background-color: ${(props) => props.color};
    /* justify-content: center; */
    /* align-items: center; */
    border: 2px solid #000000;
        
`;
