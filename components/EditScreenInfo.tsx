import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "./ExternalLink";
import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";
import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={[styles.getStartedContainer, { backgroundColor: "transparent" }]}
      >
        <Text
          style={styles.getStartedText}
          lightColor="rgba(36, 59, 85, 0.9)"
          darkColor="rgba(255,255,255,0.9)"
        >
          Designd With:
        </Text>
        <Text style={styles.text}>
          <FontAwesome5 name="java" size={24} color="rgba(36, 59, 85, 0.9)" />{" "}
          Java{" "}
          <Ionicons
            name="logo-javascript"
            size={24}
            color="rgba(36, 59, 85, 0.9)"
          />{" "}
          <MaterialCommunityIcons
            name="language-typescript"
            size={24}
            color="rgba(36, 59, 85, 0.9)"
          />{" "}
          <Fontisto name="react" size={24} color="rgba(36, 59, 85, 0.9)" />{" "}
          <AntDesign name="antdesign" size={24} color="rgba(36, 59, 85, 0.9)" />{" "}
        </Text>
      </View>

      <View style={[styles.helpContainer, { backgroundColor: "transparent" }]}>
        <ExternalLink style={styles.helpLink} href="http://47.99.32.48:12445/">
          {" "}
          <AntDesign name="home" size={24} color="rgba(36, 59, 85, 0.9)" />{" "}
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here to my home .
          </Text>
        </ExternalLink>
        <ExternalLink style={styles.helpLink} href="http://47.99.32.48:8090/">
          {" "}
          <FontAwesome5
            name="blog"
            size={24}
            color="rgba(36, 59, 85, 0.9)"
          />{" "}
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here to my blog .
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  text: {
    color: "rgba(36, 59, 85, 0.9)",
    textAlign: "center",
  },
});
