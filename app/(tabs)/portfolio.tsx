import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  
  const portfolioValue = 125000;
  const todayPnL = 3250;
  const todayPnLPercent = 2.67;
  
  const positions = [
    { symbol: 'NIFTY 25000CE', qty: 150, avgPrice: 85.50, ltp: 92.30, pnl: 1020 },
    { symbol: 'BANKNIFTY 51500PE', qty: 75, avgPrice: 125.00, ltp: 118.50, pnl: -487.50 },
    { symbol: 'NIFTY 24800PE', qty: 225, avgPrice: 45.25, ltp: 52.80, pnl: 1698.75 },
  ];
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        <Ionicons name="settings-outline" size={24} color={COLORS.text.primary} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
          <Text style={styles.portfolioValue}>₹{portfolioValue.toLocaleString('en-IN')}</Text>
          
          <View style={styles.pnlRow}>
            <View style={styles.pnlItem}>
              <Text style={styles.pnlLabel}>Today P&L</Text>
              <View style={styles.pnlValueRow}>
                <Ionicons 
                  name={todayPnL >= 0 ? 'arrow-up' : 'arrow-down'} 
                  size={16} 
                  color={todayPnL >= 0 ? COLORS.profit : COLORS.loss} 
                />
                <Text style={[styles.pnlValue, { color: todayPnL >= 0 ? COLORS.profit : COLORS.loss }]}>
                  ₹{Math.abs(todayPnL).toLocaleString('en-IN')}
                </Text>
                <Text style={[styles.pnlPercent, { color: todayPnL >= 0 ? COLORS.profit : COLORS.loss }]}>
                  ({todayPnLPercent.toFixed(2)}%)
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Open Positions</Text>
          <Text style={styles.positionCount}>{positions.length}</Text>
        </View>
        
        {positions.map((position, index) => (
          <View key={index} style={styles.positionCard}>
            <View style={styles.positionHeader}>
              <Text style={styles.positionSymbol}>{position.symbol}</Text>
              <View style={[styles.pnlBadge, { backgroundColor: position.pnl >= 0 ? COLORS.profit : COLORS.loss }]}>
                <Text style={styles.pnlBadgeText}>
                  {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toFixed(2)}
                </Text>
              </View>
            </View>
            
            <View style={styles.positionDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Qty:</Text>
                <Text style={styles.detailValue}>{position.qty}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Avg:</Text>
                <Text style={styles.detailValue}>₹{position.avgPrice}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>LTP:</Text>
                <Text style={[styles.detailValue, { color: position.pnl >= 0 ? COLORS.profit : COLORS.loss }]}>
                  ₹{position.ltp}
                </Text>
              </View>
            </View>
          </View>
        ))}
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={24} color={COLORS.profit} />
            <Text style={styles.statValue}>68%</Text>
            <Text style={styles.statLabel}>Win Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="flash" size={24} color={COLORS.accent.primary} />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Trades Today</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics" size={24} color={COLORS.warning} />
            <Text style={styles.statValue}>1.8</Text>
            <Text style={styles.statLabel}>Risk Ratio</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: COLORS.background.card,
    margin: SPACING.lg,
    padding: SPACING.xl,
    borderRadius: SPACING.md,
  },
  summaryLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  portfolioValue: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  pnlRow: {
    flexDirection: 'row',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  pnlItem: {
    flex: 1,
  },
  pnlLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  pnlValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  pnlValue: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  pnlPercent: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  positionCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    backgroundColor: COLORS.background.tertiary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
  },
  positionCard: {
    backgroundColor: COLORS.background.card,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  positionSymbol: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  pnlBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.sm,
  },
  pnlBadgeText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  positionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailRow: {
    flex: 1,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.background.card,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginTop: SPACING.sm,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
});
