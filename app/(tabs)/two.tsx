import React, { useRef, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  ImageBackground,
  Modal,
  Button,
  Animated,
} from "react-native";
import Task from "../components/Task"; // 引入 Task 组件
import { BlurView } from "expo-blur";

// 定义任务类型
type TaskItem = {
  text: string;
};

const colors = [
  "#55BCF6",
  "#CB356B",
  "#99f2c8",
  "#91EAE4",
  "#ee9ca7",
  "#7F7FD5",
  "#f5af19",
  "#eaafc8",
  "#654ea3",
];

const Todo: React.FC = () => {
  // 任务的状态
  const [task, setTask] = useState<string>("");
  // 任务列表的状态
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  // 模态框的状态
  const [modalVisible, setModalVisible] = useState(false);
  // 当前编辑的任务索引
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // 编辑任务的内容
  const [editTask, setEditTask] = useState<string>("");
  // 错误提示的状态
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 用于动画抖动效果
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 初始化任务列表
    setTaskItems([
      { text: "Hello,here is LofiSu ~" },
      { text: "Let’s start!" },
    ]);
  }, []); // 仅在组件首次加载时运行

  // 添加任务的处理函数
  const handleAddTask = () => {
    Keyboard.dismiss(); // 隐藏键盘
    if (task && task.trim()) {
      // 确保任务不为空
      setTaskItems([...taskItems, { text: task }]); // 添加新任务到任务列表
      setTask(""); // 清空输入框
    }
  };

  // 显示模态框并设置当前任务内容
  const handleEditTask = (index: number) => {
    setEditIndex(index);
    setEditTask(taskItems[index].text);
    setModalVisible(true);
  };

  // 抖动动画函数
  const startShakeAnimation = () => {
    shakeAnimation.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 完成编辑任务的处理函数
  const handleSaveEdit = () => {
    if (editTask && editTask.trim()) {
      if (editIndex !== null) {
        const updatedTasks = [...taskItems];
        updatedTasks[editIndex].text = editTask;
        setTaskItems(updatedTasks);
        setModalVisible(false);
        setEditIndex(null);
        setErrorMessage(null);
      }
    } else {
      setErrorMessage("Content cannot be empty !");
      startShakeAnimation();
    }
  };

  // 取消编辑任务的处理函数
  const handleCancelEdit = () => {
    setModalVisible(false);
    setEditIndex(null);
    setErrorMessage(null);
  };

  // 完成任务的处理函数
  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems]; // 复制任务列表
    itemsCopy.splice(index, 1); // 删除指定任务
    setTaskItems(itemsCopy); // 更新任务列表
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background1.jpg")}
      style={styles.background}
    >
      <BlurView intensity={30} style={styles.blurContainer}>
        {/* 添加 ScrollView 以便列表项多于页面时可以滚动 */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          {/* 今日任务 */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder={"Write a task"}
              value={task || ""}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={() => handleAddTask()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View>
            {taskItems.map((item, index) => (
              <Task
                key={index}
                text={item.text}
                color={colors[index % colors.length]} // 使用循环颜色
                onDelete={() => completeTask(index)}
                onPress={() => handleEditTask(index)}
              />
            ))}
          </View>
        </ScrollView>

        {/* 编辑任务模态框 */}
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [
                    {
                      translateX: shakeAnimation,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                style={styles.modalInput}
                value={editTask || ""}
                onChangeText={setEditTask}
                placeholder="Edit your task"
              />
              {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
              <View style={styles.modalButtons}>
                <Button title="Save" onPress={handleSaveEdit} />
                <Button title="Cancel" onPress={handleCancelEdit} />
              </View>
            </Animated.View>
          </View>
        </Modal>
      </BlurView>
    </ImageBackground>
  );
};

// 样式定义
const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(36, 59, 85, 1)",
    marginTop: 20,
    marginHorizontal: 20, // Adjust margin to ensure alignment
  },
  writeTaskWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginRight: 20, // Space between input and button
  },
  addWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
    color: "rgba(36, 59, 85, 1)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "rgba(250, 250, 250, 0.9)",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Todo;
