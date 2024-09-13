import React from "react";
import { View, StyleSheet, Modal } from "react-native";

import * as Progress from "react-native-progress";

import AppText from "../components/AppText";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <AppText>
          {Progress > 1 ? (
            <Progress.Bar
              color={colors.primary}
              progress={progress}
              width={200}
            />
          ) : (
            <LottieView
              autoPlay
              loop={false}
              onAnimationFinish={onDone}
              source={require("../assets/animations/done.json")}
            />
          )}
        </AppText>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
export default UploadScreen;
