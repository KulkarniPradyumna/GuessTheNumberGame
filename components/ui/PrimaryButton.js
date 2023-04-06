import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOutercontainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonInnerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },

  buttonOutercontainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,

    borderRadius: 28,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
  },

  pressed: {
    opacity: 0.5,
  },
});
