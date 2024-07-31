import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Weather from "./weather";

const TimeWeather = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <View style={styles.digitWrapper}>
          <Text style={styles.digitText}>{currentTime.hour[0]}</Text>
        </View>
        <View style={styles.digitWrapper}>
          <Text style={styles.digitText}>{currentTime.hour[1]}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.digitWrapper}>
          <Text style={styles.digitText}>{currentTime.minute[0]}</Text>
        </View>
        <View style={styles.digitWrapper}>
          <Text style={styles.digitText}>{currentTime.minute[1]}</Text>
        </View>
        <Text style={styles.colon}>:</Text>
        <View style={styles.digitWrapper}>
          <Text style={styles.digitText}>{currentTime.second[0]}</Text>
        </View>
        <View style={styles.digitWrapper}>
          <Text style={styles.digitText}>{currentTime.second[1]}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>
          {currentTime.year} 年 {currentTime.month} 月 {currentTime.day} 日{" "}
          {currentTime.weekday}
        </Text>
        <Weather />
      </View>
    </View>
  );
};

const getCurrentTime = () => {
  const now = new Date();
  const days = ["日", "一", "二", "三", "四", "五", "六"];

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday: `星期${days[now.getDay()]}`,
    hour: String(now.getHours()).padStart(2, "0"),
    minute: String(now.getMinutes()).padStart(2, "0"),
    second: String(now.getSeconds()).padStart(2, "0"),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(86, 204, 242, 0.4)",
    borderRadius: 20,
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 200,
  },
  clockContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  colon: {
    color: " rgba(36, 59, 85, 1)", // Set colon color to dark grey
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10, // Add margin for spacing between digits
  },
  digitWrapper: {
    margin: 2, // Add margin around each digit
    backgroundColor: " rgba(36, 59, 85, 1)", // Set background of digit to dark grey
    borderRadius: 5,
    padding: 10,
  },
  digitText: {
    color: "white", // Set digit text color to white
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
  },
  text: {
    color: " rgba(36, 59, 85, 0.9)",
    fontSize: 18, // Increase font size for date and weather
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TimeWeather;
