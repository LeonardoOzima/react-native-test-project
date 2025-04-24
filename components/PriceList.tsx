import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface Transaction {
  id: string;
  date: string;
  reason: string;
  price: string;
}

const formatCurrency = (value: string): string => {
  const numeric = value.replace(/\D/g, "");
  const number = parseFloat(numeric) / 100;
  return isNaN(number)
    ? "R$ 0,00"
    : number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
};

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reason, setReason] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleAdd = (): void => {
    if (!reason || !price) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toLocaleString("pt-BR"),
      reason,
      price,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setReason("");
    setPrice("");
  };

  const renderItem = ({ item }: { item: Transaction }) => (
    <View className="flex-row justify-between mb-2">
      <Text className="flex-1 text-sm">{item.date}</Text>
      <Text className="flex-1 text-sm">{item.reason}</Text>
      <Text className="flex-1 text-right text-sm">{item.price}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 p-4 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <Text className="text-xl font-bold mb-4">Nova Transação</Text>

          <View className="mb-4">
            <TextInput
              placeholder="Motivo"
              value={reason}
              onChangeText={(text: string) => setReason(text)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-2 text-base"
            />
            <TextInput
              placeholder="Preço"
              value={price}
              onChangeText={(text: string) => setPrice(formatCurrency(text))}
              className="border border-gray-300 rounded-md px-4 py-2 mb-2 text-base"
              keyboardType="numeric"
            />
            <Button title="Adicionar" onPress={handleAdd} />
          </View>

          <View className="flex-row justify-between border-b border-gray-300 pb-2 mb-2">
            <Text className="flex-1 font-bold">Data</Text>
            <Text className="flex-1 font-bold">Motivo</Text>
            <Text className="flex-1 font-bold text-right">Preço</Text>
          </View>

          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TransactionList;
