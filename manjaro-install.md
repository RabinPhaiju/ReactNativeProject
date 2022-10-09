1. install npm or yarn
      - google
  
2. install jdk
   # note - not higher version, react may crash . read react-native documentation
   - for manjaro
        - sudo pacman -S jre11-openjdk-headless jre11-openjdk jdk11-openjdk openjdk11-doc openjdk11-src

3. install android-studio
   # 2022 4th quater - android 12s must be installed
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
   - Android SDK Platform 31
   - Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

4. Add to system variables
   - sudo nano .zshrc
      - export ANDROID_SDK_ROOT=$HOME/Library/Android/Sdk
          - may not require /Library - see where you install in android-studio
      - export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
      - export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
  
5. install new application
   1. npm uninstall -g react-native-cli @react-native-community/cli - to ensure unexpected issue(for new application)
   2. npx react-native init [project_name]
   3. npx react-native init [project_name] --version X.XX.X
6. to use virtual device
   1. google

7. To use physical device
   1. check
      1. adb devices
         1. if your physical device shows
            - adb reverse tcp:8081 tcp:8081

8. run application
   1. start metro for js bundler in its own terminal
        - npx react-native start
   2. run-android
        - npx react-native run-android
        - for wlan (deviceId->adb devices)
          - npx react-native run-android --deviceId='192.168.254.4:1031' 
        - for wired (deviceId->adb devices)
          -  npx react-native run-android --deviceId='[device_id']