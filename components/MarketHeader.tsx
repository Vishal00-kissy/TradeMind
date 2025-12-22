import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

interface MarketHeaderProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export function MarketHeader({ symbol, price, change, changePercent }: MarketHeaderProps) {
  const isPositive = change >= 0;
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbol}>{symbol}</Text>
        <View style={[styles.badge, { backgroundColor: isPositive ? COLORS.profit : COLORS.loss }]}>
          <Ionicons 
            name={isPositive ? 'trending-up' : 'trending-down'} 
            size={12} 
            color={COLORS.text.primary} 
          />
          <Text style={styles.badgeText}>
            {isPositive ? 'BULLISH' : 'BEARISH'}
          </Text>
        </View>
      </View>
      
      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{price.toFixed(2)}</Text>
        <View style={styles.changeContainer}>
          <Ionicons 
            name={isPositive ? 'arrow-up' : 'arrow-down'} 
            size={16} 
            color={isPositive ? COLORS.profit : COLORS.loss} 
          />
          <Text style={[styles.change, { color: isPositive ? COLORS.profit : COLORS.loss }]}>
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.card,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  symbol: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
    gap: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  change: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});
