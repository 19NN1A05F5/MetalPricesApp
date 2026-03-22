import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";

const metals = ["Gold", "Silver", "Platinum", "Palladium"];

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const fetchMetal = (metal) => {
    setLoading((prev) => ({ ...prev, [metal]: true }));
    setError((prev) => ({ ...prev, [metal]: null }));

    setTimeout(() => {
      // simulate error randomly
      if (Math.random() < 0.2) {
        setError((prev) => ({
          ...prev,
          [metal]: "Failed to load",
        }));
        setLoading((prev) => ({ ...prev, [metal]: false }));
        return;
      }

      const result = {
        name: metal,
        price: Math.floor(Math.random() * 5000) + 100,
        time: new Date().toLocaleTimeString(),
        open: Math.floor(Math.random() * 5000),
        close: Math.floor(Math.random() * 5000),
      };

      setData((prev) => ({ ...prev, [metal]: result }));
      setLoading((prev) => ({ ...prev, [metal]: false }));
    }, 1000);
  };

  useEffect(() => {
    metals.forEach(fetchMetal);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {metals.map((metal) => (
        <View key={metal} style={styles.card}>
          <Text style={styles.title}>{metal}</Text>

          {loading[metal] && <ActivityIndicator />}

          {error[metal] && (
            <Text style={styles.error}>{error[metal]}</Text>
          )}

          {data[metal] && (
            <>
              <Text style={styles.price}>₹{data[metal].price}</Text>
              <Text>Updated: {data[metal].time}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("Details", {
                    item: data[metal],
                  })
                }
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, marginVertical: 5 },
  button: {
    marginTop: 10,
    backgroundColor: "black",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: { color: "white", textAlign: "center" },
  error: { color: "red" },
});