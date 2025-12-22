import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { OptionChainRow } from '@/components/OptionChainRow';
import { useOptionChain } from '@/hooks/useOptionChain';

export default function OptionChainScreen() {
  const insets = useSafeAreaInsets();
  const [selectedSymbol, setSelectedSymbol] = useState<'NIFTY' | 'BANKNIFTY'>('NIFTY');
  const atmStrike = selectedSymbol === 'NIFTY' ? 24850 : 51250;
  const { chainData, loading, refresh } = useOptionChain(atmStrike);
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Option Chain</Text>
        <TouchableOpacity onPress={refresh} disabled={loading}>
          <Ionicons 
            name="refresh" 
            size={24} 
            color={loading ? COLORS.text.tertiary : COLORS.accent.primary} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.symbolSelector}>
        <TouchableOpacity
          style={[styles.symbolButton, selectedSymbol === 'NIFTY' && styles.symbolButtonActive]}
          onPress={() => setSelectedSymbol('NIFTY')}
        >
          <Text style={[styles.symbolText, selectedSymbol === 'NIFTY' && styles.symbolTextActive]}>
            NIFTY 50
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.symbolButton, selectedSymbol === 'BANKNIFTY' && styles.symbolButtonActive]}
          onPress={() => setSelectedSymbol('BANKNIFTY')}
        >
          <Text style={[styles.symbolText, selectedSymbol === 'BANKNIFTY' && styles.symbolTextActive]}>
            BANK NIFTY
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.headerRow}>
        <View style={styles.optionHeader}>
          <Text style={styles.headerTitle}>CALLS</Text>
          <View style={styles.headerLabels}>
            <Text style={styles.headerLabel}>OI Chg</Text>
            <Text style={styles.headerLabel}>OI</Text>
            <Text style={styles.headerLabel}>LTP</Text>
            <Text style={styles.headerLabel}>IV</Text>
          </View>
        </View>
        
        <View style={styles.strikeHeader}>
          <Text style={styles.strikeHeaderText}>STRIKE</Text>
        </View>
        
        <View style={styles.optionHeader}>
          <Text style={styles.headerTitle}>PUTS</Text>
          <View style={styles.headerLabels}>
            <Text style={styles.headerLabel}>IV</Text>
            <Text style={styles.headerLabel}>LTP</Text>
            <Text style={styles.headerLabel}>OI</Text>
            <Text style={styles.headerLabel}>OI Chg</Text>
          </View>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {chainData.map((data, index) => (
          <OptionChainRow
            key={data.strike}
            data={data}
            isATM={data.strike === atmStrike}
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
  symbolSelector: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  symbolButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: SPACING.md,
  },
  symbolButtonActive: {
    backgroundColor: COLORS.accent.primary,
  },
  symbolText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.secondary,
  },
  symbolTextActive: {
    color: COLORS.text.primary,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background.secondary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  optionHeader: {
    flex: 1,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  headerLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.tertiary,
    flex: 1,
    textAlign: 'center',
  },
  strikeHeader: {
    width: 70,
    alignItems: 'center',
  },
  strikeHeaderText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  scrollView: {
    flex: 1,
  },
});
