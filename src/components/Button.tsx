import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, spacing } from "../theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "quiet";
};

export function Button({ label, onPress, variant = "primary" }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, styles[variant], pressed && styles.pressed]}
    >
      <Text style={[styles.label, variant === "primary" ? styles.primaryLabel : styles.secondaryLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderColor: colors.line
  },
  quiet: {
    backgroundColor: "transparent"
  },
  pressed: {
    opacity: 0.72
  },
  label: {
    fontSize: 16,
    fontWeight: "800"
  },
  primaryLabel: {
    color: "#FFFFFF"
  },
  secondaryLabel: {
    color: colors.primaryDark
  }
});
