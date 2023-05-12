import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function Calc() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        bold: require("./assets/fonts/bold.ttf"),
        bolder: require("./assets/fonts/bolder.ttf"),
        bolderitalic: require("./assets/fonts/bolderitalic.ttf"),
      });
      setIsLoaded(true);
    }

    loadFont();
  }, []);


  const [values, setValues] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [output, setOutput] = useState({});

  function handleValues(e, name) {
    const pattern = new RegExp("[0-9]$");
    const value = e.nativeEvent.text;
    if (value === "" || pattern.test(value)) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  }

  function getAge(birthDate, ageAtDate) {
    const birthDetail = birthDate?.split("-");
    const currentDetail = ageAtDate?.split("-");
    if (parseInt(birthDetail[0]) === parseInt(currentDetail[0])) {
      if (parseInt(birthDetail[1]) <= parseInt(currentDetail[1])) {
        if (parseInt(birthDetail[2]) <= parseInt(currentDetail[2])) {
          return finalOutput(birthDate, ageAtDate);
        } else {
          Alert.alert(
            "",
            "enter valid DOB 🧐", 
            [{ text: "Ok", onPress: () => console.log("OK pressed") }],
            { cancelable: false }
          );
        }
      } else {
        Alert.alert(
          "",
          "enter valid DOB 🧐", 
          [{ text: "Ok", onPress: () => console.log("OK pressed") }],
          { cancelable: false }
        );
      }
    } else if (birthDetail[0] > currentDetail[0]) {
      if (birthDetail[0] === currentDetail[0]) {
        Alert.alert(
          "",
          "enter valid DOB 🧐", 
          [{ text: "Ok", onPress: () => console.log("OK pressed") }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "",
          "enter valid DOB 🧐", 
          [{ text: "Ok", onPress: () => console.log("OK pressed") }],
          { cancelable: false }
        );
      }
    } else if (birthDetail[1] > currentDetail[1]) {
      if (birthDetail[0] < currentDetail[0]) {
        return finalOutput(birthDate, ageAtDate);
      } else {
        Alert.alert(
          "",
          "enter valid DOB 🧐", 
          [{ text: "Ok", onPress: () => console.log("OK pressed") }],
          { cancelable: false }
        );
      }
    } else {
      return finalOutput(birthDate, ageAtDate);
    }
  }

  function finalOutput(birthDate, ageAtDate) {
    var daysInMonth = 30.436875; // Days in a month on average.
    var dob = new Date(birthDate);
    var aad;
    if (!ageAtDate) aad = new Date();
    else aad = new Date(ageAtDate);
    var yearAad = aad.getFullYear();
    var yearDob = dob.getFullYear();
    var years = yearAad - yearDob; // Get age in years.
    dob.setFullYear(yearAad); // Set birthday for this year.
    var aadMillis = aad.getTime();
    var dobMillis = dob.getTime();
    if (aadMillis < dobMillis) {
      --years;
      dob.setFullYear(yearAad - 1); // Set to previous year's birthday
      dobMillis = dob.getTime();
    }
    var days = (aadMillis - dobMillis) / 86400000;

    var monthsDec = days / daysInMonth; // Months with remainder.
    var months = Math.floor(monthsDec); // Remove fraction from month.
    days = Math.floor(daysInMonth * (monthsDec - months));
    setOutput({ ...output, year: years, month: months, day: days });
  }



  function handleResult() {
    const date = new Date();
    const yearNow = date.getFullYear();
    const monthNow = date.getMonth() + 1;
    const dateNow = date.getDate();
    const birthDate = `${values.year}-${values.month}-${values.day}`;
    const ageAtDate = `${yearNow}-${monthNow}-${dateNow}`;

    getAge(birthDate, ageAtDate);
  }


  function throwError() {
    Alert.alert(
      "",
      "Enter your Birth Date 😄", 
      [{ text: "Ok", onPress: () => console.log("OK pressed") }],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          width: "92%",
          paddingHorizontal: 20,
          paddingVertical: 50,
          borderTopEndRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomStartRadius: 20,
          borderBottomRightRadius: 100,
          position: "absolute",
          left: "12%",
          top: "20%",
          transform: [{ translateX: -35 }, { translateY: -35 }],
        }}
      >
        {isLoaded && (
          <Text
            style={{
              textAlign: "center",
              paddingVertical: 20,
              paddingHorizontal: 10,
              fontSize: 20,
              fontFamily: "bold",
            }}
          >
            Enter Your DOB 😃
          </Text>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            {isLoaded && (
              <>
                <Text
                  style={{
                    color: "#303030",
                    fontSize: 16,
                    paddingVertical: 5,
                    fontFamily: "bold",
                  }}
                >
                  Day
                </Text>
                <TextInput
                  style={{
                    height: 60,
                    borderColor: "#e0e0e0",
                    borderWidth: 2,
                    width: 100,
                    borderRadius: 8,
                    fontSize: 25,
                    textAlign: "center",
                    fontFamily: "bolder",
                  }}
                  placeholder="DD"
                  maxLength={2}
                  value={values?.day > 31 ? "" : values?.day}
                  onChange={(e) => {
                    handleValues(e, "day");
                  }}
                  keyboardType="numeric"
                />
              </>
            )}
          </View>
          <View>
            {isLoaded && (
              <>
                <Text
                  style={{
                    color: "#303030",
                    fontSize: 16,
                    paddingVertical: 5,
                    fontFamily: "bold",
                  }}
                >
                  Month
                </Text>
                <TextInput
                  style={{
                    height: 60,
                    borderColor: "#e0e0e0",
                    borderWidth: 2,
                    width: 100,
                    borderRadius: 8,
                    fontSize: 25,
                    textAlign: "center",
                    fontFamily: "bolder",
                  }}
                  placeholder="MM"
                  onChange={(e) => {
                    handleValues(e, "month");
                  }}
                  value={values?.month > 12 ? "" : values?.month}
                  maxLength={2}
                  keyboardType="numeric"
                />
              </>
            )}
          </View>
          <View>
            {isLoaded && (
              <>
                <Text
                  style={{
                    color: "#303030",
                    fontSize: 16,
                    paddingVertical: 5,
                    fontFamily: "bold",
                  }}
                >
                  Year
                </Text>

                <TextInput
                  style={{
                    height: 60,
                    borderColor: "#e0e0e0",
                    borderWidth: 2,
                    width: 100,
                    borderRadius: 8,
                    fontSize: 25,
                    textAlign: "center",
                    fontFamily: "bolder",
                  }}
                  placeholder="YYYY"
                  maxLength={4}
                  onChange={(e) => {
                    handleValues(e, "year");
                  }}
                  value={values?.year}
                  required
                  keyboardType="numeric"
                />
              </>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            height: 100,
            justifyContent: "center",
            position: "relative",
          }}
        >
          <View
            style={{ borderBottomColor: "#e0e0e0", borderBottomWidth: 2 }}
          />
          <TouchableOpacity
            onPress={() => {
              values.day >= 1 && values.month >= 1 && values.year >= 4
                ? handleResult()
                : throwError();
            }}
          >
            <View
              ontouch
              style={{
                backgroundColor: " hsl(259, 100%, 65%)",
                position: "absolute",
                padding: 20,
                borderRadius: 50,
                left: "50%",
                top: "50%",
                transform: [{ translateX: -35 }, { translateY: -35 }],
              }}
            >
              <Image
                source={require("./assets/arrow.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {isLoaded && (
          <View style={{ paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 50, fontFamily: "bolderitalic" }}>
              <Text style={{ color: "hsl(259, 100%, 65%)" }}>
                {output?.year ?? 0}
              </Text>
              &nbsp;
              <Text>years</Text>
            </Text>
            <Text style={{ fontSize: 50, fontFamily: "bolderitalic" }}>
              <Text style={{ color: "hsl(259, 100%, 65%)" }}>
                {output?.month ?? 0}
              </Text>
              &nbsp;
              <Text>months</Text>
            </Text>
            <Text style={{ fontSize: 50, fontFamily: "bolderitalic" }}>
              <Text style={{ color: "hsl(259, 100%, 65%)" }}>
                {output?.day ?? 0}
              </Text>
              &nbsp;
              <Text>days</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f5f9",
    height: "100%",
  },
});
