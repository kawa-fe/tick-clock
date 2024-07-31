import React, { Component } from "react";
import { View } from "react-native";

export default class AnalogClock extends Component {
  constructor(props) {
    super(props);

    let d = new Date();

    this.state = {
      sec: d.getSeconds() * 6,
      min: d.getMinutes() * 6 + (d.getSeconds() * 6) / 60,
      hour:
        ((d.getHours() % 12) / 12) * 360 +
        90 +
        (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let d = new Date();
      this.setState({ sec: d.getSeconds() * 6 });
      this.setState({ min: d.getMinutes() * 6 + (d.getSeconds() * 6) / 60 });
      this.setState({
        hour:
          ((d.getHours() % 12) / 12) * 360 +
          90 +
          (d.getMinutes() * 6 + (d.getSeconds() * 6) / 60) / 12,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  clockFrame() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: "relative",
      borderColor: "rgba(86, 204, 242, 0.3)",
      borderWidth: this.props.clockBorderWidth,
      borderRadius: this.props.clockSize / 2,
      backgroundColor: "rgba(20, 280, 250, 0.3)",
    };
  }

  clockHolder() {
    return {
      width: this.props.clockSize,
      height: this.props.clockSize,
      position: "absolute",
      right: -this.props.clockBorderWidth,
      bottom: -this.props.clockBorderWidth,
    };
  }

  clockFace() {
    return {
      width: this.props.clockCentreSize,
      height: this.props.clockCentreSize,
      backgroundColor: this.props.clockCentreColor,
      borderRadius: this.props.clockCentreSize / 2,
      top: (this.props.clockSize - this.props.clockCentreSize) / 2,
      left: (this.props.clockSize - this.props.clockCentreSize) / 2,
    };
  }

  hourHandStyles() {
    return {
      width: 0,
      height: 0,
      position: "absolute",
      backgroundColor: this.props.hourHandColor,
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginVertical: -this.props.hourHandWidth,
      marginLeft: -this.props.hourHandLength / 2,
      paddingVertical: this.props.hourHandWidth,
      paddingLeft: this.props.hourHandLength,
      borderTopLeftRadius: this.props.hourHandCurved
        ? this.props.hourHandWidth
        : 0,
      borderBottomLeftRadius: this.props.hourHandCurved
        ? this.props.hourHandWidth
        : 0,
    };
  }

  minuteHandStyles() {
    return {
      width: 0,
      height: 0,
      position: "absolute",
      backgroundColor: this.props.minuteHandColor,
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginTop: -(this.props.minuteHandLength / 2),
      marginHorizontal: -this.props.minuteHandWidth,
      paddingTop: this.props.minuteHandLength,
      paddingHorizontal: this.props.minuteHandWidth,
      borderTopLeftRadius: this.props.minuteHandCurved
        ? this.props.minuteHandWidth
        : 0,
      borderTopRightRadius: this.props.minuteHandCurved
        ? this.props.minuteHandWidth
        : 0,
    };
  }

  secondHandStyles() {
    return {
      width: 0,
      height: 0,
      position: "absolute",
      backgroundColor: "black",
      top: this.props.clockSize / 2,
      left: this.props.clockSize / 2,
      marginTop: -(this.props.secondHandLength / 2),
      marginHorizontal: -this.props.secondHandWidth,
      paddingTop: this.props.secondHandLength,
      paddingHorizontal: this.props.secondHandWidth,
      borderTopLeftRadius: this.props.secondHandCurved
        ? this.props.secondHandWidth
        : 0,
      borderTopRightRadius: this.props.secondHandCurved
        ? this.props.secondHandWidth
        : 0,
    };
  }

  render() {
    return (
      <View style={this.clockFrame()}>
        {/* <Image
          style={{
            width: this.props.clockSize - this.props.clockBorderWidth * 2,
            height: this.props.clockSize - this.props.clockBorderWidth * 2,
          }}
          resizeMode="stretch"
          // source={require("./clockBack.png")}
        /> */}

        <View style={this.clockHolder()}>
          <View
            style={[
              this.hourHandStyles(),
              {
                transform: [
                  { rotate: this.state.hour + "deg" },
                  {
                    translateX: -(
                      this.props.hourHandOffset +
                      this.props.hourHandLength / 2
                    ),
                  },
                ],
              },
            ]}
          />

          <View
            style={[
              this.minuteHandStyles(),
              {
                transform: [
                  { rotate: this.state.min + "deg" },
                  {
                    translateY: -(
                      this.props.minuteHandOffset +
                      this.props.minuteHandLength / 2
                    ),
                  },
                ],
              },
            ]}
          />

          <View
            style={[
              this.secondHandStyles(),
              {
                transform: [
                  { rotate: this.state.sec + "deg" },
                  {
                    translateY: -(
                      this.props.secondHandOffset +
                      this.props.secondHandLength / 2
                    ),
                  },
                ],
              },
            ]}
          />

          <View style={this.clockFace()} />
        </View>
      </View>
    );
  }
}

AnalogClock.defaultProps = {
  backgroundImage: "./clockBack.png",
  clockSize: 150,
  clockBorderWidth: 3,
  clockCentreSize: 8,
  clockCentreColor: "rgba(40, 59, 95, 1)",
  hourHandColor: "rgba(36, 59, 85, 1)",
  hourHandCurved: true,
  hourHandLength: 40,
  hourHandWidth: 3,
  hourHandOffset: 0,
  minuteHandColor: "rgba(36, 59, 85, 1)",
  minuteHandCurved: true,
  minuteHandLength: 50,
  minuteHandWidth: 2,
  minuteHandOffset: 0,
  secondHandColor: "rgba(36, 59, 85, 1)",
  secondHandCurved: false,
  secondHandLength: 60,
  secondHandWidth: 1,
  secondHandOffset: 0,
};
