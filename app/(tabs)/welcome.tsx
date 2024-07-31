import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import { Container, Banner, Title, Button, Icon } from "../styles/screen-style";
import { router } from "expo-router";

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

const backgroundImages = [
  require("../../assets/images/background1.jpg"),
  require("../../assets/images/background2.jpg"),
  require("../../assets/images/background3.jpg"),
  require("../../assets/images/background4.jpg"),
  require("../../assets/images/background5.jpg"),
  require("../../assets/images/background6.jpg"),
];

const Welcome = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hitokoto, setHitokoto] = useState("");
  const [author, setAuthor] = useState("");

  const fetchHitokoto = async () => {
    try {
      const data = await getHitokoto();
      setHitokoto(data.hitokoto);
      setAuthor(data.from);
    } catch (error) {
      console.error("Failed to fetch hitokoto:", error);
    }
  };

  useEffect(() => {
    fetchHitokoto();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 60000); // 每隔60秒切换一次

    return () => clearInterval(interval); // 清除计时器以防止内存泄漏
  }, []);

  function navToTabs() {
    router.push("/Timer");
  }

  return (
    <ImageBackground
      source={backgroundImages[currentImageIndex]}
      style={styles.background}
    >
      <BlurView intensity={30} style={styles.blurContainer}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Banner source={require("../../assets/images/icon.png")} />
            <TouchableOpacity
              style={styles.quoteContainer}
              onPress={fetchHitokoto} // 添加点击事件处理程序
            >
              <Title>{hitokoto || "Loading..."}</Title>
              {author && <Text style={styles.author}>—— {author}</Text>}
            </TouchableOpacity>
            <Button onPress={navToTabs}>
              <Icon name="chevron-right" />
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
  quoteContainer: {
    backgroundColor: "rgba(250, 250, 250, 0.6)",
    borderRadius: 50,
    margin: 15,
    padding: 20, // 添加 padding 以使文字与边框之间有空隙
    alignItems: "center", // 使内容居中对齐
  },
  author: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    color: "rgba(36, 59, 85, 0.8)",
  },
});

export default Welcome;
