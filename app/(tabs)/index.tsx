import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { MarketHeader } from '@/components/MarketHeader';
import { TradeSignalCard } from '@/components/TradeSignalCard';
import { AnalysisCard } from '@/components/AnalysisCard';
import { useTrading } from '@/hooks/useTrading';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { recommendations, analysis, marketData, loading, fetchRecommendations, executeOrder } = useTrading();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>TradeMind</Text>
          <Text style={styles.tagline}>AI-Powered Trading Signals</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text.primary} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={fetchRecommendations}
            tintColor={COLORS.accent.primary}
          />
        }
      >
        <View style={styles.marketsRow}>
          <View style={styles.marketCard}>
            <MarketHeader
              symbol="NIFTY 50"
              price={marketData.nifty.price}
              change={marketData.nifty.change}
              changePercent={marketData.nifty.changePercent}
            />
          </View>
          <View style={styles.marketCard}>
            <MarketHeader
              symbol="BANKNIFTY"
              price={marketData.banknifty.price}
              change={marketData.banknifty.change}
              changePercent={marketData.banknifty.changePercent}
            />
          </View>
        </View>
        
        {analysis && <AnalysisCard analysis={analysis} />}
        
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="flash" size={20} color={COLORS.accent.primary} />
            <Text style={styles.sectionTitle}>Live Trade Signals</Text>
          </View>
          <TouchableOpacity onPress={fetchRecommendations}>
            <Ionicons name="refresh" size={20} color={COLORS.accent.primary} />
          </TouchableOpacity>
        </View>
        
        {recommendations.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="analytics-outline" size={48} color={COLORS.text.tertiary} />
            <Text style={styles.emptyText}>AI is analyzing market...</Text>
            <Text style={styles.emptySubtext}>New signals will appear here</Text>
          </View>
        ) : (
          recommendations.map(rec => (
            <TradeSignalCard
              key={rec.id}
              recommendation={rec}
              onExecute={executeOrder}
            />
          ))
        )}
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
  appName: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  tagline: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
  notificationButton: {
    position: 'relative',
    padding: SPACING.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.loss,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  marketsRow: {
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  marketCard: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 2,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.secondary,
    marginTop: SPACING.lg,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.tertiary,
    marginTop: SPACING.xs,
  },
});
