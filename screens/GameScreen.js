import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont lie!!!", "You know that is wrong", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRdnNum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRdnNum);
    setGuessRounds((prevGuessRounds) => [newRdnNum, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponents Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.cardContainer}>
        <Card>
          <InstructionText style={styles.text}>
            Higher or Lower?
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="md-remove" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="md-add" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (
          <GuessLogItem
            key={guessRound}
            roundNumber={guessRoundsListLength - guessRound.index}
            guess={guessRound}
          >
            {guessRound}
          </GuessLogItem>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
    padding: 5,
  },

  listContainer: {
    flex: 1,
    padding: 16,
  },

  cardContainer: {
    marginTop: -70,
  },
});
