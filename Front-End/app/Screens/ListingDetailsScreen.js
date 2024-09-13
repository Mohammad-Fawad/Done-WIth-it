import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 100}
    >
      <View>
        <Image style={styles.image} uri={listing.images[0].url} />
        <View style={styles.detailContainer}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>${listing.price}</AppText>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/shz.jpg")}
              title="Fawad Sipra"
              subTitle="5 Listings"
            />
          </View>
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  detailContainer: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 280,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  userContainer: {
    marginVertical: 35,
  },
});
export default ListingDetailsScreen;
