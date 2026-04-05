// ============================================
// FONT CONFIGURATION - Be Vietnam Pro
// ============================================

import { configureFonts } from 'react-native-paper';

// Font family names - must match the font files in assets/fonts
export const FONT_FAMILY = {
  THIN: 'BeVietnamPro-Thin',
  THIN_ITALIC: 'BeVietnamPro-ThinItalic',
  EXTRA_LIGHT: 'BeVietnamPro-ExtraLight',
  EXTRA_LIGHT_ITALIC: 'BeVietnamPro-ExtraLightItalic',
  LIGHT: 'BeVietnamPro-Light',
  LIGHT_ITALIC: 'BeVietnamPro-LightItalic',
  REGULAR: 'BeVietnamPro-Regular',
  ITALIC: 'BeVietnamPro-Italic',
  MEDIUM: 'BeVietnamPro-Medium',
  MEDIUM_ITALIC: 'BeVietnamPro-MediumItalic',
  SEMI_BOLD: 'BeVietnamPro-SemiBold',
  SEMI_BOLD_ITALIC: 'BeVietnamPro-SemiBoldItalic',
  BOLD: 'BeVietnamPro-Bold',
  BOLD_ITALIC: 'BeVietnamPro-BoldItalic',
  EXTRA_BOLD: 'BeVietnamPro-ExtraBold',
  EXTRA_BOLD_ITALIC: 'BeVietnamPro-ExtraBoldItalic',
  BLACK: 'BeVietnamPro-Black',
  BLACK_ITALIC: 'BeVietnamPro-BlackItalic',
} as const;

// Font weights
export const fontWeights = {
  thin: '100' as const,
  extraLight: '200' as const,
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  black: '900' as const,
};

// MD3 Type definition
interface MD3FontStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
  letterSpacing: number;
  lineHeight: number;
}

// MD3 Font configuration with Be Vietnam Pro
export const beVietnamProFontConfig: Record<string, MD3FontStyle> = {
  displayLarge: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: 57,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.25,
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 45,
    fontWeight: fontWeights.semiBold,
    letterSpacing: 0,
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 36,
    fontWeight: fontWeights.medium,
    letterSpacing: 0,
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: 32,
    fontWeight: fontWeights.semiBold,
    letterSpacing: 0,
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 28,
    fontWeight: fontWeights.medium,
    letterSpacing: 0,
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 24,
    fontWeight: fontWeights.medium,
    letterSpacing: 0,
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 22,
    fontWeight: fontWeights.medium,
    letterSpacing: 0,
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 16,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 14,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 14,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 12,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: 11,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 16,
    fontWeight: fontWeights.regular,
    letterSpacing: 0.15,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 14,
    fontWeight: fontWeights.regular,
    letterSpacing: 0.25,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: 12,
    fontWeight: fontWeights.regular,
    letterSpacing: 0.4,
    lineHeight: 16,
  },
};

// Configure fonts for PaperProvider
export const beVietnamProFonts = configureFonts({
  config: beVietnamProFontConfig,
});

// Export font loading helper
export const getFontLoadingConfig = () => ({
  // Map of font names to require statements
  'BeVietnamPro-Thin': require('@assets/fonts/BeVietnamPro-Thin.ttf'),
  'BeVietnamPro-ThinItalic': require('@assets/fonts/BeVietnamPro-ThinItalic.ttf'),
  'BeVietnamPro-ExtraLight': require('@assets/fonts/BeVietnamPro-ExtraLight.ttf'),
  'BeVietnamPro-ExtraLightItalic': require('@assets/fonts/BeVietnamPro-ExtraLightItalic.ttf'),
  'BeVietnamPro-Light': require('@assets/fonts/BeVietnamPro-Light.ttf'),
  'BeVietnamPro-LightItalic': require('@assets/fonts/BeVietnamPro-LightItalic.ttf'),
  'BeVietnamPro-Regular': require('@assets/fonts/BeVietnamPro-Regular.ttf'),
  'BeVietnamPro-Italic': require('@assets/fonts/BeVietnamPro-Italic.ttf'),
  'BeVietnamPro-Medium': require('@assets/fonts/BeVietnamPro-Medium.ttf'),
  'BeVietnamPro-MediumItalic': require('@assets/fonts/BeVietnamPro-MediumItalic.ttf'),
  'BeVietnamPro-SemiBold': require('@assets/fonts/BeVietnamPro-SemiBold.ttf'),
  'BeVietnamPro-SemiBoldItalic': require('@assets/fonts/BeVietnamPro-SemiBoldItalic.ttf'),
  'BeVietnamPro-Bold': require('@assets/fonts/BeVietnamPro-Bold.ttf'),
  'BeVietnamPro-BoldItalic': require('@assets/fonts/BeVietnamPro-BoldItalic.ttf'),
  'BeVietnamPro-ExtraBold': require('@assets/fonts/BeVietnamPro-ExtraBold.ttf'),
  'BeVietnamPro-ExtraBoldItalic': require('@assets/fonts/BeVietnamPro-ExtraBoldItalic.ttf'),
  'BeVietnamPro-Black': require('@assets/fonts/BeVietnamPro-Black.ttf'),
  'BeVietnamPro-BlackItalic': require('@assets/fonts/BeVietnamPro-BlackItalic.ttf'),
});
