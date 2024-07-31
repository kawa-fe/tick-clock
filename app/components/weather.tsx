import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

// 高德 API 的主键
const mainKey = "2221b01d1f0aa6f690d347d2fc1062ee";

// 定义 WeatherData 接口，描述天气数据的结构
export interface WeatherData {
  adCode: {
    city: string | null; // 城市名称
    abode: string | null; // 详细地址
  };
  weather: {
    weather: string | null; // 天气情况
    temperature: number | null; // 温度
    winddirection: string | null; // 风向
    widower: string | null; // 风力
  };
}

// 计算平均温度的函数，接受最小温度和最大温度作为字符串参数
const getTemperature = (min: string, max: string) => {
  try {
    const average = (Number(min) + Number(max)) / 2; // 计算平均温度
    return Math.round(average); // 返回四舍五入后的平均温度
  } catch (error) {
    console.error("计算温度出现错误：", error); // 捕获和打印错误
    return NaN; // 返回 NaN 表示计算失败
  }
};

const Weather = () => {
  // 定义 weatherData 状态，用于存储天气数据
  const [weatherData, setWeatherData] = useState<WeatherData>({
    adCode: { city: null, abode: null },
    weather: {
      weather: null,
      temperature: null,
      winddirection: null,
      widower: null,
    },
  });

  // 定义 error 状态，用于存储错误信息
  const [error, setError] = useState<string | null>(null);

  // 获取天气数据的异步函数
  const getWeatherData = async () => {
    try {
      // 如果主键为空，则从 Oioweb API 获取天气数据
      if (!mainKey) {
        const result = await axios.get(
          "https://api.oioweb.cn/api/weather/GetWeather"
        );
        const data = result.data.result;
        setWeatherData({
          adCode: {
            city: data.city.City || "未知地区", // 设置城市名称
            abode: null,
          },
          weather: {
            weather: data.condition.day_weather, // 设置天气情况
            temperature: getTemperature(
              data.condition.min_degree,
              data.condition.max_degree
            ), // 设置温度
            winddirection: data.condition.day_wind_direction, // 设置风向
            widower: data.condition.day_wind_power, // 设置风力
          },
        });
      } else {
        // 从高德 API 获取 IP 对应的地区代码
        const adCodeResponse = await axios.get(
          `https://restapi.amap.com/v3/ip?key=${mainKey}`
        );
        const adCode = adCodeResponse.data;
        if (adCode.status !== "1") {
          throw new Error("地区查询失败"); // 抛出地区查询失败的错误
        }
        // 使用地区代码从高德 API 获取天气信息
        const weatherResponse = await axios.get(
          `https://restapi.amap.com/v3/weather/weatherInfo?key=${mainKey}&city=${adCode.adcode}`
        );
        const weatherResult = weatherResponse.data;
        setWeatherData({
          adCode: {
            city: adCode.city, // 设置城市名称
            abode: adCode.abode, // 设置详细地址
          },
          weather: {
            weather: weatherResult.lives[0].weather, // 设置天气情况
            temperature: weatherResult.lives[0].temperature, // 设置温度
            winddirection: weatherResult.lives[0].winddirection, // 设置风向
            widower: weatherResult.lives[0].widower, // 设置风力
          },
        });
      }
    } catch (error) {
      console.error("天气信息获取失败:", error); // 捕获并打印错误
      setError("天气信息获取失败"); // 设置错误信息
    }
  };

  // 使用 useEffect 在组件挂载时获取天气数据
  useEffect(() => {
    getWeatherData();
  }, []);

  // 渲染组件
  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text> // 显示错误信息
      ) : (
        <View style={styles.weather}>
          <Text style={styles.text}> {weatherData.adCode.city || "未知地区"}</Text>
          <Text style={styles.text}> {weatherData.weather.weather || "未知"}</Text>
          <Text style={styles.text}>{weatherData.weather.temperature || "未知"}°C</Text>
          <Text style={styles.text}>{weatherData.weather.winddirection || "未知"}风</Text>
        </View>
      )}
    </View>
  );
};

// 定义样式
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  weather: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  errorText: {
    color: "#808080",
    textAlign: "center",
  },
  text: {
    color: "rgba(36, 59, 85, 0.9)",
    margin: 3,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Weather;
