import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";

type DisclaimerBannerProps = {
  compact?: boolean;
};

export function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  return (
    <View style={[styles.banner, compact && styles.compact]}>
      <Text style={styles.title}>Safety notes</Text>
      <Text style={styles.body}>
        TinyPrep is not medical advice. Check allergies, follow pediatrician guidance,
        use age-appropriate texture and choking safety, and reheat and store food safely.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FFF5D8",
    borderColor: "#E8C675",
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginTop: spacing.md
  },
  compact: {
    margin: spacing.md
  },
  title: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 4
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  }
});
