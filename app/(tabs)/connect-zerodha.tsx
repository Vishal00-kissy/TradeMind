import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';
import { getZerodhaLoginUrl, isAuthenticated } from '@/services/zerodhaAuth';
import { useAlert } from '@/template';

export default function ConnectZerodhaScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    const { data: loginUrl, error } = await getZerodhaLoginUrl();
    setLoading(false);

    if (error || !loginUrl) {
      showAlert('Error', error || 'Failed to get login URL');
      return;
    }

    // Open Zerodha login in browser
    const supported = await Linking.canOpenURL(loginUrl);
    if (supported) {
      await Linking.openURL(loginUrl);
      showAlert(
        'Complete Authentication',
        'After logging in to Zerodha, you will be redirected back to the app. Copy the request token from the URL and paste it in the app.'
      );
    } else {
      showAlert('Error', 'Cannot open Zerodha login page');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Connect Zerodha</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="link" size={64} color={COLORS.accent.primary} />
        </View>

        <Text style={styles.heading}>Connect Your Zerodha Account</Text>
        <Text style={styles.description}>
          Link your Zerodha demat account to access live market data, place real orders, and sync your portfolio.
        </Text>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.profit} />
            <Text style={styles.featureText}>Live market data & option chains</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.profit} />
            <Text style={styles.featureText}>Real-time order placement</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.profit} />
            <Text style={styles.featureText}>Portfolio sync & tracking</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.profit} />
            <Text style={styles.featureText}>AI-powered trade signals</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color={COLORS.accent.primary} />
          <Text style={styles.infoText}>
            Your credentials are securely stored and never shared. We use Zerodha's official Kite Connect API.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.connectButton, loading && styles.connectButtonDisabled]}
          onPress={handleConnect}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.text.primary} />
          ) : (
            <>
              <Ionicons name="log-in" size={20} color={COLORS.text.primary} />
              <Text style={styles.connectButtonText}>Connect Zerodha Account</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={() => router.back()}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  heading: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  features: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  featureText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent.primary + '15',
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  infoText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: SPACING.md,
    gap: SPACING.sm,
    width: '100%',
  },
  connectButtonDisabled: {
    opacity: 0.6,
  },
  connectButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
  },
  skipButton: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  skipButtonText: {
    fontSize: TYPOGRAPHY.sizes.base,
    color: COLORS.text.secondary,
  },
});
