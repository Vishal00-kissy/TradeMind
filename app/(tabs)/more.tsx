import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { walletBalance, recentTransactions } from '@/services/walletService';
import { useAlert } from '@/template';

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const { showAlert } = useAlert();
  
  const menuItems = [
    { icon: 'wallet', title: 'Wallet', subtitle: `₹${walletBalance.available.toLocaleString('en-IN')} available`, onPress: () => showAlert('Wallet', 'View full wallet details') },
    { icon: 'card', title: 'Bank Accounts', subtitle: 'Manage linked accounts', onPress: () => showAlert('Bank Accounts', 'Add or manage bank accounts') },
    { icon: 'document-text', title: 'Demat Account', subtitle: 'View account details', onPress: () => showAlert('Demat Account', 'Your demat account is active') },
    { icon: 'lock-closed', title: 'App Lock', subtitle: 'Biometric & PIN security', onPress: () => showAlert('App Lock', 'Enable biometric authentication?', [{ text: 'Cancel' }, { text: 'Enable', onPress: () => showAlert('Enabled', 'App lock enabled successfully!') }]) },
    { icon: 'person', title: 'Profile', subtitle: 'Personal information', onPress: () => {} },
    { icon: 'receipt', title: 'Tax Reports', subtitle: 'Download P&L, tax statements', onPress: () => {} },
    { icon: 'settings', title: 'Settings', subtitle: 'App preferences', onPress: () => {} },
    { icon: 'help-circle', title: 'Help & Support', subtitle: '24/7 customer support', onPress: () => {} },
  ];
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Portfolio Value</Text>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={20} color={COLORS.text.secondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>₹{walletBalance.currentValue.toLocaleString('en-IN')}</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>Available</Text>
              <Text style={styles.balanceItemValue}>₹{walletBalance.available.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceItemLabel}>On Hold</Text>
              <Text style={styles.balanceItemValue}>₹{walletBalance.onHold.toLocaleString('en-IN')}</Text>
            </View>
          </View>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => showAlert('Add Funds', 'Enter amount to add')}>
              <Ionicons name="add-circle" size={20} color={COLORS.accent.primary} />
              <Text style={styles.actionText}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => showAlert('Withdraw', 'Enter amount to withdraw')}>
              <Ionicons name="arrow-down-circle" size={20} color={COLORS.accent.primary} />
              <Text style={styles.actionText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={24} color={COLORS.accent.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.loss} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  content: {
    padding: SPACING.lg,
  },
  balanceCard: {
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.md,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  balanceLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  balanceAmount: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  balanceRow: {
    flexDirection: 'row',
    gap: SPACING.xl,
    marginBottom: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  balanceItem: {
    flex: 1,
  },
  balanceItemLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  balanceItemValue: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.tertiary,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  actionText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.accent.primary,
  },
  menuSection: {
    backgroundColor: COLORS.background.card,
    borderRadius: SPACING.md,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  menuSubtitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.card,
    paddingVertical: SPACING.lg,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
  },
  logoutText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.loss,
  },
});
