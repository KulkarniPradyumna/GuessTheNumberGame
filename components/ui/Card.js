import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}
export default Card;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    marginTop: 100,
    marginHorizontal: 24,
    borderRadius: 5,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 200,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: "center",
  },
});
