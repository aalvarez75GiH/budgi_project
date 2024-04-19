import React, { useContext } from "react";
import { ActivityIndicator } from "react-native-paper";

import { LinkBtn, LinkButtonCaption } from "./buttons.styles";

import { LinkBtnContainer } from "./buttons.styles";

export const LinkButton = ({ caption, action }) => {
  return (
    <LinkBtnContainer>
      <LinkBtn onPress={action}>
        <LinkButtonCaption>{caption}</LinkButtonCaption>
      </LinkBtn>
    </LinkBtnContainer>
  );
};
