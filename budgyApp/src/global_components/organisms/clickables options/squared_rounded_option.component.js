import React, { useContext } from "react";

import { Text } from "../../../infrastructure/typography/text.component";

import { theme } from "../../../infrastructure/theme";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";

import { useSVGComponent } from "../../../util/system_icons.hook";
import { IsLoadingContainer } from "../../containers/isLoading_container";

import { HomeContext } from "../../../infrastructure/services/Home services/home.context";
import { AuthenticationContext } from "../../../infrastructure/services/authentication/authentication.context";

export const SquaredRoundedOptionComponent = ({ item, bill_id }) => {
  const { bill_short_name, bill_amount, payment_date, icon_name, isSelected } =
    item;
  const { SVGIconComponent } = useSVGComponent(icon_name);

  const { selectingBillFromBillsListByUserIdAndBillID, isLoadingBillRequest } =
    useContext(HomeContext);
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const [isLoading, setIsLoading] = React.useState(false);

  const actionAtSelectingBill = async () => {
    setIsLoading(true);
    try {
      await selectingBillFromBillsListByUserIdAndBillID(user_id, bill_id);
    } catch (error) {
      console.log("ERROR AT ACTION AT SELECTING BILL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ClickableControlledContainer
      width={100}
      height={100}
      justify="center"
      alignment="center"
      direction="column"
      color={
        isSelected
          ? theme.colors.buttons.s_142223C
          : theme.colors.neutrals.e2_F5F5F5
      }
      borderTopLeftRadius={20}
      borderBottomLeftRadius={20}
      borderTopRightRadius={20}
      borderBottomRightRadius={20}
      //   onPress={action}
      onPress={actionAtSelectingBill}
      margin_right={"4px"}
      margin_left={"4px"}
    >
      {isLoading && (
        <IsLoadingContainer
          size="small"
          color={isSelected ? "#FFFFFF" : theme.colors.brand.primary}
          caption=""
        ></IsLoadingContainer>
      )}
      {!isLoading && (
        <>
          <SVGIconComponent
            width={25}
            height={25}
            fill={
              isSelected
                ? theme.colors.brand.tertiary
                : theme.colors.buttons.s_142223C
            }
          />

          <Text
            text_variant={isSelected ? "white_bold_text_12" : "bold_text_12"}
          >
            {bill_short_name}
          </Text>
          <Text text_variant="green_bold_text_12">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(bill_amount)}
          </Text>
          <Text
            text_variant={isSelected ? "white_bold_text_12" : "bold_text_12"}
          >
            {payment_date}
          </Text>
        </>
      )}
    </ClickableControlledContainer>
  );
};
