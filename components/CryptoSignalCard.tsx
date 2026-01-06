import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import type { CryptoAISignal } from '@/services/aiCryptoAnalysis';

interface CryptoSignalCardProps {
  signal: CryptoAISignal;
  currentPrice: number;
  onTrade: (symbol: string, signal: 'BUY' | 'SELL') => void;
}

export function CryptoSignalCard({ signal, currentPrice, onTrade }: CryptoSignalCardProps) {
  const isBuy = signal.signal === 'BUY';
  const signalColor = isBuy ? COLORS.profit : signal.signal === 'SELL' ? COLORS.loss : COLORS.warning;
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return COLORS.profit;
      case 'MEDIUM': return COLORS.warning;
      case 'HIGH': return COLORS.loss;
      default: return COLORS.text.secondary;
    }
  };
  
  const getTimeHorizonText = (horizon: string) => {
    switch (horizon) {
      case 'SHORT_TERM': return '24-48h';
      case 'MEDIUM_TERM': return '1 Week';
      case 'LONG_TERM': return '1 Month+';
      default: return horizon;
    }
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.symbolContainer}>
          <View style={[styles.signalBadge, { backgroundColor: signalColor + '20' }]}>
            <Ionicons
              name={isBuy ? 'trending-up' : signal.signal === 'SELL' ? 'trending-down' : 'remove'}
              size={16}
              color={signalColor}
            />
            <Text style={[styles.signalText, { color: signalColor }]}>
              {signal.signal}
            </Text>
          </View>
          <Text style={styles.symbol}>{signal.symbol}</Text>
        </View>
        
        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Confidence</Text>
          <Text style={styles.confidenceValue}>{signal.confidence}%</Text>
        </View>
      </View>
      
      <View style={styles.aiIcon}>
        <Ionicons name="sparkles" size={14} color={COLORS.accent.primary} />
        <Text style={styles.aiLabel}>AI Analysis</Text>
      </View>
      
      <Text style={styles.reasoning}>{signal.reasoning}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current</Text>
          <Text style={styles.statValue}>₹{currentPrice.toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Target</Text>
          <Text style={[styles.statValue, { color: COLORS.profit }]}>
            ₹{signal.targetPrice.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Stop Loss</Text>
          <Text style={[styles.statValue, { color: COLORS.loss }]}>
            ₹{signal.stopLoss.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>
      
      <View style={styles.metaRow}>
        <View style={[styles.metaBadge, { backgroundColor: getRiskColor(signal.riskLevel) + '20' }]}>
          <Text style={[styles.metaText, { color: getRiskColor(signal.riskLevel) }]}>
            {signal.riskLevel} Risk
          </Text>
        </View>
        <View style={styles.metaBadge}>
          <Ionicons name="time-outline" size={12} color={COLORS.text.secondary} />
          <Text style={styles.metaText}>{getTimeHorizonText(signal.timeHorizon)}</Text>
        </View>
        <View style={[styles.metaBadge, { backgroundColor: COLORS.profit + '20' }]}>
          <Text style={[styles.metaText, { color: COLORS.profit }]}>
            +{signal.potentialProfit.toFixed(1)}% Potential
          </Text>
        </View>
      </View>
      
      {signal.signal !== 'HOLD' && (
        <TouchableOpacity
          style={[styles.tradeButton, { backgroundColor: signalColor }]}
          onPress={() => onTrade(signal.symbol, signal.signal as 'BUY' | 'SELL')}
        >
          <Ionicons name={isBuy ? 'arrow-up' : 'arrow-down'} size={20} color={COLORS.text.primary} />
          <Text style={styles.tradeButtonText}>
            {signal.signal} {signal.symbol}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.accent.primary + '30',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  signalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
    gap: SPACING.xs,
  },
  signalText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  symbol: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  confidenceContainer: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  confidenceValue: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.accent.primary,
  },
  aiIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  aiLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.accent.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  reasoning: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.tertiary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  tradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  tradeButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
});
