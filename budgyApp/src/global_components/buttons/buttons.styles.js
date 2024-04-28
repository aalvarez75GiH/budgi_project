import Styled from "styled-components/native";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

// ********************* Regular CTA Button

export const CTAButtonContainer = Styled(View)`
  width: ${Platform.OS === "ios" ? "410px" : "400px"};
  height: 90px;
  background-color: red;
  justify-content: center;
  align-items: center;
  `;
export const CTAButton = Styled(TouchableOpacity)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.borderRadius}px;
  /* border-radius: 50px; */
  /* margin-top: 50px; */
  `;

// ********************* Regular CTA + Icon Button
export const CTAButtonPlusIcon = Styled(TouchableOpacity)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.borderRadius}px;
  flex-direction: row;
  
  /* border-radius: 50px; */
  /* margin-top: 50px; */
`;

export const CTAButtonPlusIconContainer = Styled(View)`
flex: 1;
flex-direction: row;
`;

export const CTAButtonPlusIconCaption = Styled(View)`
    flex: 0.76;
    justify-content: center;
    align-items: center;
    margin-left: 20%;
    
`;

export const CTAButtonPlusIconRNPContainer = Styled(View)`
    flex: 0.2;
    justify-content: center;
    align-items: center;
`;
// ********************* Num Pad Button
export const NumPadBtn = Styled(View)`
  width: ${(props) => (props.wide ? "170px" : "80px")};
  height: 80px;
  background-color: ${(props) => props.color};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  /* margin-right: 15px; */
`;

// **************** RNP Icon Button *****************
export const RNPIconBtn = Styled(IconButton)``;

export const RNPIconButtonContainer = Styled(View)`
  width:${(props) => props.width};
  height: 50px;
  /* background-color: blue; */
  justify-content: center;
  align_items: ${(props) => props.align};
  
`;

// ********************* Options Buttons Component *********

export const OptionsButtonsContainer = Styled(View)`
width: ${(props) => props.width};
height: ${(props) => props.height};
background-color: ${(props) => props.color};
/* border: 1px solid #000000; */
flex-direction:row;
justify-content: space-between;
`;

// ********************* Option Button
export const OptionButtonTextIconContainer = Styled(View)`
width: 70%;
height: auto;
/* background-color: red; */
flex-direction: row;
justify-content: center;
align-items: center;
`;

export const OPTButton = Styled(TouchableOpacity)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) =>
    props.isActive
      ? theme.colors.buttons.s_142223C
      : theme.colors.buttons.t_E5E5E5};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.borderRadius}px;
  
`;

// ********************* Link Button
export const LinkBtnContainer = Styled(View)`
width: 70%;
height: auto;
/* border: 2px solid #000000; */
/* position: absolute; */
/* top: 540px; */
/* left: 140px; */
justify-content: center;
align-items: center;
`;

export const LinkBtn = Styled(TouchableOpacity)`
  width: 100%;
  height: 40px;
  /* background-color: #E5E5E5; */
  justify-content: center;
  align-items: center;
  
`;

export const LinkButtonCaption = Styled(Text)`
font-family: ${theme.fonts.bold};
font-size: 16px;
color: ${theme.colors.text.p_142223C};
text-decoration: underline;

`;
// *************** Rounded Option Button ************
export const RoundedOPTButton = Styled(TouchableOpacity)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.borderRadius}px;
  
`;
