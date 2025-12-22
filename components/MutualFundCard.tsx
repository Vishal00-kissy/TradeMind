import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { MutualFund } from '@/services/mutualFunds';

interface MutualFundCardProps {
  fund: MutualFund;
  onInvest: (fundId: string) => void;
}

export function MutualFundCard({ fund, onInvest }: MutualFundCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return COLORS.profit;
      case 'MODERATE': return COLORS.warning;
      case 'HIGH': return COLORS.loss;
      default: return COLORS.text.secondary;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.name}>{fund.name}</Text>
          <Text style={styles.amc}>{fund.amc}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={COLORS.warning} />
          <Text style={styles.rating}>{fund.rating}</Text>
        </View>
      </View>
      
      <View style={styles.navRow}>
        <View>
          <Text style={styles.navLabel}>NAV</Text>
          <Text style={styles.nav}>₹{fund.nav.toFixed(2)}</Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: getRiskColor(fund.riskLevel) }]}>
          <Text style={styles.categoryText}>{fund.category}</Text>
        </View>
      </View>
      
      <View style={styles.returnsRow}>
        <View style={styles.returnItem}>
          <Text style={styles.returnLabel}>1Y</Text>
          <Text style={[styles.returnValue, { color: fund.returns1Y >= 0 ? COLORS.profit : COLORS.loss }]}>
            {fund.returns1Y.toFixed(1)}%
          </Text>
        </View>
        <View style={styles.returnItem}>
          <Text style={styles.returnLabel}>3Y</Text>
          <Text style={[styles.returnValue, { color: fund.returns3Y >= 0 ? COLORS.profit : COLORS.loss }]}>
            {fund.returns3Y.toFixed(1)}%
          </Text>
        </View>
        <View style={styles.returnItem}>
          <Text style={styles.returnLabel}>5Y</Text>
          <Text style={[styles.returnValue, { color: fund.returns5Y >= 0 ? COLORS.profit : COLORS.loss }]}>
            {fund.returns5Y.toFixed(1)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View>
          <Text style={styles.minLabel}>Min SIP</Text>
          <Text style={styles.minValue}>₹{fund.minSIP}</Text>
        </View>
        <TouchableOpacity 
          style={styles.investButton}
          onPress={() => onInvest(fund.id)}
        >
          <Text style={styles.investText}>Start SIP</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.text.primary} />
        </TouchableOpacity>
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
    marginBottom: SPACING.md,
  },
  titleSection: {
    flex: 1,
  },
  name: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  amc: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.background.tertiary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
    height: 24,
  },
  rating: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  navLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  nav: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  categoryBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  returnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  returnItem: {
    alignItems: 'center',
  },
  returnLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  returnValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  minLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  minValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
  },
  investButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  investText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
});
