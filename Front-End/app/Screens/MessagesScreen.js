import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import ListitemDeleteIcon from "../components/ListitemDeleteIcon";

const intailMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/shz.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/shz.jpg"),
  },
];

function MessagesScreen(props) {
  const [messages, setMessages] = useState(intailMessages);
  const [refreshing, setrefreshing] = useState(false);

  const handleDelete = (message) => {
    //Dlete message from messages

    setMessages(messages.filter((m) => m.id !== message.id));
    //call the sever
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(messages) => messages.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message Selected")}
            renderRightActions={() => (
              <ListitemDeleteIcon onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/shz.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({});
export default MessagesScreen;
