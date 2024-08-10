import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";

import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { CheckIconComponent } from "../../global_components/check_icon_component";
import { RoundedOptionButton } from "../../global_components/buttons/rounded_option_button";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { CircularTextOptionComponent } from "../../global_components/organisms/clickables options/circular_text_option.component";
import { useMyTransactionsLogic } from "../../hooks/useMyTransactionsLogic";
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";
import { SafeArea } from "../../global_components/safe-area.component";

export const MyTransactionsView = ({ navigation }) => {
  // ************** LOGIC FROM HOOK **************
  const {
    movingForwardToMonthsPadView,
    settingUpTransactionsFromContextForAllOptionButton,
    settingUpTransactionsFromContext,
    renderItem,
    renderCategoryItem,
    isPressed,
    month_year,
    setMonthSelected,
    month_name,
    user_id,
    transactionsToRender,
    totalAmountToRender,
    setTransactionsToRender,
    setTotalAmountToRender,
    expenseCategoriesToRender,
    setExpenseCategoriesToRender,
    isLoadingByCat,
    setIsLoadingByCat,
    transactionsByMonthYear,
    total_amount,
    isLoading,
    setTransactionInfoForUpdate,
    gettingTransactions_byUserID_MonthYear_onDemand,
    expenseCategories,
    resetMonth_year_toRender,
    set_month_year_toRender,
    month_year_toRender,
  } = useMyTransactionsLogic();

  useEffect(() => {
    settingUpTransactionsFromContext();
    setExpenseCategoriesToRender(expenseCategories);

    return async () => {
      setMonthSelected(month_name);
      resetMonth_year_toRender();
      await gettingTransactions_byUserID_MonthYear_onDemand(
        user_id,
        month_year
      );
    };
  }, []);

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
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAA"}
          // flexibility={0.14}
          flexibility={0.14}
          justify={"flex-start"}
          icon_left={"80%"}
          icon_top={"30%"}
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
          <ControlledContainer
            width={"60%"}
            height={"35%"}
            direction={"column"}
          >
            <Spacer position="left" size="large">
              <Text text_variant="bold_text_20">
                {/* Total: ${totalAmountToRender.toFixed(2)} */}
                Total:{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalAmountToRender)}
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
            <ControlledContainer
              width={"35%"}
              height={"45%"}
              justify={"flex-start"}
            >
              <RoundedOptionButton
                color={"#F4F4F4"}
                action={() =>
                  movingForwardToMonthsPadView(
                    navigation,
                    user_id,
                    set_month_year_toRender
                  )
                }
                width={"140px"}
                height={"55px"}
                borderRadius={25}
                caption={month_year_toRender ? month_year_toRender : month_year}
                underlined={true}
              />
            </ControlledContainer>
            <Spacer position="top" size="small" />
            <Spacer position="top" size="small" />
            <Spacer position="top" size="small" />
          </Spacer>
        </FlexibleContainer>
        <Spacer position="top" size="small" />
        <Spacer position="top" size="small" />

        {/************* Rendering FlatList with categories option ***********/}
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          direction="row"
          // flexibility={0.16}
          flexibility={0.16}
          justify={"flex-start"}
          isBordered={false}
          alignment={"center"}
        >
          <CircularTextOptionComponent
            caption="All"
            isPressed={isPressed}
            action={() =>
              settingUpTransactionsFromContextForAllOptionButton(
                transactionsByMonthYear,
                total_amount,
                setTransactionsToRender,
                setTotalAmountToRender,
                setIsLoadingByCat
              )
            }
          />
          <ControlledContainer
            width={"350px"}
            height={"100px"}
            justify="center"
            alignment="center"
          >
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={expenseCategoriesToRender}
              renderItem={renderCategoryItem(transactionsByMonthYear)}
              keyExtractor={(item, id) => {
                return item.category_id;
              }}
            />
          </ControlledContainer>
        </FlexibleContainer>

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
        ) : !transactionsToRender.length ? (
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
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              direction="column"
              flexibility={0.9}
              justify={"center"}
              isBordered={false}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={transactionsToRender}
                renderItem={renderItem(
                  navigation,
                  setTransactionInfoForUpdate,
                  "My transactions"
                )}
                keyExtractor={(item, id) => {
                  return item.transaction_id;
                }}
                scrollSpeed={0.5}
              />
            </FlexibleContainer>
          </>
        )}
      </GeneralFlexContainer>
    </SafeArea>
  );
};
