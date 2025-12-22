import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { Stock } from '@/services/stockData';

interface StockCardProps {
  stock: Stock;
  onPress: (symbol: string) => void;
}

export function StockCard({ stock, onPress }: StockCardProps) {
  const isPositive = stock.change >= 0;
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(stock.symbol)}
    >
      <View style={styles.leftSection}>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.name} numberOfLines={1}>{stock.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Vol: {(stock.volume / 1000000).toFixed(2)}M</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>PE: {stock.pe}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.price}>₹{stock.price.toFixed(2)}</Text>
        <View style={[styles.changeBadge, { backgroundColor: isPositive ? COLORS.profit : COLORS.loss }]}>
          <Ionicons 
            name={isPositive ? 'arrow-up' : 'arrow-down'} 
            size={12} 
            color={COLORS.text.primary} 
          />
          <Text style={styles.changeText}>
            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
  },
  symbol: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  metaText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.tertiary,
  },
  metaDot: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.tertiary,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
    gap: SPACING.xs,
  },
  changeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
});
