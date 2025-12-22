import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { IPO } from '@/services/ipoService';

interface IPOCardProps {
  ipo: IPO;
  onApply: (ipoId: string) => void;
}

export function IPOCard({ ipo, onApply }: IPOCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN': return COLORS.profit;
      case 'UPCOMING': return COLORS.warning;
      case 'CLOSED': return COLORS.text.tertiary;
      default: return COLORS.text.secondary;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.company}>{ipo.companyName}</Text>
          <View style={styles.typeRow}>
            <View style={[styles.typeBadge, { backgroundColor: COLORS.background.tertiary }]}>
              <Text style={styles.typeText}>{ipo.type}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ipo.status) }]}>
          <Text style={styles.statusText}>{ipo.status}</Text>
        </View>
      </View>
      
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.label}>Price Range</Text>
          <Text style={styles.priceValue}>
            ₹{ipo.priceRange.min} - ₹{ipo.priceRange.max}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Lot Size</Text>
          <Text style={styles.lotValue}>{ipo.lotSize} shares</Text>
        </View>
      </View>
      
      {ipo.gmpPrice && (
        <View style={styles.gmpRow}>
          <Ionicons name="trending-up" size={16} color={COLORS.profit} />
          <Text style={styles.gmpText}>
            GMP: ₹{ipo.gmpPrice} ({ipo.gmpPercent?.toFixed(1)}%)
          </Text>
        </View>
      )}
      
      <View style={styles.subscriptionContainer}>
        <Text style={styles.subsLabel}>Subscription</Text>
        <View style={styles.subsRow}>
          <View style={styles.subsItem}>
            <Text style={styles.subsCategory}>Retail</Text>
            <Text style={styles.subsValue}>{ipo.subscription.retail.toFixed(1)}x</Text>
          </View>
          <View style={styles.subsItem}>
            <Text style={styles.subsCategory}>QIB</Text>
            <Text style={styles.subsValue}>{ipo.subscription.qib.toFixed(1)}x</Text>
          </View>
          <View style={styles.subsItem}>
            <Text style={styles.subsCategory}>Total</Text>
            <Text style={[styles.subsValue, { color: COLORS.accent.primary }]}>
              {ipo.subscription.total.toFixed(1)}x
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.datesRow}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Close Date</Text>
          <Text style={styles.dateValue}>{new Date(ipo.closeDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Listing</Text>
          <Text style={styles.dateValue}>{new Date(ipo.listingDate).toLocaleDateString()}</Text>
        </View>
      </View>
      
      {ipo.status === 'OPEN' && (
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => onApply(ipo.id)}
        >
          <Text style={styles.applyText}>Apply Now</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.text.primary} />
        </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  titleSection: {
    flex: 1,
  },
  company: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  typeRow: {
    flexDirection: 'row',
  },
  typeBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
  },
  typeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
    height: 24,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  priceValue: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  lotValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
  },
  gmpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.background.tertiary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    marginBottom: SPACING.md,
  },
  gmpText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.profit,
  },
  subscriptionContainer: {
    marginBottom: SPACING.md,
  },
  subsLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  subsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subsItem: {
    alignItems: 'center',
  },
  subsCategory: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  subsValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  dateValue: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent.primary,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  applyText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
});
