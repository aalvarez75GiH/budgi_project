import React, { useEffect, useContext } from "react";
import { FlatList } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";

import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { CheckIconComponent } from "../../global_components/check_icon_component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { useMyTransactionsLogic } from "../../hooks/useMyTransactionsLogic";
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const TransactionsView = ({ navigation, route }) => {
  const { transactions_and_amount_wanted } = route.params;
  const { month_selected } = useContext(DateOperationsContext);

  // ************** LOGIC FROM HOOK **************
  const {
    settingUpTransactionsFromContext,
    renderItem,
    month_name,
    isLoadingByCat,
    transactionsByMonthYear,
    total_amount,
    isLoading,
    setTransactionInfoForUpdate,
  } = useMyTransactionsLogic();

  console.log(
    "MONTH SELECTED AT TRANSACTIONS VIEW:",
    JSON.stringify(month_selected, null, 2)
  );
  console.log(
    "MONTH NAME AT TRANSACTIONS VIEW:",
    JSON.stringify(month_name, null, 2)
  );

  useEffect(() => {
    settingUpTransactionsFromContext();
  }, [transactionsByMonthYear, total_amount]);

  return isLoading ? (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      // color={"#FAD"}
      direction="row"
      flexibility={1}
      justify={"center"}
      isBordered={false}
      alignment={"center"}
    >
      <IsLoadingContainer
        size="large"
        color={theme.colors.brand.primary}
        caption="Loading transactions..."
      />
    </FlexibleContainer>
  ) : (
    <GeneralFlexContainer>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        // flexibility={0.14}
        flexibility={0.14}
        justify={"flex-end"}
      />

      {/*********  Rendering Total Amount and change month option button  **************/}
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAD"}
        direction="row"
        flexibility={0.15}
        justify={"flex-start"}
        isBordered={false}
        alignment={"center"}
      >
        <ControlledContainer width={"60%"} height={"35%"} direction={"column"}>
          <Spacer position="left" size="large">
            <Text text_variant="bold_text_20">
              {/* Total: ${totalAmountToRender.toFixed(2)} */}
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                transactions_and_amount_wanted.total_amount_by_category
              )}
            </Text>
          </Spacer>
          {/* <Spacer position="top" size="medium" /> */}
          <ControlledContainer
            width={"90%"}
            height={"70%"}
            direction={"row"}
            // color="brown"
            justify={"center"}
            alignment={"center"}
          >
            <Spacer position="left" size="small">
              <Spacer position="left" size="medium">
                <CheckIconComponent icon_width={15} icon_height={15} />
              </Spacer>
            </Spacer>
            <Text text_variant="bold_text_12">Most updated transaction</Text>
          </ControlledContainer>
        </ControlledContainer>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
        </Spacer>
      </FlexibleContainer>
      <Spacer position="top" size="small" />
      <Spacer position="top" size="small" />

      {/************* Rendering FlatList with transactions  ***********/}
      {isLoadingByCat ? (
        <>
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"#FAD"}
            direction="row"
            flexibility={1}
            justify={"center"}
            isBordered={false}
          >
            <IsLoadingContainer
              size="large"
              color={theme.colors.brand.primary}
              caption="Loading transactions..."
            />
          </FlexibleContainer>
        </>
      ) : !transactions_and_amount_wanted.transactions_by_category.length ? (
        <>
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <FlexibleContainer
            //   color={theme.colors.bg.e_F4F4F4}
            //   color={"lightblue"}
            direction="column"
            flexibility={1}
            justify={"flex-start"}
            isBordered={false}
          >
            <EmptyInfoAlert
              caption="Sorry, We could not find any transaction :("
              width={"90%"}
              height={"20%"}
              color="#F9F9FA"
              justify={"center"}
              alignment={"center"}
              comingFrom="MyTransactionsView"
            />
          </FlexibleContainer>
        </>
      ) : (
        <>
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <FlexibleContainer
            color={theme.colors.bg.e_F4F4F4}
            // color={"lightblue"}
            direction="column"
            flexibility={1}
            justify={"center"}
            isBordered={false}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={transactions_and_amount_wanted.transactions_by_category}
              renderItem={renderItem(navigation, setTransactionInfoForUpdate)}
              keyExtractor={(item, id) => {
                return item.transaction_id;
              }}
              scrollSpeed={0.5}
            />
          </FlexibleContainer>
        </>
      )}
    </GeneralFlexContainer>
  );
};
