import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";

type ListRowProps = {
  title: string;
  subtitle?: string;
  trailing?: string;
  onPress?: () => void;
};

export function ListRow({ title, subtitle, trailing, onPress }: ListRowProps) {
  const content = (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing ? <Text style={styles.trailing}>{trailing}</Text> : null}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    gap: spacing.md,
    paddingVertical: spacing.sm
  },
  copy: {
    flex: 1
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 3
  },
  trailing: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: "800"
  },
  pressed: {
    opacity: 0.72
  }
});
