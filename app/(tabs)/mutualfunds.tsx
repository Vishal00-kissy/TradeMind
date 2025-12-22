import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { MutualFundCard } from '@/components/MutualFundCard';
import { topMutualFunds } from '@/services/mutualFunds';
import { useAlert } from '@/template';

export default function MutualFundsScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const handleInvest = (fundId: string) => {
    showAlert(
      'Start SIP',
      'Enter monthly SIP amount',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '₹500', onPress: () => showAlert('Success', 'SIP started successfully!') },
        { text: '₹1000', onPress: () => showAlert('Success', 'SIP started successfully!') },
      ]
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mutual Funds</Text>
        <TouchableOpacity>
          <Ionicons name="analytics" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.text.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mutual funds..."
          placeholderTextColor={COLORS.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {['ALL', 'Large Cap', 'Mid Cap', 'Small Cap', 'Hybrid', 'Sectoral'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sipBanner}>
          <View style={styles.sipIconContainer}>
            <Ionicons name="repeat" size={32} color={COLORS.accent.primary} />
          </View>
          <View style={styles.sipContent}>
            <Text style={styles.sipTitle}>Start your SIP Journey</Text>
            <Text style={styles.sipSubtitle}>Invest as low as ₹500/month</Text>
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Ionicons name="trending-up" size={20} color={COLORS.profit} />
          <Text style={styles.sectionTitle}>Top Performing Funds</Text>
        </View>
        
        {topMutualFunds.map(fund => (
          <MutualFundCard
            key={fund.id}
            fund={fund}
            onInvest={handleInvest}
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
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  categoryChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.xl,
  },
  categoryChipActive: {
    backgroundColor: COLORS.accent.primary,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.secondary,
  },
  categoryTextActive: {
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  sipBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.card,
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.lg,
  },
  sipIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sipContent: {
    flex: 1,
  },
  sipTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  sipSubtitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
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
