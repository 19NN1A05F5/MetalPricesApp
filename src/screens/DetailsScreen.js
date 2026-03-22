import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name} Details</Text>

      <Text>Price: ₹{item.price}</Text>
      <Text>Previous Open: ₹{item.open}</Text>
      <Text>Previous Close: ₹{item.close}</Text>
      <Text>Date: {new Date().toLocaleDateString()}</Text>
      <Text>Time: {item.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
});