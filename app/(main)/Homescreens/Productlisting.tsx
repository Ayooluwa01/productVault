import HomeHeader from "@/components/Header";
import { StyledText } from "@/components/Styledtext";
import { stylings } from "@/src/constants/stylings";
import { useProductStore } from "@/src/store/useProductStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Empty state for products
const Vaultcapacity = () => {
  const { products, limit } = useProductStore();

  const used = products.length;
  const percentage = Math.round((used / limit) * 100);

  return (
    <View>
      <View style={styles.vaultcapacitygrid}>
        <StyledText>VAULT CAPACITY</StyledText>

        <View style={styles.vaultcapacityrow}>
          <StyledText style={styles.vaultcapacitytext}>
            {used}/{limit} PRODUCTS
          </StyledText>

          <FontAwesome6
            name="circle-exclamation"
            size={19}
            color={used >= limit ? "red" : "#021064"}
          />
        </View>

        {/* Progress Bar */}
        <View style={styles.vaultcapacityprogressbar}>
          <View style={styles.vaultcapacityprogressbarfill}></View>
        </View>

        <StyledText>
          You have {limit - used} slots available in your basic vault.
        </StyledText>
      </View>
    </View>
  );
};

const Productlisting = () => {
  return (
    <ScrollView style={styles.container}>
      <HomeHeader />

      <View style={styles.vaultcapacity}>
        <Vaultcapacity />
      </View>
    </ScrollView>
  );
};

export default Productlisting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: stylings.spacing.screenEdge,
  },
  vaultcapacity: {
    backgroundColor: "#E0E3E5",
    marginTop: stylings.spacing.section,
    padding: 32,
    borderRadius: 20,
    marginHorizontal: stylings.spacing.screenEdge,
  },
  vaultcapacityrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: stylings.spacing.small,
  },
  vaultcapacitygrid: {
    flexDirection: "column",
    marginTop: stylings.spacing.small,
    gap: stylings.spacing.small,
  },
  vaultcapacitytext: {
    fontSize: stylings.fontSize.mediumtext,
    fontWeight: "bold",
    color: stylings.colors.text.bluebg,
  },
  vaultcapacityprogressbar: {
    height: 10,
    backgroundColor: "#E0E3E5",
    borderRadius: 20,
    marginTop: stylings.spacing.small,
  },
  vaultcapacityprogressbarfill: {
    height: 10,
    backgroundColor: "#021064",
    borderRadius: 20,
  },
});
