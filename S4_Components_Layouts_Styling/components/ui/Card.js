import { Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: deviceWidth < 380 ? 18 : 24,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,

    // shadow on android
    elevation: 4,
    // shadow on ios
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
