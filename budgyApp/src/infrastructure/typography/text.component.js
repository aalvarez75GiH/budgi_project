import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.regular};
  font-size: ${theme.fontSizes.text_20};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.p_142223C};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
  `;

//   ********* Buttons Text Style *****************

const cta_dark_caption_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};
`;

const cta_light_caption_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.s_FFFFFF};
`;
const cta_dark_caption = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.p_142223C};

`;
const cta_light_caption = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.s_FFFFFF};
`;

const numPad_light_caption = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.text.s_FFFFFF};
`;

const numPad_dark_caption = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.text.p_142223C};
`;
//   ************************************************

//   ********* Display Style *****************
const numPad_display = (theme) => `
font-size: ${theme.fontSizes.text_96};
font-family: ${theme.fonts.regular};
color: ${theme.colors.text.s_FFFFFF}
`;
//   ************************************************

// ********* Flow Text Style ************************
const gold_flow_text = (theme) => `
font-size: ${theme.fontSizes.text_14};
font-family: ${theme.fonts.bold};
color: ${theme.colors.ui.t_FC9827}
`;

//   ************************************************

const dark_bold_caption_20 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.p_142223C};
`;
const dark_bold_caption_24 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.text.p_142223C};
`;
const grey_bold_caption_24 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.neutrals.p_B7B7B7};
`;

const regular_caption_16 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};

`;
const regular_caption_20 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.p_142223C};

`;
const headers_label = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.p_142223C};

`;

const Category_Tile_Caption = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};

`;

const Link_button = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};

`;
const Link_button_regular = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};
`;

const transaction_date = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_14};
color: ${theme.colors.buttons.e2_5B6477};
`;
const bold_caption_12 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_12};
color: ${theme.colors.text.p_142223C};
`;

const disable_caption_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.disabled};
`;

const variants = {
  numPad_display,
  cta_dark_caption,
  cta_light_caption,
  numPad_light_caption,
  numPad_dark_caption,
  defaultTextStyles,
  gold_flow_text,
  headers_label,
  dark_bold_caption_20,
  Category_Tile_Caption,
  cta_dark_caption_16,
  cta_light_caption_16,
  regular_caption_16,
  Link_button,
  Link_button_regular,
  dark_bold_caption_24,
  regular_caption_20,
  transaction_date,
  bold_caption_12,
  grey_bold_caption_24,
  disable_caption_16,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ text_variant, theme }) => variants[text_variant](theme)}
`;
// export const UnderlinedText = styled(Text)`
//   ${({ theme }) => defaultTextStyles(theme)}
//   ${({ text_variant, theme }) => variants[text_variant](theme)}
// underline: underline
// `;

Text.defaultProps = {
  text_variant: "defaultTextStyles",
};
