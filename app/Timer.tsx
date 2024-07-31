import React, { useState, useRef } from "react";
import { CircularProgress } from "react-native-circular-progress";
import {
  Container,
  Title,
  Button,
  Icon,
  Progress,
} from "./styles/screen-style";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

function formatSeconds(seconds: number): string {
  if (seconds < 60) {
    return ` ${seconds} seg`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    return `${minutes} min ${seconds} seg`;
  }
  const hours = Math.floor(seconds / 3600);
  seconds = seconds - hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${hours} hour ${minutes} min ${seconds} seg`;
}

const Timer = () => {
  const timeRef = useRef<number | undefined>(undefined);

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  function toggleTimer() {
    if (timerEnabled) {
      if (timeRef.current !== undefined) {
        clearInterval(timeRef.current);
      }
      setTimerEnabled(false);
    } else {
      timeRef.current = window.setInterval(() => {
        setSecondsElapsed((state) => state + 1);
      }, 1000);
      setTimerEnabled(true);
    }
  }

  return (
    <ImageBackground
      source={require("../assets/images/background1.jpg")}
      style={styles.background}
    >
      <BlurView intensity={20} style={styles.blurContainer}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Container
            style={{
              backgroundColor: "rgba(250, 250, 250, 0.6)",
              borderRadius: 50,
              margin: 25,
            }}
          >
            <CircularProgress
              padding={15}
              size={240}
              width={16}
              fill={(secondsElapsed * 100) / 1500}
              tintColor="#CB356B"
              backgroundColor="#FFFDE4"
              rotation={0}
            >
              {() => <Progress>{formatSeconds(secondsElapsed)}</Progress>}
            </CircularProgress>
            <Button style={styles.Button} onPress={toggleTimer}>
              <Icon name={timerEnabled ? "pause" : "play-arrow"} />
            </Button>
          </Container>
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
  Button: {
    marginTop: 80,
    marginBottom: 80,
  },
});

export default Timer;
