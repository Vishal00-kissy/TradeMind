import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { StockCard } from '@/components/StockCard';
import { trendingStocks } from '@/services/stockData';
import { useAlert } from '@/template';

export default function StocksScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'ALL' | 'INTRADAY' | 'SWING'>('ALL');
  
  const filteredStocks = trendingStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStockPress = (symbol: string) => {
    showAlert(
      'Order Type',
      `Select order type for ${symbol}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Intraday', onPress: () => showAlert('Demo Mode', 'Connect Zerodha API to place live orders') },
        { text: 'Delivery', onPress: () => showAlert('Demo Mode', 'Connect Zerodha API to place live orders') },
      ]
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Stocks</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.text.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search stocks..."
          placeholderTextColor={COLORS.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'ALL' && styles.tabActive]}
          onPress={() => setSelectedTab('ALL')}
        >
          <Text style={[styles.tabText, selectedTab === 'ALL' && styles.tabTextActive]}>
            All Stocks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'INTRADAY' && styles.tabActive]}
          onPress={() => setSelectedTab('INTRADAY')}
        >
          <Text style={[styles.tabText, selectedTab === 'INTRADAY' && styles.tabTextActive]}>
            Intraday
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'SWING' && styles.tabActive]}
          onPress={() => setSelectedTab('SWING')}
        >
          <Text style={[styles.tabText, selectedTab === 'SWING' && styles.tabTextActive]}>
            Swing
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Ionicons name="flame" size={20} color={COLORS.loss} />
          <Text style={styles.sectionTitle}>Trending Today</Text>
        </View>
        
        {filteredStocks.map(stock => (
          <StockCard
            key={stock.symbol}
            stock={stock}
            onPress={handleStockPress}
          />
        ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.card,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
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
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.md,
  },
  tabActive: {
    backgroundColor: COLORS.accent.primary,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.sm,
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
});
