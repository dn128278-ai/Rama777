import JSZip from 'jszip';
import { ANDROID_FILES } from '../data/androidProjectFiles';

export async function downloadAndroidStudioZip(): Promise<void> {
  const zip = new JSZip();

  // Root files
  zip.file(
    'settings.gradle.kts',
    `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "RAMA77"
include(":app")`
  );

  zip.file(
    'build.gradle.kts',
    `// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}`
  );

  zip.file(
    'gradle/libs.versions.toml',
    `[versions]
agp = "8.4.1"
kotlin = "1.9.24"
coreKtx = "1.13.1"
junit = "4.13.2"
appcompat = "1.7.0"
material = "1.12.0"
constraintlayout = "2.1.4"
biometric = "1.2.0-alpha05"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-appcompat = { group = "androidx.appcompat", name = "appcompat", version.ref = "appcompat" }
material = { group = "com.google.android.material", name = "material", version.ref = "material" }
androidx-constraintlayout = { group = "androidx.constraintlayout", name = "constraintlayout", version.ref = "constraintlayout" }
androidx-biometric = { group = "androidx.biometric", name = "biometric", version.ref = "biometric" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }`
  );

  zip.file(
    'README.md',
    `# RAMA77 - Android Studio Project

This is the complete Android Studio project for RAMA77, reverse-engineered and built based on the UI/UX video recording.

## Features Included:
- **New User Registration Flow**: Mobile number, secure Password, optional Promo Code (RAMA100)
- **4-Digit MPIN Setup & Biometric Fingerprint Confirmation**
- **MPIN Authentication & Biometric Fingerprint Login**
- **Home Market Dashboard** with countdowns, status tags ("Closed for Today", "Running for Close/Open"), Call/WhatsApp support buttons
- **Bombay Starline & Bombay Jackpot** sections
- **History View** (Game Bid, Starline Bid, Jackpot Bid, Game Result, Starline Result, Jackpot Result)
- **Passbook** (Detailed debit/credit transaction records, balance history, pagination)
- **Funds Management** (Add Funds, Withdraw with Terms Modal, Add Bank Details, UPI Sheet simulator)
- **Support Chat** with issue categories (Deposit, Withdraw, Other)
- **Interactive Navigation Drawer** with Girish Meena profile, Charts, Change MPIN, Game Rates, Settings, Dark Mode toggle
- **Matka Charts & Weekly Jodi / Panel Tables** (Date, Mon-Sun grid, Go To Top / Bottom buttons)

## How to Build in Android Studio:
1. Extract this ZIP file.
2. Open Android Studio (Hedgehog, Iguana, Ladybug or Meerkat).
3. Select **File -> Open** and choose the extracted \`RAMA77\` folder.
4. Allow Gradle Sync to finish (uses Java 17).
5. Connect your Android device or start an emulator.
6. Click **Run 'app'** or **Build -> Build Bundle(s) / APK(s) -> Build APK(s)** to generate the APK!
`
  );

  // Add all files from ANDROID_FILES
  for (const file of ANDROID_FILES) {
    zip.file(file.path, file.content);
  }

  // Generate blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'RAMA77_AndroidStudio_Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
