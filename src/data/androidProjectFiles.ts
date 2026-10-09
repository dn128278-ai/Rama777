import { AndroidFile } from '../types';

export const ANDROID_FILES: AndroidFile[] = [
  // 1. AndroidManifest.xml
  {
    path: 'app/src/main/AndroidManifest.xml',
    category: 'manifest',
    language: 'xml',
    description: 'Android Application Manifest with Permissions and Activities',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.rama77.app">

    <!-- Permissions required by RAMA77 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.USE_BIOMETRIC" />
    <uses-permission android:name="android.permission.USE_FINGERPRINT" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.RAMA77.Fullscreen"
        android:usesCleartextTraffic="true"
        tools:targetApi="34">

        <!-- MPIN Login is the Launcher Activity (Fullscreen / NoActionBar) -->
        <activity
            android:name=".ui.login.LoginActivity"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- New User Registration Activity -->
        <activity
            android:name=".ui.register.RegisterActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <!-- Main Dashboard Activity with Drawer & Bottom Nav -->
        <activity
            android:name=".MainActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <!-- Sub Activities -->
        <activity
            android:name=".ui.charts.ChartsActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.charts.ChartDetailActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.rates.GameRatesActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.mpin.ChangeMpinActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.settings.SettingsActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.funds.AddFundsActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.funds.WithdrawFundsActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

        <activity
            android:name=".ui.history.HistoryDetailActivity"
            android:exported="false"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.RAMA77.Fullscreen" />

    </application>
</manifest>`,
  },

  // 2. build.gradle.kts (App Level)
  {
    path: 'app/build.gradle.kts',
    category: 'gradle',
    language: 'groovy',
    description: 'App-level build.gradle.kts with ViewBinding and dependencies',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    id("kotlin-parcelize")
}

android {
    namespace = "com.rama77.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.rama77.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 2
        versionName = "2.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("androidx.navigation:navigation-fragment-ktx:2.7.7")
    implementation("androidx.navigation:navigation-ui-ktx:2.7.7")
    
    // Biometric Login Prompt
    implementation("androidx.biometric:biometric:1.2.0-alpha05")
    
    // Lifecycle & Coroutines
    implementation("androidx.lifecycle:lifecycle-viewmodel-ktx:2.8.4")
    implementation("androidx.lifecycle:lifecycle-livedata-ktx:2.8.4")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")

    // CardView & RecyclerView
    implementation("androidx.cardview:cardview:1.0.0")
    implementation("androidx.recyclerview:recyclerview:1.3.2")
}`,
  },

  // 3. colors.xml
  {
    path: 'app/src/main/res/values/colors.xml',
    category: 'values',
    language: 'xml',
    description: 'RAMA77 Theme Color Palette',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_orange">#F16521</color>
    <color name="primary_orange_dark">#D84B06</color>
    <color name="primary_orange_light">#FFF3ED</color>
    <color name="amber_gradient_start">#FF7A00</color>
    <color name="amber_gradient_end">#D84B06</color>

    <color name="background_light">#F8F9FA</color>
    <color name="surface_card">#FFFFFF</color>
    <color name="border_card">#E5E7EB</color>

    <!-- Text Colors -->
    <color name="text_primary">#1F2937</color>
    <color name="text_secondary">#6B7280</color>
    <color name="text_muted">#9CA3AF</color>

    <!-- Status Badges -->
    <color name="status_closed">#DC2626</color>
    <color name="status_closed_bg">#FEE2E2</color>
    <color name="status_running">#16A34A</color>
    <color name="status_running_bg">#DCFCE7</color>
    <color name="status_pending">#F59E0B</color>

    <!-- Passbook / Accent -->
    <color name="table_header_bg">#F16521</color>
    <color name="green_amount">#16A34A</color>
</resources>`,
  },

  // 4. strings.xml
  {
    path: 'app/src/main/res/values/strings.xml',
    category: 'values',
    language: 'xml',
    description: 'String resources for RAMA77 app',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">RAMA77</string>
    <string name="mpin_login_title">MPIN Login</string>
    <string name="enter_mpin_prompt">Please enter your 4-digit MPIN to\\nlogin your account</string>
    <string name="forgot_mpin">Forgot MPIN?</string>
    <string name="login_button">Login</string>
    <string name="min_deposit_limit">Current minimum deposit limit Rs. 300</string>
    <string name="call_now">Call Now</string>
    <string name="whatsapp">Whatsapp</string>
    <string name="bombay_starline">Bombay Starline</string>
    <string name="bombay_jackpot">Bombay Jackpot</string>
    
    <string name="nav_home">Home</string>
    <string name="nav_history">History</string>
    <string name="nav_passbook">Passbook</string>
    <string name="nav_funds">Funds</string>
    <string name="nav_support">Support</string>

    <string name="user_name">Girish Meena</string>
    <string name="user_phone">6377972674</string>
    <string name="wallet_default">₹0</string>
    <string name="app_version">App Version: 2</string>

    <!-- Registration Strings -->
    <string name="new_registration">New Registration</string>
    <string name="register_now">Register Now</string>
    <string name="dont_have_account">Don\'t have an account?</string>
    <string name="already_have_account">Already have an account? Login</string>
    <string name="mobile_number">Mobile Number</string>
    <string name="password">Password</string>
    <string name="promo_code">Promo Code (Optional)</string>
    <string name="continue_setup_mpin">Continue to Setup MPIN</string>
    <string name="setup_mpin_title">Set Up 4-Digit MPIN</string>
    <string name="enter_new_mpin">Enter New 4-Digit MPIN</string>
    <string name="confirm_mpin">Confirm 4-Digit MPIN</string>
    <string name="enable_fingerprint">Enable Fingerprint Login</string>
    <string name="complete_registration">Complete Registration</string>
    <string name="welcome_bonus_registered">Welcome Bonus ₹100 unlocked!</string>
</resources>`,
  },

  // 5. themes.xml
  {
    path: 'app/src/main/res/values/themes.xml',
    category: 'values',
    language: 'xml',
    description: 'RAMA77 Fullscreen and NoActionBar Theme Styles',
    content: `<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base Material Application Theme -->
    <style name="Theme.RAMA77" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <item name="colorPrimary">@color/primary_orange</item>
        <item name="colorPrimaryVariant">@color/primary_orange_dark</item>
        <item name="colorOnPrimary">#FFFFFF</item>
        <item name="colorSecondary">@color/primary_orange</item>
        <item name="android:statusBarColor">@color/primary_orange</item>
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>

    <!-- Professional Fullscreen Theme: Hides Status Bar & Action Bar -->
    <style name="Theme.RAMA77.Fullscreen" parent="Theme.RAMA77">
        <item name="android:windowFullscreen">true</item>
        <item name="android:windowContentOverlay">@null</item>
        <item name="android:windowNoTitle">true</item>
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>

    <!-- NoActionBar Theme -->
    <style name="Theme.RAMA77.NoActionBar" parent="Theme.RAMA77">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:windowFullscreen">true</item>
    </style>
</resources>`,
  },

  // 6. activity_login.xml
  {
    path: 'app/src/main/res/layout/activity_login.xml',
    category: 'layout',
    language: 'xml',
    description: 'MPIN Login Screen with 4-box OTP and Biometrics (Video 00:00 - 00:07)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED"
    android:padding="24dp">

    <!-- Top Logo Lockup -->
    <LinearLayout
        android:id="@+id/layoutLogo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:layout_width="44dp"
            android:layout_height="44dp"
            android:background="@drawable/bg_logo_icon"
            android:gravity="center"
            android:text="R"
            android:textColor="#FFFFFF"
            android:textSize="26sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:text="RAMA77"
            android:textColor="#F16521"
            android:textSize="28sp"
            android:textStyle="bold" />
    </LinearLayout>

    <TextView
        android:id="@+id/tvMpinSubtitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="6dp"
        android:text="@string/mpin_login_title"
        android:textColor="#1F2937"
        android:textSize="17sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/layoutLogo" />

    <!-- Instruction Text -->
    <TextView
        android:id="@+id/tvInstruction"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="48dp"
        android:gravity="center"
        android:text="@string/enter_mpin_prompt"
        android:textColor="#374151"
        android:textSize="15sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tvMpinSubtitle" />

    <!-- 4-Digit MPIN Pin Boxes -->
    <LinearLayout
        android:id="@+id/layoutMpinBoxes"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tvInstruction">

        <EditText
            android:id="@+id/etPin1"
            style="@style/MpinBoxStyle"
            android:inputType="numberPassword"
            android:maxLength="1" />

        <EditText
            android:id="@+id/etPin2"
            style="@style/MpinBoxStyle"
            android:layout_marginStart="12dp"
            android:inputType="numberPassword"
            android:maxLength="1" />

        <EditText
            android:id="@+id/etPin3"
            style="@style/MpinBoxStyle"
            android:layout_marginStart="12dp"
            android:inputType="numberPassword"
            android:maxLength="1" />

        <EditText
            android:id="@+id/etPin4"
            style="@style/MpinBoxStyle"
            android:layout_marginStart="12dp"
            android:inputType="numberPassword"
            android:maxLength="1" />
    </LinearLayout>

    <TextView
        android:id="@+id/tvForgotMpin"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="@string/forgot_mpin"
        android:textColor="#F16521"
        android:textSize="14sp"
        android:textStyle="bold"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/layoutMpinBoxes" />

    <!-- Login Button with Progress Indicator -->
    <FrameLayout
        android:id="@+id/btnLoginContainer"
        android:layout_width="0dp"
        android:layout_height="52dp"
        android:layout_marginTop="24dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tvForgotMpin">

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/btnLogin"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="@drawable/bg_orange_gradient_button"
            android:text="@string/login_button"
            android:textAllCaps="false"
            android:textColor="#FFFFFF"
            android:textSize="16sp"
            android:textStyle="bold" />

        <ProgressBar
            android:id="@+id/pbLoginLoading"
            android:layout_width="28dp"
            android:layout_height="28dp"
            android:layout_gravity="center"
            android:indeterminateTint="#FFFFFF"
            android:visibility="gone" />
    </FrameLayout>

    <!-- New Registration Option Link -->
    <LinearLayout
        android:id="@+id/layoutRegisterPrompt"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/btnLoginContainer">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/dont_have_account"
            android:textColor="#4B5563"
            android:textSize="13sp" />

        <TextView
            android:id="@+id/tvRegisterNow"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="6dp"
            android:clickable="true"
            android:focusable="true"
            android:text="@string/register_now"
            android:textColor="#F16521"
            android:textSize="13sp"
            android:textStyle="bold" />
    </LinearLayout>

    <!-- Fingerprint Biometric Action -->
    <ImageView
        android:id="@+id/ivFingerprint"
        android:layout_width="72dp"
        android:layout_height="72dp"
        android:layout_marginBottom="48dp"
        android:clickable="true"
        android:contentDescription="Biometric Login"
        android:focusable="true"
        android:src="@drawable/ic_fingerprint_line"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`,
  },

  // 6. activity_main.xml
  {
    path: 'app/src/main/res/layout/activity_main.xml',
    category: 'layout',
    language: 'xml',
    description: 'Main App Layout with DrawerLayout, Toolbar, Fragment Frame and BottomNav',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.drawerlayout.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/drawerLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- Main Content Area -->
    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="#F3F4F6">

        <!-- Top App Bar with Logo, Wallet and Notification Bell -->
        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/topAppBar"
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:background="#FFFFFF"
            android:elevation="2dp"
            app:layout_constraintTop_toTopOf="parent">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:gravity="center_vertical"
                android:orientation="horizontal"
                android:paddingEnd="16dp">

                <!-- Hamburger Drawer Toggle -->
                <ImageView
                    android:id="@+id/btnMenuDrawer"
                    android:layout_width="32dp"
                    android:layout_height="32dp"
                    android:contentDescription="Menu"
                    android:src="@drawable/ic_menu" />

                <!-- Logo in Toolbar -->
                <LinearLayout
                    android:layout_width="0dp"
                    android:layout_height="wrap_content"
                    android:layout_marginStart="12dp"
                    android:layout_weight="1"
                    android:gravity="center_vertical">

                    <TextView
                        android:layout_width="26dp"
                        android:layout_height="26dp"
                        android:background="@drawable/bg_logo_icon"
                        android:gravity="center"
                        android:text="R"
                        android:textColor="#FFFFFF"
                        android:textSize="16sp"
                        android:textStyle="bold" />

                    <TextView
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="6dp"
                        android:text="RAMA77"
                        android:textColor="#F16521"
                        android:textSize="20sp"
                        android:textStyle="bold" />
                </LinearLayout>

                <!-- Wallet Chip -->
                <LinearLayout
                    android:id="@+id/btnWalletChip"
                    android:layout_width="wrap_content"
                    android:layout_height="32dp"
                    android:background="@drawable/bg_wallet_pill"
                    android:gravity="center"
                    android:paddingHorizontal="10dp">

                    <ImageView
                        android:layout_width="16dp"
                        android:layout_height="16dp"
                        android:src="@drawable/ic_wallet"
                        app:tint="#4B5563" />

                    <TextView
                        android:id="@+id/tvToolbarBalance"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="4dp"
                        android:text="₹0"
                        android:textColor="#1F2937"
                        android:textSize="14sp"
                        android:textStyle="bold" />
                </LinearLayout>

                <!-- Bell Icon -->
                <ImageView
                    android:id="@+id/btnNotificationBell"
                    android:layout_width="24dp"
                    android:layout_height="24dp"
                    android:layout_marginStart="12dp"
                    android:contentDescription="Notifications"
                    android:src="@drawable/ic_bell" />
            </LinearLayout>
        </com.google.android.material.appbar.MaterialToolbar>

        <!-- Fragment Host Container -->
        <FrameLayout
            android:id="@+id/fragmentContainer"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            app:layout_constraintBottom_toTopOf="@id/bottomNav"
            app:layout_constraintTop_toBottomOf="@id/topAppBar" />

        <!-- 5-Item Bottom Navigation Bar -->
        <com.google.android.material.bottomnavigation.BottomNavigationView
            android:id="@+id/bottomNav"
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:background="#FFFFFF"
            app:elevation="8dp"
            app:itemIconTint="@color/selector_nav_color"
            app:itemTextColor="@color/selector_nav_color"
            app:labelVisibilityMode="labeled"
            app:layout_constraintBottom_toBottomOf="parent"
            app:menu="@menu/bottom_nav_menu" />

    </androidx.constraintlayout.widget.ConstraintLayout>

    <!-- Side Navigation Drawer -->
    <com.google.android.material.navigation.NavigationView
        android:id="@+id/navigationView"
        android:layout_width="300dp"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:background="#FFFFFF"
        app:headerLayout="@layout/nav_header_main"
        app:menu="@menu/drawer_nav_menu" />

</androidx.drawerlayout.widget.DrawerLayout>`,
  },

  // 7. nav_header_main.xml
  {
    path: 'app/src/main/res/layout/nav_header_main.xml',
    category: 'layout',
    language: 'xml',
    description: 'Drawer Header with Orange Gradient and Girish Meena profile',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="140dp"
    android:background="@drawable/bg_orange_gradient_drawer"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:padding="20dp">

    <!-- Avatar Circle -->
    <ImageView
        android:layout_width="60dp"
        android:layout_height="60dp"
        android:background="@drawable/bg_avatar_circle"
        android:padding="12dp"
        android:src="@drawable/ic_user"
        android:contentDescription="Avatar" />

    <!-- Name and Phone -->
    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:orientation="vertical">

        <TextView
            android:id="@+id/tvDrawerUserName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Girish Meena"
            android:textColor="#FFFFFF"
            android:textSize="18sp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tvDrawerUserPhone"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="2dp"
            android:text="6377972674"
            android:textColor="#FFF3ED"
            android:textSize="14sp" />
    </LinearLayout>
</LinearLayout>`,
  },

  // 8. fragment_home.xml
  {
    path: 'app/src/main/res/layout/fragment_home.xml',
    category: 'layout',
    language: 'xml',
    description: 'Home Screen with Ticker, Action buttons, Category tabs, and Markets RecyclerView',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:paddingBottom="24dp">

        <!-- Running Ticker Limit Banner -->
        <TextView
            android:id="@+id/tvDepositBanner"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="#FFEADB"
            android:ellipsize="marquee"
            android:focusable="true"
            android:gravity="center"
            android:marqueeRepeatLimit="marquee_forever"
            android:paddingVertical="8dp"
            android:singleLine="true"
            android:text="@string/min_deposit_limit"
            android:textColor="#C2410C"
            android:textSize="14sp"
            android:textStyle="italic" />

        <!-- Call Now and Whatsapp Quick Action Buttons -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginHorizontal="16dp"
            android:layout_marginTop="12dp"
            android:orientation="horizontal">

            <androidx.appcompat.widget.AppCompatButton
                android:id="@+id/btnCallNow"
                android:layout_width="0dp"
                android:layout_height="44dp"
                android:layout_marginEnd="6dp"
                android:layout_weight="1"
                android:background="@drawable/bg_white_rounded_card"
                android:drawableStart="@drawable/ic_call_orange"
                android:paddingHorizontal="16dp"
                android:text="@string/call_now"
                android:textAllCaps="false"
                android:textColor="#374151"
                android:textStyle="bold" />

            <androidx.appcompat.widget.AppCompatButton
                android:id="@+id/btnWhatsapp"
                android:layout_width="0dp"
                android:layout_height="44dp"
                android:layout_marginStart="6dp"
                android:layout_weight="1"
                android:background="@drawable/bg_white_rounded_card"
                android:drawableStart="@drawable/ic_whatsapp_green"
                android:paddingHorizontal="16dp"
                android:text="@string/whatsapp"
                android:textAllCaps="false"
                android:textColor="#374151"
                android:textStyle="bold" />
        </LinearLayout>

        <!-- Category Tabs: Bombay Starline & Bombay Jackpot -->
        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginHorizontal="16dp"
            android:layout_marginTop="12dp"
            android:orientation="horizontal">

            <androidx.appcompat.widget.AppCompatButton
                android:id="@+id/btnBombayStarline"
                android:layout_width="0dp"
                android:layout_height="44dp"
                android:layout_marginEnd="6dp"
                android:layout_weight="1"
                android:background="@drawable/bg_category_tab_selected"
                android:text="@string/bombay_starline"
                android:textAllCaps="false"
                android:textColor="#FFFFFF"
                android:textStyle="bold" />

            <androidx.appcompat.widget.AppCompatButton
                android:id="@+id/btnBombayJackpot"
                android:layout_width="0dp"
                android:layout_height="44dp"
                android:layout_marginStart="6dp"
                android:layout_weight="1"
                android:background="@drawable/bg_category_tab_selected"
                android:text="@string/bombay_jackpot"
                android:textAllCaps="false"
                android:textColor="#FFFFFF"
                android:textStyle="bold" />
        </LinearLayout>

        <!-- Markets List -->
        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rvMarkets"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginHorizontal="16dp"
            android:layout_marginTop="12dp"
            android:nestedScrollingEnabled="false" />

    </LinearLayout>
</androidx.core.widget.NestedScrollView>`,
  },

  // 9. item_market_card.xml
  {
    path: 'app/src/main/res/layout/item_market_card.xml',
    category: 'layout',
    language: 'xml',
    description: 'Market Card (e.g., DEVI MORNING, 268-60-145, Closed for Today, Play button)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="12dp"
    app:cardCornerRadius="16dp"
    app:cardElevation="2dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="16dp">

        <!-- Market Name -->
        <TextView
            android:id="@+id/tvMarketName"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="DEVI MORNING"
            android:textColor="#F16521"
            android:textSize="17sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <!-- Info Icon -->
        <ImageView
            android:id="@+id/ivMarketInfo"
            android:layout_width="18dp"
            android:layout_height="18dp"
            android:layout_marginStart="6dp"
            android:contentDescription="Market Info"
            android:src="@drawable/ic_info_circle_orange"
            app:layout_constraintBottom_toBottomOf="@id/tvMarketName"
            app:layout_constraintStart_toEndOf="@id/tvMarketName"
            app:layout_constraintTop_toTopOf="@id/tvMarketName" />

        <!-- Pana Result Numbers: e.g. 268-60-145 -->
        <TextView
            android:id="@+id/tvMarketResult"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:fontFamily="sans-serif-medium"
            android:text="268-60-145"
            android:textColor="#1F2937"
            android:textSize="16sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tvMarketName" />

        <!-- Open and Close Bid Timing -->
        <TextView
            android:id="@+id/tvOpenTime"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:text="Open Bids: 08:55 AM"
            android:textColor="#6B7280"
            android:textSize="12sp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tvMarketResult" />

        <TextView
            android:id="@+id/tvCloseTime"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="2dp"
            android:text="Close Bids: 09:55 AM"
            android:textColor="#6B7280"
            android:textSize="12sp"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tvOpenTime" />

        <!-- Play Button -->
        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/btnPlayMarket"
            android:layout_width="110dp"
            android:layout_height="38dp"
            android:background="@drawable/bg_play_button"
            android:drawableStart="@drawable/ic_play_arrow"
            android:paddingHorizontal="20dp"
            android:text="Play"
            android:textAllCaps="false"
            android:textColor="#FFFFFF"
            android:textSize="15sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <!-- Status Tag (Closed for Today / Running for Open / Running for Close) -->
        <TextView
            android:id="@+id/tvMarketStatus"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:text="Closed for Today"
            android:textColor="#DC2626"
            android:textSize="13sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toBottomOf="@id/btnPlayMarket" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.cardview.widget.CardView>`,
  },

  // 10. fragment_passbook.xml
  {
    path: 'app/src/main/res/layout/fragment_passbook.xml',
    category: 'layout',
    language: 'xml',
    description: 'Passbook with Table Header, Transaction History Cards, and Pagination Bar (Video 00:26)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED">

    <!-- Table Header Row (Orange Bar) -->
    <LinearLayout
        android:id="@+id/layoutTableHeader"
        android:layout_width="match_parent"
        android:layout_height="44dp"
        android:background="#F16521"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingHorizontal="16dp"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1.6"
            android:text="Description"
            android:textColor="#FFFFFF"
            android:textSize="14sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1.4"
            android:gravity="center"
            android:text="Transaction Amount"
            android:textColor="#FFFFFF"
            android:textSize="14sp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="end"
            android:text="Balance"
            android:textColor="#FFFFFF"
            android:textSize="14sp"
            android:textStyle="bold" />
    </LinearLayout>

    <!-- Transactions List -->
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvPassbook"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:padding="12dp"
        app:layout_constraintBottom_toTopOf="@id/layoutPagination"
        app:layout_constraintTop_toBottomOf="@id/layoutTableHeader" />

    <!-- Pagination Controls -->
    <LinearLayout
        android:id="@+id/layoutPagination"
        android:layout_width="match_parent"
        android:layout_height="52dp"
        android:background="#FFFFFF"
        android:gravity="center"
        android:orientation="horizontal"
        android:paddingHorizontal="16dp"
        app:layout_constraintBottom_toBottomOf="parent">

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/btnPrevPage"
            android:layout_width="wrap_content"
            android:layout_height="36dp"
            android:background="@drawable/bg_page_inactive"
            android:paddingHorizontal="16dp"
            android:text="Previous"
            android:textAllCaps="false"
            android:textColor="#374151" />

        <TextView
            android:id="@+id/tvCurrentPage"
            android:layout_width="36dp"
            android:layout_height="36dp"
            android:layout_marginHorizontal="16dp"
            android:background="@drawable/bg_page_active_orange"
            android:gravity="center"
            android:text="1"
            android:textColor="#FFFFFF"
            android:textStyle="bold" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/btnNextPage"
            android:layout_width="wrap_content"
            android:layout_height="36dp"
            android:background="@drawable/bg_page_inactive"
            android:paddingHorizontal="16dp"
            android:text="Next"
            android:textAllCaps="false"
            android:textColor="#374151" />
    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>`,
  },

  // 11. item_passbook_transaction.xml
  {
    path: 'app/src/main/res/layout/item_passbook_transaction.xml',
    category: 'layout',
    language: 'xml',
    description: 'Passbook Transaction Row Card (Failed/Pending ₹300, Date, Previous Balance)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="10dp"
    app:cardCornerRadius="12dp"
    app:cardElevation="1dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="12dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center_vertical"
            android:orientation="horizontal">

            <!-- Title: e.g. Add Fund FAILED | ₹300 | bud-ee2ade9ebc2a -->
            <TextView
                android:id="@+id/tvTxTitle"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Add Fund FAILED | ₹300 | bud-ee2ade9ebc2a"
                android:textColor="#1F2937"
                android:textSize="14sp"
                android:textStyle="bold" />

            <!-- Transaction Amount Badge (+₹300) -->
            <TextView
                android:id="@+id/tvTxAmountBadge"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginStart="8dp"
                android:background="@drawable/bg_badge_amount_green"
                android:paddingHorizontal="8dp"
                android:paddingVertical="4dp"
                android:text="+₹300"
                android:textColor="#16A34A"
                android:textSize="14sp"
                android:textStyle="bold" />

            <!-- Balance on Right -->
            <TextView
                android:id="@+id/tvTxBalance"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginStart="16dp"
                android:text="₹0"
                android:textColor="#1F2937"
                android:textSize="14sp"
                android:textStyle="bold" />
        </LinearLayout>

        <!-- Subtitle Info: Previous Balance and Date -->
        <TextView
            android:id="@+id/tvTxSubtitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="6dp"
            android:text="Add Fund FAILED | 300 | bud-ee2ade9ebc2a"
            android:textColor="#6B7280"
            android:textSize="12sp" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:orientation="horizontal">

            <TextView
                android:id="@+id/tvTxDate"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="06/10/2026 10:16 AM"
                android:textColor="#9CA3AF"
                android:textSize="11sp" />

            <TextView
                android:id="@+id/tvTxPrevBalance"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Previous Balance: ₹0"
                android:textColor="#9CA3AF"
                android:textSize="11sp" />
        </LinearLayout>
    </LinearLayout>
</androidx.cardview.widget.CardView>`,
  },

  // 12. fragment_funds.xml
  {
    path: 'app/src/main/res/layout/fragment_funds.xml',
    category: 'layout',
    language: 'xml',
    description: 'Funds screen with Add Funds, Withdraw, Bank Details items (Video 00:33)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED"
    android:orientation="vertical"
    android:padding="16dp">

    <!-- Starline Result Ticker Notification Pill -->
    <TextView
        android:id="@+id/tvStarlineTicker"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@drawable/bg_white_rounded_card"
        android:drawableStart="@drawable/ic_starline_small"
        android:drawablePadding="8dp"
        android:padding="12dp"
        android:text="Starline 02:30 PM   158-4"
        android:textColor="#1F2937"
        android:textSize="14sp"
        android:textStyle="bold" />

    <!-- 1. Add Funds -->
    <include
        android:id="@+id/itemAddFunds"
        layout="@layout/item_funds_menu"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp" />

    <!-- 2. Add Funds History -->
    <include
        android:id="@+id/itemAddFundsHistory"
        layout="@layout/item_funds_menu"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp" />

    <!-- 3. Withdraw Funds -->
    <include
        android:id="@+id/itemWithdrawFunds"
        layout="@layout/item_funds_menu"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp" />

    <!-- 4. Withdraw Funds History -->
    <include
        android:id="@+id/itemWithdrawFundsHistory"
        layout="@layout/item_funds_menu"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp" />

    <!-- 5. Add Bank Details -->
    <include
        android:id="@+id/itemAddBankDetails"
        layout="@layout/item_funds_menu"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp" />

    <!-- 6. Bank Details History -->
    <include
        android:id="@+id/itemBankDetailsHistory"
        layout="@layout/item_funds_menu"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp" />

</LinearLayout>`,
  },

  // 13. bottom_sheet_welcome_bonus.xml
  {
    path: 'app/src/main/res/layout/bottom_sheet_welcome_bonus.xml',
    category: 'layout',
    language: 'xml',
    description: 'Welcome Bonus Bottom Sheet: Pay ₹1, Get ₹100 (Video 00:37)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/bg_bottom_sheet_rounded"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:padding="24dp">

    <!-- Gift Box Illustration -->
    <ImageView
        android:layout_width="96dp"
        android:layout_height="96dp"
        android:src="@drawable/ic_gift_bonus"
        android:contentDescription="Welcome Gift" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:background="@drawable/bg_badge_welcome"
        android:paddingHorizontal="16dp"
        android:paddingVertical="4dp"
        android:text="Welcome Bonus"
        android:textColor="#C2410C"
        android:textSize="14sp"
        android:textStyle="bold" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="Pay ₹1, Get ₹100"
        android:textColor="#1F2937"
        android:textSize="20sp"
        android:textStyle="bold" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:text="*New Users Only, one-time bonus"
        android:textColor="#6B7280"
        android:textSize="13sp" />

    <!-- Action Button: Pay ₹1 -->
    <androidx.appcompat.widget.AppCompatButton
        android:id="@+id/btnPayBonusOneRupee"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_marginTop="20dp"
        android:background="@drawable/bg_orange_gradient_button"
        android:text="Pay ₹1"
        android:textAllCaps="false"
        android:textColor="#FFFFFF"
        android:textSize="16sp"
        android:textStyle="bold" />

</LinearLayout>`,
  },

  // 14. dialog_withdraw_terms.xml
  {
    path: 'app/src/main/res/layout/dialog_withdraw_terms.xml',
    category: 'layout',
    language: 'xml',
    description: 'Withdraw Terms & Conditions Dialog (Video 00:46)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/bg_terms_dialog"
    android:orientation="vertical">

    <!-- Header with Close Button -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="52dp"
        android:background="#F16521"
        android:gravity="center_vertical"
        android:orientation="horizontal"
        android:paddingHorizontal="16dp">

        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="Terms &amp; Conditions"
            android:textColor="#FFFFFF"
            android:textSize="18sp"
            android:textStyle="bold" />

        <ImageView
            android:id="@+id/btnCloseTerms"
            android:layout_width="28dp"
            android:layout_height="28dp"
            android:contentDescription="Close"
            android:src="@drawable/ic_close_circle" />
    </LinearLayout>

    <!-- Terms Body -->
    <TextView
        android:id="@+id/tvTermsContent"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:lineSpacingExtra="4dp"
        android:padding="20dp"
        android:text="Minimum Withdraw Is 1000/RS\nMaximum Withdraw Is 25 Lakhs Per Day\n\nPer day you can send a withdrawal request of maximum 1 Lakh Automatic. Above 100000 You Should Request Us Manually.\n\nOnly 1 Withdraw Request Accepted Per Day.\n\nWithdraw Request Timing 10:00 AM to 10:00 PM\n\nProcess Time Minimum 1 Hour Maximum Up to 48 Hours, Depending On Bank Server.\n\nWithdraw Is Available On All 7 Days Of Week."
        android:textColor="#1F2937"
        android:textSize="14sp" />

    <!-- I Agree Button -->
    <androidx.appcompat.widget.AppCompatButton
        android:id="@+id/btnAgreeTerms"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:layout_margin="16dp"
        android:background="@drawable/bg_orange_gradient_button"
        android:text="I Agree"
        android:textAllCaps="false"
        android:textColor="#FFFFFF"
        android:textSize="16sp"
        android:textStyle="bold" />

</LinearLayout>`,
  },

  // 15. fragment_support.xml
  {
    path: 'app/src/main/res/layout/fragment_support.xml',
    category: 'layout',
    language: 'xml',
    description: 'Support screen with Headset Illustration & Issue cards (Video 01:06)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:padding="20dp">

    <!-- Support Headset Icon -->
    <ImageView
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:layout_marginTop="20dp"
        android:src="@drawable/ic_headset_support"
        android:contentDescription="Support Headset" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="Rama 77\nChat Support"
        android:gravity="center"
        android:textColor="#1F2937"
        android:textSize="20sp"
        android:textStyle="bold" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:letterSpacing="0.08"
        android:text="SELECT AN ISSUE"
        android:textColor="#6B7280"
        android:textSize="12sp"
        android:textStyle="bold" />

    <!-- 1. Deposit Issue Card -->
    <androidx.cardview.widget.CardView
        android:id="@+id/cardDepositIssue"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="24dp"
        app:cardCornerRadius="16dp"
        app:cardElevation="2dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="20dp">

            <TextView
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Deposit Issue 🏛️"
                android:textColor="#1F2937"
                android:textSize="16sp"
                android:textStyle="bold" />

            <ImageView
                android:layout_width="32dp"
                android:layout_height="32dp"
                android:background="@drawable/bg_orange_circle"
                android:padding="8dp"
                android:src="@drawable/ic_chevron_right"
                android:contentDescription="Next" />
        </LinearLayout>
    </androidx.cardview.widget.CardView>

    <!-- 2. Withdraw Issue Card -->
    <androidx.cardview.widget.CardView
        android:id="@+id/cardWithdrawIssue"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        app:cardCornerRadius="16dp"
        app:cardElevation="2dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="20dp">

            <TextView
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Withdraw Issue 💸"
                android:textColor="#1F2937"
                android:textSize="16sp"
                android:textStyle="bold" />

            <ImageView
                android:layout_width="32dp"
                android:layout_height="32dp"
                android:background="@drawable/bg_orange_circle"
                android:padding="8dp"
                android:src="@drawable/ic_chevron_right"
                android:contentDescription="Next" />
        </LinearLayout>
    </androidx.cardview.widget.CardView>

    <!-- 3. Other Issue Card -->
    <androidx.cardview.widget.CardView
        android:id="@+id/cardOtherIssue"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        app:cardCornerRadius="16dp"
        app:cardElevation="2dp">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="56dp"
            android:gravity="center_vertical"
            android:orientation="horizontal"
            android:paddingHorizontal="20dp">

            <TextView
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Other Issue 🌐"
                android:textColor="#1F2937"
                android:textSize="16sp"
                android:textStyle="bold" />

            <ImageView
                android:layout_width="32dp"
                android:layout_height="32dp"
                android:background="@drawable/bg_orange_circle"
                android:padding="8dp"
                android:src="@drawable/ic_chevron_right"
                android:contentDescription="Next" />
        </LinearLayout>
    </androidx.cardview.widget.CardView>

</LinearLayout>`,
  },

  // 16. activity_charts.xml
  {
    path: 'app/src/main/res/layout/activity_charts.xml',
    category: 'layout',
    language: 'xml',
    description: 'Matka Charts List with Jodi and Panel buttons (Video 01:57)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED"
    android:orientation="vertical">

    <!-- Custom Toolbar -->
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbarCharts"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:background="#F16521"
        app:title="Charts"
        app:titleTextColor="#FFFFFF" />

    <!-- Matka Chart Banner -->
    <TextView
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:layout_margin="16dp"
        android:background="@drawable/bg_orange_gradient_button"
        android:gravity="center"
        android:text="Matka Chart"
        android:textColor="#FFFFFF"
        android:textSize="18sp"
        android:textStyle="bold" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvChartsList"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:paddingHorizontal="16dp" />

</LinearLayout>`,
  },

  // 17. activity_chart_detail.xml
  {
    path: 'app/src/main/res/layout/activity_chart_detail.xml',
    category: 'layout',
    language: 'xml',
    description: 'Weekly Jodi / Panel Chart Table with Go To Top and Bottom buttons (Video 02:02)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#FFFFFF">

    <!-- Top Navigation Header -->
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbarChartDetail"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:background="#F16521"
        app:layout_constraintTop_toTopOf="parent"
        app:title="DEVI MORNING Jodi Chart"
        app:titleTextColor="#FFFFFF" />

    <!-- Top Action Buttons: Go To Top / Go To Bottom -->
    <LinearLayout
        android:id="@+id/layoutScrollActions"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="12dp"
        android:orientation="horizontal"
        app:layout_constraintTop_toBottomOf="@id/toolbarChartDetail">

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/btnGoToTop"
            android:layout_width="0dp"
            android:layout_height="40dp"
            android:layout_marginEnd="6dp"
            android:layout_weight="1"
            android:background="@drawable/bg_orange_gradient_button"
            android:text="▲ Go To Top"
            android:textAllCaps="false"
            android:textColor="#FFFFFF"
            android:textStyle="bold" />

        <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/btnGoToBottom"
            android:layout_width="0dp"
            android:layout_height="40dp"
            android:layout_marginStart="6dp"
            android:layout_weight="1"
            android:background="@drawable/bg_orange_gradient_button"
            android:text="▼ Go To Bottom"
            android:textAllCaps="false"
            android:textColor="#FFFFFF"
            android:textStyle="bold" />
    </LinearLayout>

    <!-- Weekly Chart Table Grid Header -->
    <TableLayout
        android:id="@+id/tableChartHeader"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#FDE8D8"
        android:stretchColumns="*"
        app:layout_constraintTop_toBottomOf="@id/layoutScrollActions">

        <TableRow android:paddingVertical="8dp">
            <TextView android:gravity="center" android:text="Date" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Mon" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Tue" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Wed" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Thu" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Fri" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Sat" android:textStyle="bold" android:textColor="#C2410C" />
            <TextView android:gravity="center" android:text="Sun" android:textStyle="bold" android:textColor="#C2410C" />
        </TableRow>
    </TableLayout>

    <!-- Scrollable Weekly Rows -->
    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/rvChartRows"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@id/tableChartHeader" />

</androidx.constraintlayout.widget.ConstraintLayout>`,
  },

  // 18. activity_game_rates.xml
  {
    path: 'app/src/main/res/layout/activity_game_rates.xml',
    category: 'layout',
    language: 'xml',
    description: 'Game Win Rates screen with Single Digit, Single Pana, Sangam ratios (Video 01:27)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">

        <!-- RAMA77 Game Win Ratio Header -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:text="RAMA77 Game Win Ratio"
            android:textColor="#1F2937"
            android:textSize="16sp"
            android:textStyle="bold" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rvRama77Rates"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:nestedScrollingEnabled="false" />

        <!-- Bombay Starline Header -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:gravity="center"
            android:text="Bombay Starline Game Win Ratio"
            android:textColor="#1F2937"
            android:textSize="16sp"
            android:textStyle="bold" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rvStarlineRates"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:nestedScrollingEnabled="false" />

        <!-- Bombay Jackpot Header -->
        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:gravity="center"
            android:text="Bombay Jackpot Game Win Ratio"
            android:textColor="#1F2937"
            android:textSize="16sp"
            android:textStyle="bold" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/rvJackpotRates"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="12dp"
            android:nestedScrollingEnabled="false" />

    </LinearLayout>
</androidx.core.widget.NestedScrollView>`,
  },

  // 19. MainActivity.kt
  {
    path: 'app/src/main/java/com/rama77/app/MainActivity.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Kotlin Controller for Navigation Drawer, Bottom Navigation, and Fragments',
    content: `package com.rama77.app

import android.content.Intent
import android.os.Bundle
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.fragment.app.Fragment
import com.google.android.material.navigation.NavigationView
import com.rama77.app.databinding.ActivityMainBinding
import com.rama77.app.ui.charts.ChartsActivity
import com.rama77.app.ui.funds.FundsFragment
import com.rama77.app.ui.history.HistoryFragment
import com.rama77.app.ui.home.HomeFragment
import com.rama77.app.ui.mpin.ChangeMpinActivity
import com.rama77.app.ui.passbook.PassbookFragment
import com.rama77.app.ui.rates.GameRatesActivity
import com.rama77.app.ui.settings.SettingsActivity
import com.rama77.app.ui.support.SupportFragment

class MainActivity : AppCompatActivity(), NavigationView.OnNavigationItemSelectedListener {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableFullscreenMode()
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupToolbar()
        setupBottomNav()
        setupDrawer()

        // Load Default Home Fragment
        if (savedInstanceState == null) {
            loadFragment(HomeFragment(), "Home")
            binding.bottomNav.selectedItemId = R.id.nav_home
        }
    }

    private fun enableFullscreenMode() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.R) {
            window.insetsController?.hide(
                android.view.WindowInsets.Type.statusBars()
            )
        } else {
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = (
                android.view.View.SYSTEM_UI_FLAG_FULLSCREEN
                or android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            )
        }
    }

    private fun setupToolbar() {
        binding.btnMenuDrawer.setOnClickListener {
            binding.drawerLayout.openDrawer(GravityCompat.START)
        }

        binding.btnWalletChip.setOnClickListener {
            loadFragment(FundsFragment(), "Funds")
            binding.bottomNav.selectedItemId = R.id.nav_funds
        }

        binding.btnNotificationBell.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }
    }

    private fun setupBottomNav() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_history -> loadFragment(HistoryFragment(), "History")
                R.id.nav_passbook -> loadFragment(PassbookFragment(), "Passbook")
                R.id.nav_home -> loadFragment(HomeFragment(), "Home")
                R.id.nav_funds -> loadFragment(FundsFragment(), "Funds")
                R.id.nav_support -> loadFragment(SupportFragment(), "Support")
                else -> false
            }
            true
        }
    }

    private fun setupDrawer() {
        binding.navigationView.setNavigationItemSelectedListener(this)
    }

    private fun loadFragment(fragment: Fragment, tag: String) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment, tag)
            .commit()
    }

    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        binding.drawerLayout.closeDrawer(GravityCompat.START)
        when (item.itemId) {
            R.id.drawer_home -> {
                loadFragment(HomeFragment(), "Home")
                binding.bottomNav.selectedItemId = R.id.nav_home
            }
            R.id.drawer_charts -> startActivity(Intent(this, ChartsActivity::class.java))
            R.id.drawer_change_mpin -> startActivity(Intent(this, ChangeMpinActivity::class.java))
            R.id.drawer_game_rates -> startActivity(Intent(this, GameRatesActivity::class.java))
            R.id.drawer_settings -> startActivity(Intent(this, SettingsActivity::class.java))
            R.id.drawer_share_app -> shareApp()
            R.id.drawer_exit -> finish()
            else -> Toast.makeText(this, item.title, Toast.LENGTH_SHORT).show()
        }
        return true
    }

    private fun shareApp() {
        val shareIntent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            putExtra(
                Intent.EXTRA_TEXT,
                "Hey 👋 I am Using Rama 77 Application to track and play games! Download now."
            )
        }
        startActivity(Intent.createChooser(shareIntent, "Sharing text"))
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (binding.drawerLayout.isDrawerOpen(GravityCompat.START)) {
            binding.drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
    }
}`,
  },

  // 20. LoginActivity.kt
  {
    path: 'app/src/main/java/com/rama77/app/ui/login/LoginActivity.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Kotlin MPIN Authentication and BiometricPrompt fingerprint integration',
    content: `package com.rama77.app.ui.login

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.rama77.app.MainActivity
import com.rama77.app.databinding.ActivityLoginBinding
import com.rama77.app.ui.register.RegisterActivity
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.util.concurrent.Executor

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var executor: Executor
    private lateinit var biometricPrompt: BiometricPrompt
    private lateinit var promptInfo: BiometricPrompt.PromptInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableFullscreenMode()
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupPinAutoAdvance()
        setupBiometrics()

        binding.btnLogin.setOnClickListener {
            performLogin()
        }

        binding.ivFingerprint.setOnClickListener {
            biometricPrompt.authenticate(promptInfo)
        }

        // Navigate to New Registration Screen
        binding.tvRegisterNow.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun enableFullscreenMode() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.R) {
            window.insetsController?.hide(
                android.view.WindowInsets.Type.statusBars()
            )
        } else {
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = (
                View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            )
        }
    }

    private fun setupPinAutoAdvance() {
        val pins = arrayOf(binding.etPin1, binding.etPin2, binding.etPin3, binding.etPin4)
        for (i in pins.indices) {
            pins[i].addTextChangedListener(object : TextWatcher {
                override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                    if (s?.length == 1 && i < pins.size - 1) {
                        pins[i + 1].requestFocus()
                    }
                }
                override fun afterTextChanged(s: Editable?) {}
            })
        }
    }

    private fun performLogin() {
        binding.btnLogin.text = ""
        binding.pbLoginLoading.visibility = View.VISIBLE

        lifecycleScope.launch {
            delay(1200) // Simulating network auth
            binding.pbLoginLoading.visibility = View.GONE
            binding.btnLogin.text = "Login"

            // Navigate to Main Dashboard
            startActivity(Intent(this@LoginActivity, MainActivity::class.java))
            finish()
        }
    }

    private fun setupBiometrics() {
        executor = ContextCompat.getMainExecutor(this)
        biometricPrompt = BiometricPrompt(this, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)
                    Toast.makeText(applicationContext, "Biometric Authenticated!", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                    finish()
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    Toast.makeText(applicationContext, "Authentication failed", Toast.LENGTH_SHORT).show()
                }
            })

        promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("RAMA77 Biometric Login")
            .setSubtitle("Confirm your fingerprint to access your account")
            .setNegativeButtonText("Use MPIN")
            .build()
    }
}`,
  },

  // 21. HomeFragment.kt
  {
    path: 'app/src/main/java/com/rama77/app/ui/home/HomeFragment.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Kotlin Home Fragment managing market items, countdowns and play click',
    content: `package com.rama77.app.ui.home

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.rama77.app.adapter.MarketAdapter
import com.rama77.app.databinding.FragmentHomeBinding
import com.rama77.app.model.MarketItem

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var marketAdapter: MarketAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupQuickContact()
        setupMarketsList()
    }

    private fun setupQuickContact() {
        binding.btnCallNow.setOnClickListener {
            val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:6377972674"))
            startActivity(intent)
        }

        binding.btnWhatsapp.setOnClickListener {
            val url = "https://api.whatsapp.com/send?phone=916377972674&text=Hello%20Rama77%20Support"
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            startActivity(intent)
        }

        binding.btnBombayStarline.setOnClickListener {
            Toast.makeText(context, "Bombay Starline Selected", Toast.LENGTH_SHORT).show()
        }

        binding.btnBombayJackpot.setOnClickListener {
            Toast.makeText(context, "Bombay Jackpot Selected", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupMarketsList() {
        val markets = listOf(
            MarketItem("1", "DEVI MORNING", "268", "60", "145", "08:55 AM", "09:55 AM", "Closed for Today", false),
            MarketItem("2", "SURYA MORNING", "490", "38", "468", "10:05 AM", "11:05 AM", "Closed for Today", false),
            MarketItem("3", "SRIDEVI", "147", "22", "589", "11:40 AM", "12:42 PM", "Closed for Today", false),
            MarketItem("4", "TIME BAZAR", "670", "33", "580", "01:05 PM", "02:05 PM", "Closed for Today", false),
            MarketItem("5", "MADHUR DAY", "369", "8*", "***", "01:35 PM", "02:35 PM", "Running for Close", true),
            MarketItem("6", "SRIDEVI NIGHT", "290", "17", "188", "07:20 PM", "08:20 PM", "Running for Open", true),
            MarketItem("7", "MADHUR NIGHT", "567", "81", "146", "08:30 PM", "10:32 PM", "Running for Open", true),
            MarketItem("8", "MILAN NIGHT", "490", "37", "340", "09:05 PM", "11:05 PM", "Running for Open", true)
        )

        marketAdapter = MarketAdapter(markets) { market ->
            Toast.makeText(context, "Opening Bid for \${market.name}", Toast.LENGTH_SHORT).show()
        }

        binding.rvMarkets.apply {
            layoutManager = LinearLayoutManager(context)
            adapter = marketAdapter
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}`,
  },

  // 22. MarketAdapter.kt
  {
    path: 'app/src/main/java/com/rama77/app/adapter/MarketAdapter.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'RecyclerView Adapter for Markets Card list with custom status colors',
    content: `package com.rama77.app.adapter

import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.rama77.app.R
import com.rama77.app.databinding.ItemMarketCardBinding
import com.rama77.app.model.MarketItem

class MarketAdapter(
    private val items: List<MarketItem>,
    private val onPlayClick: (MarketItem) -> Unit
) : RecyclerView.Adapter<MarketAdapter.MarketViewHolder>() {

    inner class MarketViewHolder(val binding: ItemMarketCardBinding) :
        RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MarketViewHolder {
        val binding = ItemMarketCardBinding.inflate(
            LayoutInflater.from(parent.context), parent, false
        )
        return MarketViewHolder(binding)
    }

    override fun onBindViewHolder(holder: MarketViewHolder, position: Int) {
        val item = items[position]
        with(holder.binding) {
            tvMarketName.text = item.name
            tvMarketResult.text = "\${item.openPana}-\${item.jodi}-\${item.closePana}"
            tvOpenTime.text = "Open Bids: \${item.openTime}"
            tvCloseTime.text = "Close Bids: \${item.closeTime}"
            tvMarketStatus.text = item.status

            if (item.status == "Closed for Today") {
                tvMarketStatus.setTextColor(Color.parseColor("#DC2626"))
                btnPlayMarket.setBackgroundResource(R.drawable.bg_play_button_disabled)
            } else {
                tvMarketStatus.setTextColor(Color.parseColor("#16A34A"))
                btnPlayMarket.setBackgroundResource(R.drawable.bg_play_button)
            }

            btnPlayMarket.setOnClickListener {
                onPlayClick(item)
            }
        }
    }

    override fun getItemCount(): Int = items.size
}`,
  },

  // 23. MarketItem.kt
  {
    path: 'app/src/main/java/com/rama77/app/model/MarketItem.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Data model representing Matka markets and results',
    content: `package com.rama77.app.model

data class MarketItem(
    val id: String,
    val name: String,
    val openPana: String,
    val jodi: String,
    val closePana: String,
    val openTime: String,
    val closeTime: String,
    val status: String,
    val isOpen: Boolean
)`,
  },

  // 24. bottom_nav_menu.xml
  {
    path: 'app/src/main/res/menu/bottom_nav_menu.xml',
    category: 'layout',
    language: 'xml',
    description: 'Bottom Navigation 5 Items Menu (History, Passbook, Home, Funds, Support)',
    content: `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/nav_history"
        android:icon="@drawable/ic_clock_history"
        android:title="History" />
    <item
        android:id="@+id/nav_passbook"
        android:icon="@drawable/ic_book_passbook"
        android:title="Passbook" />
    <item
        android:id="@+id/nav_home"
        android:icon="@drawable/ic_home"
        android:title="Home" />
    <item
        android:id="@+id/nav_funds"
        android:icon="@drawable/ic_wallet_funds"
        android:title="Funds" />
    <item
        android:id="@+id/nav_support"
        android:icon="@drawable/ic_support_headset"
        android:title="Support" />
</menu>`,
  },

  // 25. drawer_nav_menu.xml
  {
    path: 'app/src/main/res/menu/drawer_nav_menu.xml',
    category: 'layout',
    language: 'xml',
    description: 'Navigation Drawer 13 Items Menu matching RAMA77 sidebar exactly',
    content: `<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/drawer_home"
        android:icon="@drawable/ic_home"
        android:title="Home" />
    <item
        android:id="@+id/drawer_charts"
        android:icon="@drawable/ic_line_chart"
        android:title="Charts" />
    <item
        android:id="@+id/drawer_change_mpin"
        android:icon="@drawable/ic_lock_key"
        android:title="Change MPIN" />
    <item
        android:id="@+id/drawer_notifications"
        android:icon="@drawable/ic_bell"
        android:title="Notifications" />
    <item
        android:id="@+id/drawer_how_to_play"
        android:icon="@drawable/ic_help_circle"
        android:title="How To Play?" />
    <item
        android:id="@+id/drawer_submit_ideas"
        android:icon="@drawable/ic_message_square"
        android:title="Submit User Ideas" />
    <item
        android:id="@+id/drawer_game_rates"
        android:icon="@drawable/ic_rupee_coin"
        android:title="Game Rates" />
    <item
        android:id="@+id/drawer_terms"
        android:icon="@drawable/ic_file_text"
        android:title="Terms &amp; Conditions" />
    <item
        android:id="@+id/drawer_settings"
        android:icon="@drawable/ic_settings"
        android:title="Settings" />
    <item
        android:id="@+id/drawer_language"
        android:icon="@drawable/ic_globe"
        android:title="Language" />
    <item
        android:id="@+id/drawer_dark_mode"
        android:icon="@drawable/ic_moon"
        android:title="Dark Mode" />
    <item
        android:id="@+id/drawer_share_app"
        android:icon="@drawable/ic_share"
        android:title="Share App" />
    <item
        android:id="@+id/drawer_exit"
        android:icon="@drawable/ic_log_out"
        android:title="Exit app" />
</menu>`,
  },

  // 26. activity_register.xml
  {
    path: 'app/src/main/res/layout/activity_register.xml',
    category: 'layout',
    language: 'xml',
    description: 'New User Registration with Mobile Number, Password, Promo Code & MPIN Setup',
    content: `<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#EDEDED"
    android:fillViewport="true">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="24dp">

        <!-- Header Back Arrow & Logo Lockup -->
        <ImageView
            android:id="@+id/btnBackToLogin"
            android:layout_width="36dp"
            android:layout_height="36dp"
            android:background="@drawable/bg_orange_circle"
            android:contentDescription="Back"
            android:padding="8dp"
            android:src="@drawable/ic_arrow_back"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <LinearLayout
            android:id="@+id/layoutRegBrand"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:orientation="horizontal"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent">

            <TextView
                android:layout_width="36dp"
                android:layout_height="36dp"
                android:background="@drawable/bg_logo_icon"
                android:gravity="center"
                android:text="R"
                android:textColor="#FFFFFF"
                android:textSize="22sp"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginStart="8dp"
                android:text="RAMA77"
                android:textColor="#F16521"
                android:textSize="24sp"
                android:textStyle="bold" />
        </LinearLayout>

        <TextView
            android:id="@+id/tvRegTitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            android:text="@string/new_registration"
            android:textColor="#1F2937"
            android:textSize="22sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/layoutRegBrand" />

        <TextView
            android:id="@+id/tvRegSubtitle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="4dp"
            android:text="Create your account &amp; unlock ₹100 Welcome Bonus"
            android:textColor="#6B7280"
            android:textSize="13sp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/tvRegTitle" />

        <!-- 1. Mobile Number Field -->
        <com.google.android.material.textfield.TextInputLayout
            android:id="@+id/tilMobileNumber"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="24dp"
            android:hint="@string/mobile_number"
            app:boxCornerRadiusBottomEnd="14dp"
            app:boxCornerRadiusBottomStart="14dp"
            app:boxCornerRadiusTopEnd="14dp"
            app:boxCornerRadiusTopStart="14dp"
            app:boxStrokeColor="#F16521"
            app:prefixText="+91 "
            app:prefixTextColor="#1F2937"
            app:startIconDrawable="@drawable/ic_call_orange"
            app:layout_constraintTop_toBottomOf="@id/tvRegSubtitle">

            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/etMobileNumber"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:inputType="phone"
                android:maxLength="10"
                android:textSize="15sp"
                android:textStyle="bold" />
        </com.google.android.material.textfield.TextInputLayout>

        <!-- 2. Password Field -->
        <com.google.android.material.textfield.TextInputLayout
            android:id="@+id/tilPassword"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="14dp"
            android:hint="@string/password"
            app:boxCornerRadiusBottomEnd="14dp"
            app:boxCornerRadiusBottomStart="14dp"
            app:boxCornerRadiusTopEnd="14dp"
            app:boxCornerRadiusTopStart="14dp"
            app:boxStrokeColor="#F16521"
            app:endIconMode="password_toggle"
            app:startIconDrawable="@drawable/ic_lock_key"
            app:layout_constraintTop_toBottomOf="@id/tilMobileNumber">

            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/etPassword"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:inputType="textPassword"
                android:textSize="15sp" />
        </com.google.android.material.textfield.TextInputLayout>

        <!-- 3. Promo Code Field -->
        <com.google.android.material.textfield.TextInputLayout
            android:id="@+id/tilPromoCode"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="14dp"
            android:hint="@string/promo_code"
            app:boxCornerRadiusBottomEnd="14dp"
            app:boxCornerRadiusBottomStart="14dp"
            app:boxCornerRadiusTopEnd="14dp"
            app:boxCornerRadiusTopStart="14dp"
            app:boxStrokeColor="#F16521"
            app:helperText="Use code RAMA100 for ₹100 instant bonus"
            app:helperTextColor="#16A34A"
            app:layout_constraintTop_toBottomOf="@id/tilPassword">

            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/etPromoCode"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:inputType="textCapCharacters"
                android:text="RAMA100"
                android:textSize="15sp"
                android:textStyle="bold" />
        </com.google.android.material.textfield.TextInputLayout>

        <!-- MPIN & Biometrics Setup Card Container -->
        <androidx.cardview.widget.CardView
            android:id="@+id/cardMpinSetup"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dp"
            app:cardCornerRadius="16dp"
            app:cardElevation="2dp"
            app:layout_constraintTop_toBottomOf="@id/tilPromoCode">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:text="@string/setup_mpin_title"
                    android:textColor="#1F2937"
                    android:textSize="15sp"
                    android:textStyle="bold" />

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="2dp"
                    android:text="Set 4-digit PIN for swift and protected daily login"
                    android:textColor="#6B7280"
                    android:textSize="12sp" />

                <!-- New MPIN Input -->
                <com.google.android.material.textfield.TextInputLayout
                    android:id="@+id/tilNewMpin"
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="12dp"
                    android:hint="@string/enter_new_mpin"
                    app:boxStrokeColor="#F16521">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etNewMpin"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:inputType="numberPassword"
                        android:letterSpacing="0.2"
                        android:maxLength="4"
                        android:textSize="18sp"
                        android:textStyle="bold" />
                </com.google.android.material.textfield.TextInputLayout>

                <!-- Confirm MPIN Input -->
                <com.google.android.material.textfield.TextInputLayout
                    android:id="@+id/tilConfirmMpin"
                    style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="10dp"
                    android:hint="@string/confirm_mpin"
                    app:boxStrokeColor="#F16521">

                    <com.google.android.material.textfield.TextInputEditText
                        android:id="@+id/etConfirmMpin"
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:gravity="center"
                        android:inputType="numberPassword"
                        android:letterSpacing="0.2"
                        android:maxLength="4"
                        android:textSize="18sp"
                        android:textStyle="bold" />
                </com.google.android.material.textfield.TextInputLayout>

                <!-- Biometric Fingerprint Switch -->
                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="14dp"
                    android:gravity="center_vertical"
                    android:orientation="horizontal">

                    <ImageView
                        android:layout_width="28dp"
                        android:layout_height="28dp"
                        android:contentDescription="Fingerprint"
                        android:src="@drawable/ic_fingerprint_line"
                        app:tint="#F16521" />

                    <TextView
                        android:layout_width="0dp"
                        android:layout_height="wrap_content"
                        android:layout_marginStart="10dp"
                        android:layout_weight="1"
                        android:text="@string/enable_fingerprint"
                        android:textColor="#1F2937"
                        android:textSize="14sp"
                        android:textStyle="bold" />

                    <androidx.appcompat.widget.SwitchCompat
                        android:id="@+id/switchFingerprint"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:checked="true" />
                </LinearLayout>

            </LinearLayout>
        </androidx.cardview.widget.CardView>

        <!-- Complete Registration Button -->
        <FrameLayout
            android:id="@+id/btnRegisterContainer"
            android:layout_width="match_parent"
            android:layout_height="52dp"
            android:layout_marginTop="24dp"
            app:layout_constraintTop_toBottomOf="@id/cardMpinSetup">

            <androidx.appcompat.widget.AppCompatButton
                android:id="@+id/btnCompleteRegister"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:background="@drawable/bg_orange_gradient_button"
                android:text="@string/complete_registration"
                android:textAllCaps="false"
                android:textColor="#FFFFFF"
                android:textSize="16sp"
                android:textStyle="bold" />

            <ProgressBar
                android:id="@+id/pbRegisterLoading"
                android:layout_width="28dp"
                android:layout_height="28dp"
                android:layout_gravity="center"
                android:indeterminateTint="#FFFFFF"
                android:visibility="gone" />
        </FrameLayout>

        <!-- Already have account Login Link -->
        <LinearLayout
            android:id="@+id/layoutLoginPrompt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:layout_marginBottom="32dp"
            android:gravity="center"
            android:orientation="horizontal"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@id/btnRegisterContainer">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Already have an account?"
                android:textColor="#4B5563"
                android:textSize="13sp" />

            <TextView
                android:id="@+id/tvLoginLink"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginStart="6dp"
                android:clickable="true"
                android:focusable="true"
                android:text="Login with MPIN"
                android:textColor="#F16521"
                android:textSize="13sp"
                android:textStyle="bold" />
        </LinearLayout>

    </androidx.constraintlayout.widget.ConstraintLayout>
</androidx.core.widget.NestedScrollView>`,
  },

  // 27. RegisterActivity.kt
  {
    path: 'app/src/main/java/com/rama77/app/ui/register/RegisterActivity.kt',
    category: 'kotlin',
    language: 'kotlin',
    description: 'Kotlin Controller for New User Registration, MPIN Setup & Home Dashboard Redirection',
    content: `package com.rama77.app.ui.register

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.rama77.app.MainActivity
import com.rama77.app.databinding.ActivityRegisterBinding
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableFullscreenMode()
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupListeners()
    }

    private fun enableFullscreenMode() {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.R) {
            window.insetsController?.hide(
                android.view.WindowInsets.Type.statusBars()
            )
        } else {
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = (
                android.view.View.SYSTEM_UI_FLAG_FULLSCREEN
                or android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            )
        }
    }

    private fun setupListeners() {
        binding.btnBackToLogin.setOnClickListener {
            finish()
        }

        binding.tvLoginLink.setOnClickListener {
            finish()
        }

        binding.btnCompleteRegister.setOnClickListener {
            validateAndRegister()
        }
    }

    private fun validateAndRegister() {
        val mobile = binding.etMobileNumber.text?.toString()?.trim().orEmpty()
        val password = binding.etPassword.text?.toString()?.trim().orEmpty()
        val promo = binding.etPromoCode.text?.toString()?.trim().orEmpty()
        val newMpin = binding.etNewMpin.text?.toString()?.trim().orEmpty()
        val confirmMpin = binding.etConfirmMpin.text?.toString()?.trim().orEmpty()
        val biometricEnabled = binding.switchFingerprint.isChecked

        // 1. Validate Mobile Number
        if (mobile.length != 10) {
            binding.tilMobileNumber.error = "Please enter a valid 10-digit mobile number"
            binding.etMobileNumber.requestFocus()
            return
        } else {
            binding.tilMobileNumber.error = null
        }

        // 2. Validate Password
        if (password.length < 4) {
            binding.tilPassword.error = "Password must be at least 4 characters long"
            binding.etPassword.requestFocus()
            return
        } else {
            binding.tilPassword.error = null
        }

        // 3. Validate MPIN
        if (newMpin.length != 4) {
            binding.tilNewMpin.error = "Please enter a 4-digit MPIN"
            binding.etNewMpin.requestFocus()
            return
        } else {
            binding.tilNewMpin.error = null
        }

        if (newMpin != confirmMpin) {
            binding.tilConfirmMpin.error = "MPIN and Confirm MPIN do not match!"
            binding.etConfirmMpin.requestFocus()
            return
        } else {
            binding.tilConfirmMpin.error = null
        }

        // Show Loading Animation
        binding.btnCompleteRegister.text = ""
        binding.pbRegisterLoading.visibility = View.VISIBLE

        lifecycleScope.launch {
            delay(1200) // Simulating network registration API call

            // Persist user credentials in local secure preferences
            val prefs = getSharedPreferences("RAMA77_PREFS", Context.MODE_PRIVATE)
            prefs.edit().apply {
                putString("KEY_USER_PHONE", mobile)
                putString("KEY_USER_MPIN", newMpin)
                putBoolean("KEY_BIOMETRIC_ENABLED", biometricEnabled)
                putString("KEY_PROMO_CODE", promo)
                putInt("KEY_WALLET_BALANCE", if (promo.isNotEmpty()) 100 else 0)
                putBoolean("KEY_IS_LOGGED_IN", true)
                apply()
            }

            binding.pbRegisterLoading.visibility = View.GONE
            binding.btnCompleteRegister.text = "Complete Registration"

            Toast.makeText(
                this@RegisterActivity,
                "Registration Successful! Welcome to RAMA77.",
                Toast.LENGTH_LONG
            ).show()

            // Redirect directly to Home Dashboard (clearing back stack)
            val intent = Intent(this@RegisterActivity, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                putExtra("EXTRA_NEW_USER", true)
                putExtra("EXTRA_PHONE", mobile)
            }
            startActivity(intent)
            finish()
        }
    }
}`,
  },
];
