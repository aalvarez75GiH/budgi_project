import React, { useContext, useEffect, useRef } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { LinkButton } from "../../global_components/buttons/link_button";
import { CategoryDeletedBottomSheet } from "../../global_components/bottom_sheets/categories_deleted_bottom_sheet";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { useCancelDeleteLogic } from "../../hooks/useCancelDeleteLogic";
import { CategorySuspendedBottomSheet } from "../../global_components/bottom_sheets/categories_suspended_bottom_sheet";

import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const CancelDeleteConfirmationView = ({ navigation, route }) => {
  const { document_id, comingFrom } = route.params;
  console.log(" COMING FROM AT CANCEL VIEW:", comingFrom);
  console.log(" DOCUMENT ID AT CANCEL DELETE CONFIRMATION:", document_id);
  const { isLoadingFromCategoryListContext, deletingTransactionProcess } =
    useCancelDeleteLogic();
  const {
    deletingOrSuspendingExpenseCategory,
    movingBackToHome,
    categorySuspended,
    categoryDeleted,
  } = useContext(CategoryListContext);
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  const { isLoading } = useContext(TransactionsContext);
  // console.log("MODAL ACTIVE AT CANCEL DELETE VIEW:", modalActive);

  // **********************************************************

  return (
    <GestureHandlerRootView>
      <SafeArea background_color={"#B7B7B7"}>
        <BottomSheetModalProvider>
          <GeneralFlexContainer color={theme.colors.neutrals.p_B7B7B7}>
            <ExitHeaderComponent
              navigation={navigation}
              direction={"column"}
              color={theme.colors.neutrals.p_B7B7B7}
              flexibility={0.18}
              icon_left={"80%"}
              icon_top={"30%"}
            />
            {comingFrom === "BudgetsView" && (
              <>
                <FlexibleContainer
                  color={theme.colors.neutrals.p_B7B7B7}
                  direction="row"
                  flexibility={0.8}
                  justify={"flex-start"}
                  isBordered={false}
                  alignment={"center"}
                >
                  <ControlledContainer
                    color={theme.colors.neutrals.p_B7B7B7}
                    width={"100%"}
                    height={"300px"}
                    justify="center"
                    alignment="center"
                    direction="column"
                  >
                    <Text text_variant="bold_text_20">
                      Delete this category?
                    </Text>
                    <Spacer position="top" size="large" />
                    <RegularCTAButton
                      caption="Yes"
                      width={310}
                      height={50}
                      color={theme.colors.ui.error_cancels}
                      borderRadius={50}
                      action={() =>
                        deletingOrSuspendingExpenseCategory(
                          navigation,
                          document_id,
                          user_id,
                          comingFrom
                        )
                      }
                      text_variant="white_bold_text_20"
                      isLoading={isLoadingFromCategoryListContext}
                    />
                  </ControlledContainer>
                </FlexibleContainer>
                {categorySuspended && (
                  <CategorySuspendedBottomSheet
                    navigation={navigation}
                    movingBackToHome={movingBackToHome}
                  />
                )}
                {categoryDeleted && (
                  <CategoryDeletedBottomSheet
                    navigation={navigation}
                    movingBackToHome={movingBackToHome}
                  />
                )}
                {/* ******************************************* */}
                <CategoryDeletedBottomSheet
                  navigation={navigation}
                  movingBackToHome={movingBackToHome}
                />
              </>
            )}
            {comingFrom === "Transactions_by_category_View" && (
              <FlexibleContainer
                color={theme.colors.neutrals.p_B7B7B7}
                direction="row"
                flexibility={0.8}
                justify={"flex-start"}
                isBordered={false}
                alignment={"center"}
              >
                <ControlledContainer
                  color={theme.colors.neutrals.p_B7B7B7}
                  width={"100%"}
                  height={"300px"}
                  justify="center"
                  alignment="center"
                  direction="column"
                >
                  <Text text_variant="bold_text_20">
                    Delete this transaction?
                  </Text>
                  <Spacer position="top" size="large" />
                  <RegularCTAButton
                    caption="Yes"
                    width={310}
                    height={50}
                    color={theme.colors.ui.error_cancels}
                    borderRadius={50}
                    action={() =>
                      deletingTransactionProcess(
                        navigation,
                        document_id,
                        user_id,
                        comingFrom
                      )
                    }
                    text_variant="white_bold_text_20"
                    isLoading={isLoading}
                  />
                </ControlledContainer>
              </FlexibleContainer>
            )}
            {comingFrom === "My transactions" && (
              <FlexibleContainer
                color={theme.colors.neutrals.p_B7B7B7}
                direction="row"
                flexibility={0.8}
                justify={"flex-start"}
                isBordered={false}
                alignment={"center"}
              >
                <ControlledContainer
                  color={theme.colors.neutrals.p_B7B7B7}
                  width={"100%"}
                  height={"300px"}
                  justify="center"
                  alignment="center"
                  direction="column"
                >
                  <Text text_variant="bold_text_20">
                    Delete this transaction?
                  </Text>
                  <Spacer position="top" size="large" />
                  <RegularCTAButton
                    caption="Yes"
                    width={310}
                    height={50}
                    color={theme.colors.ui.error_cancels}
                    borderRadius={50}
                    action={() =>
                      deletingTransactionProcess(
                        navigation,
                        document_id,

                        comingFrom
                      )
                    }
                    text_variant="white_bold_text_20"
                    isLoading={isLoading}
                  />
                </ControlledContainer>
              </FlexibleContainer>
            )}
            <FlexibleContainer
              color={theme.colors.neutrals.p_B7B7B7}
              direction="column"
              flexibility={0.2}
              isBordered={false}
              alignment={"center"}
            >
              <Spacer position="top" size="large" />
              <Spacer position="top" size="large" />
              <LinkButton
                caption="No, I want to come back"
                action={() => navigation.goBack()}
              />
            </FlexibleContainer>
          </GeneralFlexContainer>
        </BottomSheetModalProvider>
      </SafeArea>
    </GestureHandlerRootView>
  );
};
