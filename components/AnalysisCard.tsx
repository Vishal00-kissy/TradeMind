import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { MarketAnalysis } from '@/services/aiAnalysis';

interface AnalysisCardProps {
  analysis: MarketAnalysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const trendColor = 
    analysis.trend === 'BULLISH' ? COLORS.profit :
    analysis.trend === 'BEARISH' ? COLORS.loss :
    COLORS.warning;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="analytics-outline" size={20} color={COLORS.accent.primary} />
          <Text style={styles.title}>AI Market Analysis</Text>
        </View>
        <View style={[styles.trendBadge, { backgroundColor: trendColor }]}>
          <Text style={styles.trendText}>{analysis.trend}</Text>
        </View>
      </View>
      
      <Text style={styles.analysisText}>{analysis.analysis}</Text>
      
      <View style={styles.levelsRow}>
        <View style={styles.levelItem}>
          <Text style={styles.levelLabel}>Support</Text>
          <Text style={[styles.levelValue, { color: COLORS.profit }]}>
            ₹{analysis.support}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.levelItem}>
          <Text style={styles.levelLabel}>Resistance</Text>
          <Text style={[styles.levelValue, { color: COLORS.loss }]}>
            ₹{analysis.resistance}
          </Text>
        </View>
      </View>
      
      <View style={styles.signalsContainer}>
        <Text style={styles.signalsTitle}>Key Signals</Text>
        {analysis.signals.map((signal, index) => (
          <View key={index} style={styles.signalItem}>
            <View style={styles.signalDot} />
            <Text style={styles.signalText}>{signal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  trendBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
  },
  trendText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  analysisText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  levelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  levelItem: {
    flex: 1,
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  levelValue: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  signalsContainer: {
    gap: SPACING.sm,
  },
  signalsTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  signalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  signalDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent.primary,
  },
  signalText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    flex: 1,
  },
});
