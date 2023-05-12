import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import * as Font from "expo-font";

const Initial = ({ replace }) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        bold: require("./assets/fonts/bold.ttf"),
        bolder: require("./assets/fonts/bolder.ttf"),
        bolderitalic: require("./assets/fonts/bolderitalic.ttf"),
        niramit: require("./assets/fonts/Niramit-SemiBold.ttf"),
      });
      setIsLoaded(true);
    }
    loadFont();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 2,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
    setTimeout(() => {
      replace(), 2100;
    }, 2100);
  }, [animatedValue]);

  const interpolatedUpper = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "-40%"],
  });

  const interpolatedLower = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "90%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.upper,
          { top: interpolatedUpper, backgroundColor: "#b10cc8" },
        ]}
      >
        {isLoaded && (
          <Text
            style={{
              width: "100%",
              textAlign: "center",
              color: "#fff",
              fontSize: 40,
              fontFamily: "niramit",
              transform: [{ translateY: 450.5 }],
            }}
          >
            GOCOOL's
          </Text>
        )}
      </Animated.View>

      <Animated.View
        style={[
          styles.lower,
          { top: interpolatedLower, backgroundColor: "#b10cc8" },
        ]}
      >
        {isLoaded && <Text style={styles.text}>GOCOOL's</Text>}
      </Animated.View>
      {isLoaded && <Text style={styles.inside}>Age Calculator</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    fontSize: 40,
    fontFamily: "sans-serif",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: 40,
    transform: [{ translateY: -45 }],
    fontFamily: "niramit",
  },
  upper: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "50%",
    overflow: "hidden",
    zIndex: 3,
  },
  lower: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    overflow: "hidden",
    zIndex: 3,
    backgroundColor: "red",
  },
  inside: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    textAlign: "center",
    zIndex: 0,
    fontSize: 30,
    color: "#dc143c",
    fontFamily: "niramit",
    color: "#212333",
  },
});

export default Initial;
