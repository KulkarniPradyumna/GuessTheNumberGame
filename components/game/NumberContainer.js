import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}
export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent400,
    padding: 24,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  numberText: {
    color: Colors.accent400,
    fontSize: 36,
    fontWeight: "bold",
  },
});
