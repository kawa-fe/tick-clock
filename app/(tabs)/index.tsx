import React from "react";
import AnalogClock from "../components/AnalogClock";
import { ImageBackground, ScrollView, View, StyleSheet } from "react-native";
import TimeWeather from "../components/TimeWeather";
import { BlurView } from "expo-blur";

const index = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/background1.jpg")}
      style={styles.background}
    >
      <BlurView intensity={30} style={styles.blurContainer}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnalogClock />
          </View>
          <TimeWeather />
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default index;
