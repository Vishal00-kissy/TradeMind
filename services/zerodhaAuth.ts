import { getSupabaseClient } from '@/template';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'zerodha_access_token';

export async function getZerodhaLoginUrl(): Promise<{ data: string | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.functions.invoke('zerodha-login', {
      body: {},
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: data.loginUrl, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to get login URL' };
  }
}

export async function authenticateWithRequestToken(
  requestToken: string
): Promise<{ data: any | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.functions.invoke('zerodha-login', {
      body: { requestToken },
    });

    if (error) {
      return { data: null, error: error.message };
    }

    if (data.accessToken) {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    }

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Authentication failed' };
  }
}

export async function getAccessToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function clearAccessToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (err) {
    console.error('Failed to clear access token:', err);
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAccessToken();
  return token !== null;
}
