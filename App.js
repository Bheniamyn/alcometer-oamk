import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Switch } from "react-native";
import { SaveAreaView } from "react-native";
import { StyleSheet, View } from "react-native";
import NumericInput from "react-native-numeric-input";
import {
  Button,
  FAB,
  RadioButton,
  TextInput,
  Text,
  configureFonts,
  DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  Provider,
} from "react-native-paper";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native";
import { MyDarkTheme, MyLightTheme } from "./styles/Styles";

export default function App() {
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(1);
  const [hours, setHours] = useState(0);
  const [gender, setGender] = useState("");
  const [alcoholLevel, setAlcoholLevel] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [loaded] = useFonts({
    Sen: require("./fonts/Sen/Sen-Regular.ttf"),
    "Sen-Bold": require("./fonts/Sen/Sen-Bold.ttf"),
  });

  if (!loaded) return null;

  const MyStyle = isDark ? MyDarkTheme : MyLightTheme;

  function showError(message) {
    setAlcoholLevel(0);
    Alert.alert("Can't calculate!", message);
  }

  function doCalculation() {
    if (!weight) {
      showError("Please set a weight first!");
      return;
    }

    if (!gender) {
      showError("Please select a gender first!");
      return;
    }

    let liters = bottles * 0.33;
    let grams = liters * 8 * 4.5;
    let burning = weight / 10;
    let gramsLeft = grams - burning * hours;
    let level = gramsLeft / (weight * (gender === "m" ? 0.7 : 0.6));
    if (level < 0) level = 0;
    setAlcoholLevel(level.toFixed(2));
  }

  function RadioSelection({ label, value }) {
    return (
      <View style={MyStyle.radioSelection}>
        <RadioButton
          value={value}
          color={MyStyle.radioButton.color}
          uncheckedColor={MyStyle.radioButton.unchecked}
        />
        <Text style={MyStyle.radioLabel}>{label}</Text>
      </View>
    );
  }

  function MyNumericInput({ onChange, value, min, max, label }) {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text variant="titleMedium" style={MyStyle.numericLabel}>
          {label}
        </Text>
        <NumericInput
          onChange={onChange}
          value={value}
          minValue={min}
          maxValue={max}
          borderColor={MyStyle.numericInput.borderColor}
          rounded={true}
          leftButtonBackgroundColor={MyStyle.numericInput.leftRightColor}
          rightButtonBackgroundColor={MyStyle.numericInput.leftRightColor}
          editable={false}
          textColor={MyStyle.numericInput.textColor}
          containerStyle={{
            backgroundColor: MyStyle.numericInput.containerColor,
            margin: 10,
          }}
        />
      </View>
    );
  }

  const fontConfig = {
    fontFamily: "Sen",
  };

  const MyDefaultTheme = {
    ...DefaultTheme,
    fonts: configureFonts({ config: fontConfig }),
    Dark: {
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        primary: "#e14545",
      },
    },
    Light: {
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        primary: "#e14545",
      },
    },
  };

  return (
    <Provider theme={MyDefaultTheme}>
      <View style={MyStyle.container}>
        <ScrollView>
          <View style={MyStyle.button}>
            <Pressable hitSlop={20}>
              <Text
                style={MyStyle.buttonLabel}
                onPress={() => setIsDark(!isDark)}
              >
                {isDark ? "🌙" : "🌞"}
              </Text>
            </Pressable>
          </View>
          <StatusBar style={isDark ? "light" : "dark"} />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text variant="displayMedium">🍻</Text>
            <Text variant="displayMedium" style={MyStyle.heading}>
              Alcometer
            </Text>
          </View>
          <TextInput
            label="Weight (in kg)"
            keyboardType="decimal-pad"
            mode="outlined"
            value={weight}
            onChangeText={(v) => setWeight(v)}
            theme={isDark ? MyDefaultTheme.Dark : MyDefaultTheme.Light}
            style={MyStyle.textInput}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <MyNumericInput
              onChange={setBottles}
              value={bottles}
              min={1}
              max={20}
              label={"Bottles (33dl)"}
            />

            <MyNumericInput
              onChange={setHours}
              value={hours}
              min={0}
              max={24}
              label={"Hours"}
            />
          </View>
          <RadioButton.Group onValueChange={(v) => setGender(v)} value={gender}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <RadioSelection value={"m"} label="Male" />
              <RadioSelection value={"f"} label="Female" />
            </View>
          </RadioButton.Group>
          <View style={{ alignSelf: "center" }}>
            <Text
              style={[
                MyStyle.heading,
                {
                  fontSize: 100,
                  color:
                    alcoholLevel == 0
                      ? isDark
                        ? "white"
                        : "black"
                      : alcoholLevel <= 1
                      ? "#03B5AA"
                      : alcoholLevel > 1 && alcoholLevel <= 2
                      ? "#FFB400"
                      : "#AF1D1D",
                },
              ]}
            >
              {alcoholLevel}
            </Text>
          </View>
          <Button
            mode="contained"
            style={MyStyle.calcButton}
            onPress={() => doCalculation()}
          >
            Calculate
          </Button>
        </ScrollView>
      </View>
    </Provider>
  );
}
