import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-BoldItalic.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Semibold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function startnewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  function gameOver(numberofRounds) {
    setGameIsOver(true);
    setGuessRounds(numberofRounds);
  }

  let screen = <StartGameScreen numberPicked={pickedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOver} />;
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartnewGame={startnewGameHandler}
      />
    );
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
