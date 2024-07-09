import React, { useContext, useEffect, useState } from "react";

import { theme } from "../../infrastructure/theme";
// import { NumPadComponent } from "../../global_components/organisms/pads/num_pad";
// import { HomeDisplayComponent } from "../../global_components/organisms/displays/home_display.component";
// import { Text } from "../../infrastructure/typography/text.component";
// import { TextContainer } from "./home.styles";
// import { RegularCTAButtonPlusIcon } from "../../global_components/buttons/cta_btn+icon";
// import { MenuHeaderComponent } from "../../global_components/organisms/headers/menu_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
// import { FooterMenuContainer } from "../../global_components/organisms/menu-footers/menu_footer.container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
// import { useHomeLogic } from "../../hooks/useHomeLogic";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { CircularChartComponent } from "../../global_components/organisms/bar charts diagrams/circular_chart.component";
import { BudgetsCircularChartComponent } from "../../global_components/organisms/bar charts diagrams/budgets_circular_chart.component";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { set } from "date-fns";

export const BudgetView = ({ navigation }) => {
  const { categoriesData } = useContext(CategoryDataContext);
  console.log("CATEGORIES DATA AT BUDGET VIEW:", categoriesData);
  const firstCategoryData = categoriesData[0];
  const { category_data_expenseCategories } = firstCategoryData;
  const firstCategoryDataExpenseCategories = category_data_expenseCategories[0];
  console.log(
    "FIRST CATEGORY DATA EXPENSE CATEGORIES AT BUDGET VIEW:",
    firstCategoryDataExpenseCategories
  );
  const { amount_avail, amount_spent, limit_amount, category_name } =
    firstCategoryDataExpenseCategories;

  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [overSpentAmountInNegative, setOverSpentAmountInNegative] = useState(0);
  const [overSpentAmountInPositive, setOverSpentAmountInPositive] = useState(0);

  useEffect(() => {
    const amountsMathLogic = async () => {
      if (limit_amount > amount_spent) {
        setPercentageCompleted((amount_spent * 100) / limit_amount / 100);
      }
      if (limit_amount < amount_spent) {
        const overSpentAmountInNegative = limit_amount - amount_spent;
        const overSpentAmountInPositive = amount_spent - limit_amount;

        setOverSpentAmountInNegative(overSpentAmountInNegative);
        setOverSpentAmountInPositive(overSpentAmountInPositive);

        // Use the local variable for calculation to ensure the updated value is used
        const percentageCompleted = overSpentAmountInPositive / limit_amount;
        setPercentageCompleted(percentageCompleted);
      }
    };
    amountsMathLogic();
  }, []);

  return (
    <SafeArea background_color="#FFFFFF">
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <FlexibleContainer
          direction={"column"}
          //   color={theme.colors.bg.s_142223C}
          color={"brown"}
          flexibility={0.04}
          justify={"center"}
          alignment={"center"}
        ></FlexibleContainer>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          //   color={theme.colors.bg.p_FFFFFF}
          color={"#FAA"}
          flexibility={0.2}
        />

        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"lightblue"}
          flexibility={0.5}
          justify={"center"}
          alignment={"center"}
        >
          <BudgetsCircularChartComponent
            primaryAmount={amount_spent}
            secondaryAmount={amount_avail}
            percentageCompleted={percentageCompleted}
            secondaryLabel={
              overSpentAmountInNegative ? "Over Spent: " : "Avail: "
            }
            overSpentAmountInNegative={overSpentAmountInNegative}
            isSpinnerLoading={false}
          />
        </FlexibleContainer>

        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.s_142223C}
          // color={"lightblue"}
          flexibility={0.3}
          justify={"center"}
          alignment={"center"}
        ></FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.s_142223C}
          // color={"brown"}
          flexibility={0.19}
          justify={"center"}
          alignment={"center"}
        ></FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
