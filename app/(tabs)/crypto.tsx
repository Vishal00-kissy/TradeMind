import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { CryptoCard } from '@/components/CryptoCard';
import { CryptoSignalCard } from '@/components/CryptoSignalCard';
import { topCryptos, cryptoHoldings } from '@/services/cryptoData';
import { getBatchCryptoSignals, type CryptoAISignal } from '@/services/aiCryptoAnalysis';
import { useAlert } from '@/template';

export default function CryptoScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'ALL' | 'GAINERS' | 'LOSERS' | 'HOLDINGS'>('ALL');
  const [aiSignals, setAiSignals] = useState<CryptoAISignal[]>([]);
  const [loadingSignals, setLoadingSignals] = useState(false);
  
  useEffect(() => {
    loadAISignals();
  }, []);
  
  const loadAISignals = async () => {
    setLoadingSignals(true);
    const signals = await getBatchCryptoSignals(topCryptos);
    setAiSignals(signals);
    setLoadingSignals(false);
  };
  
  const getFilteredCryptos = () => {
    let filtered = topCryptos;
    
    if (searchQuery) {
      filtered = filtered.filter(crypto =>
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedTab === 'GAINERS') {
      return [...filtered].filter(c => c.changePercent24h > 0).sort((a, b) => b.changePercent24h - a.changePercent24h);
    } else if (selectedTab === 'LOSERS') {
      return [...filtered].filter(c => c.changePercent24h < 0).sort((a, b) => a.changePercent24h - b.changePercent24h);
    }
    
    return filtered;
  };
  
  const handleCryptoPress = (symbol: string) => {
    const crypto = topCryptos.find(c => c.symbol === symbol);
    showAlert(
      `Trade ${symbol}`,
      `Current Price: ₹${crypto?.price.toLocaleString('en-IN')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Buy', style: 'default', onPress: () => showAlert('Demo Mode', 'Connect crypto exchange API to place live orders') },
        { text: 'Sell', style: 'destructive', onPress: () => showAlert('Demo Mode', 'Connect crypto exchange API to place live orders') },
      ]
    );
  };
  
  const handleAITrade = (symbol: string, signal: 'BUY' | 'SELL') => {
    const crypto = topCryptos.find(c => c.symbol === symbol);
    showAlert(
      `${signal} ${symbol}`,
      `AI recommended ${signal} at ₹${crypto?.price.toLocaleString('en-IN')}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', style: 'default', onPress: () => showAlert('Demo Mode', 'Connect crypto exchange API to place live orders') },
      ]
    );
  };
  
  const totalPortfolioValue = cryptoHoldings.reduce((sum, h) => sum + h.totalValue, 0);
  const totalProfitLoss = cryptoHoldings.reduce((sum, h) => sum + h.profitLoss, 0);
  const totalProfitLossPercent = (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100;
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Cryptocurrency</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.portfolioCard}>
        <View style={styles.portfolioHeader}>
          <Text style={styles.portfolioLabel}>Crypto Portfolio Value</Text>
          <Ionicons name="trending-up" size={20} color={COLORS.profit} />
        </View>
        <Text style={styles.portfolioValue}>₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Text>
        <View style={styles.portfolioStats}>
          <View style={[styles.profitBadge, { backgroundColor: totalProfitLoss >= 0 ? COLORS.profit + '20' : COLORS.loss + '20' }]}>
            <Ionicons
              name={totalProfitLoss >= 0 ? 'arrow-up' : 'arrow-down'}
              size={14}
              color={totalProfitLoss >= 0 ? COLORS.profit : COLORS.loss}
            />
            <Text style={[styles.profitText, { color: totalProfitLoss >= 0 ? COLORS.profit : COLORS.loss }]}>
              ₹{Math.abs(totalProfitLoss).toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({Math.abs(totalProfitLossPercent).toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.text.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search crypto..."
          placeholderTextColor={COLORS.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'ALL' && styles.tabActive]}
          onPress={() => setSelectedTab('ALL')}
        >
          <Text style={[styles.tabText, selectedTab === 'ALL' && styles.tabTextActive]}>
            All Coins
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'GAINERS' && styles.tabActive]}
          onPress={() => setSelectedTab('GAINERS')}
        >
          <Ionicons name="trending-up" size={14} color={selectedTab === 'GAINERS' ? COLORS.text.primary : COLORS.text.secondary} />
          <Text style={[styles.tabText, selectedTab === 'GAINERS' && styles.tabTextActive]}>
            Gainers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'LOSERS' && styles.tabActive]}
          onPress={() => setSelectedTab('LOSERS')}
        >
          <Ionicons name="trending-down" size={14} color={selectedTab === 'LOSERS' ? COLORS.text.primary : COLORS.text.secondary} />
          <Text style={[styles.tabText, selectedTab === 'LOSERS' && styles.tabTextActive]}>
            Losers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'HOLDINGS' && styles.tabActive]}
          onPress={() => setSelectedTab('HOLDINGS')}
        >
          <Text style={[styles.tabText, selectedTab === 'HOLDINGS' && styles.tabTextActive]}>
            Holdings
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === 'HOLDINGS' ? (
          <>
            <View style={styles.sectionHeader}>
              <Ionicons name="wallet" size={20} color={COLORS.accent.primary} />
              <Text style={styles.sectionTitle}>Your Holdings</Text>
            </View>
            
            {loadingSignals ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.accent.primary} />
                <Text style={styles.loadingText}>Loading AI signals...</Text>
              </View>
            ) : aiSignals.length > 0 ? (
              <>
                <View style={styles.aiHeader}>
                  <Ionicons name="sparkles" size={20} color={COLORS.accent.primary} />
                  <Text style={styles.aiHeaderText}>AI Trading Signals</Text>
                  <TouchableOpacity onPress={loadAISignals} style={styles.refreshButton}>
                    <Ionicons name="refresh" size={16} color={COLORS.accent.primary} />
                  </TouchableOpacity>
                </View>
                {aiSignals.map(signal => {
                  const crypto = topCryptos.find(c => c.symbol === signal.symbol);
                  if (!crypto) return null;
                  return (
                    <CryptoSignalCard
                      key={signal.symbol}
                      signal={signal}
                      currentPrice={crypto.price}
                      onTrade={handleAITrade}
                    />
                  );
                })}
              </>
            ) : null}
            
            {cryptoHoldings.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="wallet-outline" size={64} color={COLORS.text.tertiary} />
                <Text style={styles.emptyText}>No crypto holdings yet</Text>
                <Text style={styles.emptySubtext}>Start investing in crypto today!</Text>
              </View>
            ) : (
              cryptoHoldings.map(holding => {
                const crypto = topCryptos.find(c => c.symbol === holding.symbol);
                if (!crypto) return null;
                return (
                  <View key={holding.symbol} style={styles.holdingCard}>
                    <View style={styles.holdingHeader}>
                      <View style={styles.holdingInfo}>
                        <Text style={styles.holdingSymbol}>{holding.symbol}</Text>
                        <Text style={styles.holdingName}>{holding.name}</Text>
                      </View>
                      <View style={styles.holdingValue}>
                        <Text style={styles.holdingAmount}>₹{holding.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Text>
                        <Text style={[styles.holdingPL, { color: holding.profitLoss >= 0 ? COLORS.profit : COLORS.loss }]}>
                          {holding.profitLoss >= 0 ? '+' : ''}₹{holding.profitLoss.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({holding.profitLossPercent.toFixed(2)}%)
                        </Text>
                      </View>
                    </View>
                    <View style={styles.holdingStats}>
                      <Text style={styles.holdingStat}>Qty: {holding.quantity} {holding.symbol}</Text>
                      <Text style={styles.holdingStat}>Avg: ₹{holding.avgBuyPrice.toLocaleString('en-IN')}</Text>
                      <Text style={styles.holdingStat}>LTP: ₹{holding.currentPrice.toLocaleString('en-IN')}</Text>
                    </View>
                  </View>
                );
              })
            )}
          </>
        ) : (
          <>
            {loadingSignals ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.accent.primary} />
                <Text style={styles.loadingText}>Getting AI insights...</Text>
              </View>
            ) : aiSignals.length > 0 ? (
              <>
                <View style={styles.aiHeader}>
                  <Ionicons name="sparkles" size={20} color={COLORS.accent.primary} />
                  <Text style={styles.aiHeaderText}>AI Profit Signals</Text>
                  <TouchableOpacity onPress={loadAISignals} style={styles.refreshButton}>
                    <Ionicons name="refresh" size={16} color={COLORS.accent.primary} />
                  </TouchableOpacity>
                </View>
                {aiSignals.map(signal => {
                  const crypto = topCryptos.find(c => c.symbol === signal.symbol);
                  if (!crypto) return null;
                  return (
                    <CryptoSignalCard
                      key={signal.symbol}
                      signal={signal}
                      currentPrice={crypto.price}
                      onTrade={handleAITrade}
                    />
                  );
                })}
              </>
            ) : null}
            
            <View style={styles.sectionHeader}>
              <Ionicons name="flame" size={20} color={COLORS.loss} />
              <Text style={styles.sectionTitle}>
                {selectedTab === 'GAINERS' ? 'Top Gainers' : selectedTab === 'LOSERS' ? 'Top Losers' : 'All Cryptocurrencies'}
              </Text>
            </View>
            
            {getFilteredCryptos().map(crypto => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                onPress={handleCryptoPress}
              />
            ))}
          </>
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
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  portfolioCard: {
    backgroundColor: COLORS.background.card,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  portfolioLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  portfolioValue: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  portfolioStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: SPACING.md,
    gap: SPACING.xs,
  },
  profitText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    gap: SPACING.md,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.md,
    gap: SPACING.xs,
  },
  tabActive: {
    backgroundColor: COLORS.accent.primary,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.secondary,
  },
  tabTextActive: {
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
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
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.secondary,
    marginTop: SPACING.lg,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.tertiary,
    marginTop: SPACING.sm,
  },
  holdingCard: {
    backgroundColor: COLORS.background.card,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    marginBottom: SPACING.md,
  },
  holdingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  holdingInfo: {
    flex: 1,
  },
  holdingSymbol: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  holdingName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  holdingValue: {
    alignItems: 'flex-end',
  },
  holdingAmount: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  holdingPL: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  holdingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  holdingStat: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
    gap: SPACING.md,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  aiHeaderText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  refreshButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.md,
  },
});
