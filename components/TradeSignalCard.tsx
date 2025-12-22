import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { TradeRecommendation } from '@/services/aiAnalysis';

interface TradeSignalCardProps {
  recommendation: TradeRecommendation;
  onExecute: (id: string) => void;
}

export function TradeSignalCard({ recommendation, onExecute }: TradeSignalCardProps) {
  const isBuy = recommendation.type === 'BUY';
  const typeColor = isBuy ? COLORS.profit : COLORS.loss;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
          <Ionicons 
            name={isBuy ? 'arrow-up' : 'arrow-down'} 
            size={14} 
            color={COLORS.text.primary} 
          />
          <Text style={styles.typeText}>{recommendation.type}</Text>
        </View>
        <View style={styles.confidenceBadge}>
          <Ionicons name="analytics" size={12} color={COLORS.accent.primary} />
          <Text style={styles.confidenceText}>{recommendation.confidence}% AI</Text>
        </View>
      </View>
      
      <Text style={styles.instrument}>
        {recommendation.instrument} {recommendation.strike}{recommendation.optionType}
      </Text>
      
      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Lots</Text>
          <Text style={styles.detailValue}>{recommendation.lots}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Entry</Text>
          <Text style={styles.detailValue}>₹{recommendation.entryPrice}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Target</Text>
          <Text style={[styles.detailValue, { color: COLORS.profit }]}>
            ₹{recommendation.targetPrice}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>SL</Text>
          <Text style={[styles.detailValue, { color: COLORS.loss }]}>
            ₹{recommendation.stopLoss}
          </Text>
        </View>
      </View>
      
      <View style={styles.timeRow}>
        <View style={styles.timeItem}>
          <Ionicons name="time-outline" size={14} color={COLORS.text.secondary} />
          <Text style={styles.timeText}>Entry: {recommendation.entryTime}</Text>
        </View>
        {recommendation.exitTime && (
          <View style={styles.timeItem}>
            <Ionicons name="exit-outline" size={14} color={COLORS.text.secondary} />
            <Text style={styles.timeText}>Exit: {recommendation.exitTime}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.reason}>{recommendation.reason}</Text>
      
      {recommendation.status === 'PENDING' && (
        <TouchableOpacity 
          style={[styles.executeButton, { backgroundColor: typeColor }]}
          onPress={() => onExecute(recommendation.id)}
        >
          <Ionicons name="flash" size={18} color={COLORS.text.primary} />
          <Text style={styles.executeText}>Execute Trade</Text>
        </TouchableOpacity>
      )}
      
      {recommendation.status === 'ACTIVE' && (
        <View style={styles.activeIndicator}>
          <View style={styles.pulse} />
          <Text style={styles.activeText}>TRADE ACTIVE</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
    gap: SPACING.xs,
  },
  typeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.sm,
  },
  confidenceText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.accent.primary,
  },
  instrument: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  timeRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  timeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  reason: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  executeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  executeText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  pulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.profit,
  },
  activeText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.profit,
  },
});
