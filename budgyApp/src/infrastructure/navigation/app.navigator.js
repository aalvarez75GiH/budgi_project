import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HomeNavigator } from "./home.navigator";
import { IncomeNavigator } from "./income.navigator";
import { BudgetNavigator } from "./budget.navigator";

import { theme } from "../theme";

const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = "home";
      break;
    case "Budget":
      iconName = "home-outline";
      break;
    case "Income":
      iconName = "home-outline";
      break;
    // case "Settings":
    //   iconName = "settings";
    //   break;
    // Add more cases as needed for other screens
  }

  return {
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name={iconName} color={color} size={size} />
    ),
  };
};

const tabBarListeners = ({ navigation, route }) => ({
  tabPress: () => navigation.navigate(route.name),
});

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        ...createScreenOptions({ route }),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetNavigator}
        listeners={tabBarListeners}
      />
      <Tab.Screen
        name="Income"
        component={IncomeNavigator}
        listeners={tabBarListeners}
      />
    </Tab.Navigator>
  );
};
