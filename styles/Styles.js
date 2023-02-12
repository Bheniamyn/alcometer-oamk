import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 10,
  },
  textInput: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  heading: {
    marginVertical: 10,
    fontFamily: "Sen-Bold",
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 10,
  },
  result: {
    alignSelf: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  buttonLabel: {
    fontSize: 25,
  },
  radioSelection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  calcButton: {
    alignSelf: "center",
  },
  numericLabel: {
    alignSelf: "center",
  },
});

export const MyLightTheme = StyleSheet.create({
  ...Styles,
  container: {
    ...Styles.container,
    backgroundColor: "#fff4f3",
  },
  calcButton: {
    ...Styles.calcButton,
    backgroundColor: "#e14545",
  },
  numericInput: {
    leftRightColor: "#ff7871",
    borderColor: "#fff4f3",
    textColor: "white",
    containerColor: "#e14545",
  },
  radioButton: {
    unchecked: 'grey',
    color: '#e14545',
  }
});

export const MyDarkTheme = StyleSheet.create({
  ...Styles,
  container: { ...Styles.container, backgroundColor: "#261515" },
  heading: { ...Styles.heading, color: "white" },
  calcButton: {
    ...Styles.calcButton,
    backgroundColor: "#e14545",
  },
  radioLabel: {
    color: "white",
  },
  numericInput: {
    leftRightColor: "#ff7871",
    borderColor: "#261515",
    textColor: "white",
    containerColor: "#e14545",
  },
  numericLabel: {
    ...Styles.numericLabel,
    color: "white",
  },
  radioButton: {
    unchecked: 'grey',
    color: '#e14545',
  }
});
