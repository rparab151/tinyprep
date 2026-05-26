import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";

type ChipProps = {
  label: string;
  tone?: "warm" | "green" | "blue" | "rose";
};

export function Chip({ label, tone = "warm" }: ChipProps) {
  return (
    <View style={[styles.chip, styles[tone]]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  warm: {
    backgroundColor: colors.surfaceWarm
  },
  green: {
    backgroundColor: "#DFF1E5"
  },
  blue: {
    backgroundColor: "#DDEBF2"
  },
  rose: {
    backgroundColor: "#F7DDE5"
  },
  label: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "800"
  }
});
