import React, { useContext, useEffect } from "react";
import { Platform } from "react-native";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { useEnterAmountLogic } from "../../hooks/useEnterAmountLogic";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { AccordionComponent } from "../../global_components/organisms/animated components/accordion.component";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { HomeContext } from "../../infrastructure/services/Home services/home.context";

export const NewOrUpdateCategoryConfirmationView = ({ navigation }) => {
  // ****************LOGIC FROM HOOK ********
  const {
    category_list_info_forRequest,
    category_list_info_forUpdate,
    movingBackToHome,
  } = useContext(CategoryListContext);
  const { fixingANumberToTwoDecimalsAndString } =
    useContext(TransactionsContext);

  const { action_to_do } = useContext(HomeContext);
  console.log(
    "CATEGORY LIST INFO FOR REQUEST AT SUMMARY VIEW:",
    JSON.stringify(category_list_info_forRequest, null, 2)
  );
  const { new_expense_category_node } = category_list_info_forRequest;
  const { category_name, limit_amount } = new_expense_category_node;

  const { expenseDate } = useContext(DateOperationsContext);

  const { new_category_name, new_limit_amount } = category_list_info_forUpdate;
  const stringedLimitAmount = fixingANumberToTwoDecimalsAndString(limit_amount);
  const stringed_new_limit_amount =
    fixingANumberToTwoDecimalsAndString(new_limit_amount);

  useEffect(() => {
    return () => {
      movingBackToHome(navigation);
    };
  }, []);

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      {action_to_do === "new_expense_category" && (
        <>
          <>
            <FlexibleContainer
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              direction="column"
              flexibility={Platform.OS === "android" ? 0.15 : 0.15}
              justify={"flex-end"}
              isBordered={false}
            >
              <Text text_variant="bold_text_20">Category created done!</Text>
              {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
            </FlexibleContainer>
            <FlexibleContainer
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              direction="column"
              flexibility={Platform.OS === "android" ? 0.45 : 0.4}
              justify={"center"}
              isBordered={false}
            >
              <SVGComponent
                icon_width={220}
                icon_height={220}
                position={"static"}
                justify={"center"}
                icon_name={"AchievementIllustration"}
                icon_color={theme.colors.buttons.s_142223C}
              />
            </FlexibleContainer>
            <FlexibleContainer
              // color={theme.colors.bg.e_F4F4F4}
              color={theme.colors.bg.p_FFFFFF}
              direction="column"
              // flexibility={Platform.OS === "android" ? 0.1 : 0.1}
              flexibility={Platform.OS === "android" ? 0.25 : 0.25}
              justify={"center"}
              isBordered={false}
            >
              <AccordionComponent
                navigation={navigation}
                stringedAmount={stringedLimitAmount}
                short_name={category_name}
                transaction_date={expenseDate}
                caption1={"Amount:"}
                caption2={"Category:"}
                caption3={"Date:"}
              />
            </FlexibleContainer>

            <FlexibleContainer
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              direction="column"
              flexibility={0.3}
              justify={"center"}
              isBordered={false}
            >
              <RegularCTAButton
                caption="Done"
                width={310}
                height={50}
                color={theme.colors.ui.success}
                borderRadius={50}
                action={() => movingBackToHome(navigation)}
                text_variant="white_bold_text_16"
              />
            </FlexibleContainer>
          </>
        </>
      )}
      {action_to_do === "update_expense_category" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Category update done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.45 : 0.4}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={180}
              icon_height={180}
              position={"static"}
              justify={"center"}
              icon_name={"SuccessIlustration"}
              icon_color={theme.colors.buttons.s_142223C}
            />
          </FlexibleContainer>
          <FlexibleContainer
            // color={theme.colors.bg.e_F4F4F4}
            color={theme.colors.bg.p_FFFFFF}
            direction="column"
            // flexibility={Platform.OS === "android" ? 0.1 : 0.1}
            flexibility={Platform.OS === "android" ? 0.25 : 0.25}
            justify={"center"}
            isBordered={false}
          >
            <AccordionComponent
              navigation={navigation}
              stringedAmount={stringed_new_limit_amount}
              short_name={new_category_name}
              transaction_date={expenseDate}
              caption1={"Amount:"}
              caption2={"Category:"}
              caption3={"Date:"}
            />
          </FlexibleContainer>

          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"brown"}
            direction="column"
            flexibility={0.3}
            justify={"center"}
            isBordered={false}
          >
            <RegularCTAButton
              caption="Done"
              width={310}
              height={50}
              color={theme.colors.ui.success}
              borderRadius={50}
              action={() => movingBackToHome(navigation)}
              text_variant="white_bold_text_16"
            />
          </FlexibleContainer>
        </>
      )}
    </GeneralFlexContainer>
  );
};
