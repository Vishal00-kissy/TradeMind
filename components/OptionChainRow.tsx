import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { OptionChainData } from '@/services/optionChain';

interface OptionChainRowProps {
  data: OptionChainData;
  isATM?: boolean;
}

export function OptionChainRow({ data, isATM }: OptionChainRowProps) {
  return (
    <View style={[styles.container, isATM && styles.atmContainer]}>
      {/* Call Side */}
      <View style={styles.optionSide}>
        <Text style={styles.oiChange} numberOfLines={1}>
          {data.callOIChange > 0 ? '+' : ''}{(data.callOIChange / 1000).toFixed(1)}k
        </Text>
        <Text style={styles.oi} numberOfLines={1}>
          {(data.callOI / 1000).toFixed(0)}k
        </Text>
        <Text style={[styles.ltp, { color: COLORS.profit }]} numberOfLines={1}>
          {data.callLTP.toFixed(2)}
        </Text>
        <Text style={styles.iv} numberOfLines={1}>
          {data.callIV.toFixed(1)}%
        </Text>
      </View>
      
      {/* Strike Price */}
      <View style={[styles.strikeContainer, isATM && styles.atmStrike]}>
        <Text style={[styles.strike, isATM && styles.atmStrikeText]}>
          {data.strike}
        </Text>
      </View>
      
      {/* Put Side */}
      <View style={styles.optionSide}>
        <Text style={styles.iv} numberOfLines={1}>
          {data.putIV.toFixed(1)}%
        </Text>
        <Text style={[styles.ltp, { color: COLORS.loss }]} numberOfLines={1}>
          {data.putLTP.toFixed(2)}
        </Text>
        <Text style={styles.oi} numberOfLines={1}>
          {(data.putOI / 1000).toFixed(0)}k
        </Text>
        <Text style={styles.oiChange} numberOfLines={1}>
          {data.putOIChange > 0 ? '+' : ''}{(data.putOIChange / 1000).toFixed(1)}k
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  atmContainer: {
    backgroundColor: COLORS.background.tertiary,
  },
  optionSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  strikeContainer: {
    width: 70,
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  atmStrike: {
    backgroundColor: COLORS.accent.primary,
    borderRadius: SPACING.xs,
  },
  strike: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  atmStrikeText: {
    color: COLORS.text.primary,
  },
  oiChange: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.tertiary,
    flex: 1,
    textAlign: 'center',
  },
  oi: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    flex: 1,
    textAlign: 'center',
  },
  ltp: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.semibold,
    flex: 1,
    textAlign: 'center',
  },
  iv: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.tertiary,
    flex: 1,
    textAlign: 'center',
  },
});
