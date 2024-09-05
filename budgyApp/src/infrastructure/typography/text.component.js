import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.regular};
  font-size: ${theme.fontSizes.text_20};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.p_142223C};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
  `;

// ********* 96  ********************
const white_regular_text_96 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_96};
color: ${theme.colors.text.s_FFFFFF};
font-weight: ${theme.fontWeights.regular};
`;
// ********* 32  ********************

const regular_text_32 = (theme) => `
font-family: ${theme.regular.bold};
font-size: ${theme.fontSizes.text_32};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;
const bold_text_32 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_32};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;
// ********* 24  ********************

const regular_text_24 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.regular};
`;
const bold_text_24 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;

const white_bold_text_24 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.text.s_FFFFFF};
font-weight: ${theme.fontWeights.bold};
`;
const neutral_bold_text_24 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_24};
color: ${theme.colors.neutrals.p_B7B7B7};
font-weight: ${theme.fontWeights.bold};
`;
// ********* 20  ********************

const regular_text_20 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.regular};
`;
const bold_text_20 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;

const white_bold_text_20 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.text.s_FFFFFF};
font-weight: ${theme.fontWeights.bold};
`;
const neutral_bold_text_20 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_20};
color: ${theme.colors.neutrals.p_B7B7B7};
font-weight: ${theme.fontWeights.bold};
`;

// ********* 16  ********************

const regular_text_16 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.regular};
`;
const bold_text_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;

const white_bold_text_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.text.s_FFFFFF};
font-weight: ${theme.fontWeights.bold};
`;

const neutral_bold_text_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.neutrals.p_B7B7B7};
font-weight: ${theme.fontWeights.bold};
`;
const green_bold_text_16 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_16};
color: ${theme.colors.ui.success};
font-weight: ${theme.fontWeights.bold};
`;

// ********* 14  ********************
const regular_text_14 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_14};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.regular};
`;
const bold_text_14 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_14};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;
const gold_bold_text_14 = (theme) => `
font-size: ${theme.fontSizes.text_14};
font-family: ${theme.fonts.bold};
color: ${theme.colors.ui.t_FC9827};
font-weight: ${theme.fontWeights.bold};
`;

const neutral_bold_text_14 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_14};
color: ${theme.colors.buttons.e2_5B6477};
font-weight: ${theme.fontWeights.bold};
`;
const white_bold_text_14 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_14};
color: ${theme.colors.text.s_FFFFFF};
font-weight: ${theme.fontWeights.bold};
`;

// ********* 12  ********************

const regular_text_12 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_12};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.regular};
`;
const bold_text_12 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_12};
color: ${theme.colors.text.p_142223C};
font-weight: ${theme.fontWeights.bold};
`;
const white_bold_text_12 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_12};
color: ${theme.colors.text.s_FFFFFF};
font-weight: ${theme.fontWeights.bold};
`;
const neutral_bold_text_12 = (theme) => `
font-family: ${theme.fonts.regular};
font-size: ${theme.fontSizes.text_12};
color: ${theme.colors.buttons.e2_5B6477};
font-weight: ${theme.fontWeights.regular};
`;
const error_bold_text_12 = (theme) => `
font-family: ${theme.fonts.bold};
font-size: ${theme.fontSizes.text_12};
color: ${theme.colors.ui.error_cancels};
font-weight: ${theme.fontWeights.regular};
`;

const variants = {
  defaultTextStyles,
  white_regular_text_96,
  regular_text_32,
  bold_text_32,
  regular_text_24,
  bold_text_24,
  white_bold_text_24,
  neutral_bold_text_24,
  regular_text_20,
  bold_text_20,
  white_bold_text_20,
  neutral_bold_text_20,
  bold_text_16,
  regular_text_16,
  white_bold_text_16,
  neutral_bold_text_16,
  green_bold_text_16,
  regular_text_14,
  bold_text_14,
  gold_bold_text_14,
  neutral_bold_text_14,
  white_bold_text_14,
  regular_text_12,
  bold_text_12,
  white_bold_text_12,
  neutral_bold_text_12,
  error_bold_text_12,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ text_variant, theme }) => variants[text_variant](theme)}
`;

Text.defaultProps = {
  text_variant: "defaultTextStyles",
};
