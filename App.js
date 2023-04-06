import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  // function gameOverHandler() {
  //  setGameIsOver(true);
  // }

  function gameOver() {
    setGameIsOver(true);
  }

  let screen = <StartGameScreen numberPicked={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOver} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen />;
  }

  function gameOverHandler() {}
  return (
    <LinearGradient
      colors={["#3b0621", Colors.accent400]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/riho-kroll-m4sGYaHYN5o-unsplash.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroungImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  backgroungImage: {
    opacity: 0.15,
  },
});
