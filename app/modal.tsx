import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { ExternalLink } from "@/components/ExternalLink";
import { BlurView } from "expo-blur";

export default function ModalScreen() {
  return (
    <ImageBackground
      source={require("../assets/images/background1.jpg")}
      style={styles.background}
    >
      <BlurView intensity={6} style={styles.blurContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.container,
              { backgroundColor: "rgba(250, 250, 250, 0.8)" },
            ]}
          >
            <ExternalLink href="https://github.com/LofiSu">
              <AntDesign
                name="github"
                size={24}
                color="rgba(36, 59, 85, 0.8)"
              />
              <Text style={styles.title}>LofiSu</Text>
            </ExternalLink>

            <View style={[styles.separator]} />
            <EditScreenInfo path="app/modal.tsx" />
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          </View>
        </ScrollView>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(36, 59, 85, 0.8)",
  },
  separator: {
    marginVertical: 30,
    height: 1.5,
    width: 200,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
