import { Text, View } from "react-native";
// Yeni kütüphaneden gerekli bileşenleri alıyoruz
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Artık geleceğe hazır ve uyarı vermeyen güvenli alan */}
      <SafeAreaView className="flex-1 bg-slate-950">
        <View className="flex-1 items-center justify-center px-6">
          
          {/* Logo ve Kart İçeriği (Daha önce tasarladığımız yapı) */}
          <View className="w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <Text className="text-3xl font-extrabold text-white tracking-tight">
              Ledgerly
            </Text>
            <Text className="text-slate-400 text-lg mt-2 font-medium">
              Smart Financial Tracker
            </Text>
          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}