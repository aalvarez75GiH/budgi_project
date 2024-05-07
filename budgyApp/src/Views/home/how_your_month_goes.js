import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { TransactionTile } from "../../global_components/organisms/tiles/transaction_tile";

import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { CheckIconComponent } from "../../global_components/check_icon_component";
import { RoundedOptionButton } from "../../global_components/buttons/rounded_option_button";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";
import { CircularTextOptionComponent } from "../../global_components/organisms/clickables options/circular_text_option.component";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const HowMonthIsGoingView = ({ navigation }) => {
  const { total_amount } = useContext(TransactionsContext);
  //   ***** Category List context consumption
  const { categoryList } = useContext(CategoryListContext);
  const { total_amount_budgeted } = categoryList;
  // console.log("EXPENSE CATEGORIES AT HOW_MONTH:", expense_categories);

  //   ***** Date Operations context consumption
  const { month_year } = useContext(DateOperationsContext);
  //   console.log("MONTH YEAR:", month_year);

  //   ***** Authentication context consumption
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  console.log("USER_ID:", user_id);

  const [month_year_toRender, set_month_year_toRender] = useState(month_year);
  const [totalAmountOnDemand, setTotalAmountOnDemand] = useState(
    totalAmountOnDemand ? totalAmountOnDemand : total_amount
  );

  /*********  Rendering whole UI if IsLoading=false  **************/
  const movingForwardToMonthsPadView = () => {
    navigation.navigate("Months_Pad_View", {
      user_id,
      set_month_year_toRender,
      comingFrom: "HowMonthIsGoingView",
      setTotalAmountOnDemand,
    });
  };

  return (
    <GeneralFlexContainer>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.1}
      />

      {/*********  Rendering Total Amount and change month option button  **************/}
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        direction="row"
        flexibility={0.3}
        justify={"center"}
        isBordered={false}
      >
        <ControlledContainer
          width={"45%"}
          height={"25%"}
          direction={"column"}
          //   color={theme.colors.neutrals.q_E5E5E5}
          color={theme.colors.ui.success}
          justify={"center"}
          alignment={"center"}
          borderTopLeftRadius={35}
          borderBottomLeftRadius={35}
        >
          <Text text_variant="white_bold_text_12">Spent on MAY 2024</Text>
          <Text text_variant="white_bold_text_20">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAmountOnDemand)}
          </Text>
        </ControlledContainer>

        {/* <Spacer position="left" size="large" /> */}
        <ControlledContainer
          width={"45%"}
          height={"25%"}
          direction={"column"}
          color={theme.colors.ui.p_142223C}
          justify={"center"}
          alignment={"center"}
          borderTopRightRadius={35}
          borderBottomRightRadius={35}
        >
          <Text text_variant="white_bold_text_12">Total budgeted</Text>
          <Text text_variant="white_bold_text_20">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total_amount_budgeted)}
          </Text>
        </ControlledContainer>
      </FlexibleContainer>

      {/************* Rendering FlatList with categories option ***********/}
      <FlexibleContainer
        // color={theme.colors.bg.p_FFFFFF}
        color={"lightblue"}
        direction="row"
        flexibility={0.16}
        justify={"center"}
        isBordered={false}
      >
        <RoundedOptionButton
          color={"#FFFFFF"}
          width={"140px"}
          action={movingForwardToMonthsPadView}
          //   action={() => null}
          height={"55px"}
          borderRadius={25}
          caption={month_year_toRender ? month_year_toRender : month_year}
          //   caption={"MAY 2024"}
          underlined={true}
        />
      </FlexibleContainer>

      {/************* Rendering FlatList with transactions  ***********/}
    </GeneralFlexContainer>
  );
};
