import { View, Text } from "react-native";
import React from "react";
import TransactionList from "../../components/PriceList";
const List = () => {
  return (
    <View className="flex-1 bg-black p-4">
      <TransactionList />
    </View>
  );
};

export default List;
