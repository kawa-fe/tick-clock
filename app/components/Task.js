import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = ({ text, color, onDelete, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        <View style={[styles.square, { backgroundColor: color }]}></View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity onPress={onDelete}>
          <View style={styles.deleteWrapper}>
            <Text style={(styles.deleteText, { color: color })}>√</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteWrapper: {
    padding: 5,
  },
  deleteText: {
    fontSize: 20,
  },
});

export default Task;
