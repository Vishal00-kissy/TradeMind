import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { IPOCard } from '@/components/IPOCard';
import { activeIPOs } from '@/services/ipoService';
import { useAlert } from '@/template';

export default function IPOScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  const [selectedTab, setSelectedTab] = useState<'OPEN' | 'UPCOMING' | 'CLOSED'>('OPEN');
  
  const filteredIPOs = activeIPOs.filter(ipo => ipo.status === selectedTab);
  
  const handleApply = (ipoId: string) => {
    const ipo = activeIPOs.find(i => i.id === ipoId);
    showAlert(
      'Apply for IPO',
      `${ipo?.companyName}\nLot size: ${ipo?.lotSize} shares`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '1 Lot', onPress: () => showAlert('Success', 'IPO application submitted!') },
        { text: '2 Lots', onPress: () => showAlert('Success', 'IPO application submitted!') },
      ]
    );
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>IPO</Text>
        <TouchableOpacity>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'OPEN' && styles.tabActive]}
          onPress={() => setSelectedTab('OPEN')}
        >
          <Text style={[styles.tabText, selectedTab === 'OPEN' && styles.tabTextActive]}>
            Open
          </Text>
          <View style={[styles.badge, { backgroundColor: COLORS.profit }]}>
            <Text style={styles.badgeText}>
              {activeIPOs.filter(i => i.status === 'OPEN').length}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'UPCOMING' && styles.tabActive]}
          onPress={() => setSelectedTab('UPCOMING')}
        >
          <Text style={[styles.tabText, selectedTab === 'UPCOMING' && styles.tabTextActive]}>
            Upcoming
          </Text>
          <View style={[styles.badge, { backgroundColor: COLORS.warning }]}>
            <Text style={styles.badgeText}>
              {activeIPOs.filter(i => i.status === 'UPCOMING').length}
            </Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'CLOSED' && styles.tabActive]}
          onPress={() => setSelectedTab('CLOSED')}
        >
          <Text style={[styles.tabText, selectedTab === 'CLOSED' && styles.tabTextActive]}>
            Closed
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredIPOs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={COLORS.text.tertiary} />
            <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} IPOs</Text>
          </View>
        ) : (
          filteredIPOs.map(ipo => (
            <IPOCard
              key={ipo.id}
              ipo={ipo}
              onApply={handleApply}
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
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
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
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 2,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.text.secondary,
    marginTop: SPACING.lg,
  },
});
