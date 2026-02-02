import React from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from "react-native-chart-kit";

export default function Home() {
  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
    datasets: [{
      data: [450, 200, 800, 500, 1100, 600],
      color: (opacity = 1) => `rgba(33, 222, 235, ${opacity})`, 
      strokeWidth: 3 
    }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.hello}>Merhaba, Sinem!</Text>
            <Text style={styles.welcome}>Hoş geldin.</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={28} color="#606060" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#21DEEB', '#15ADB8']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.salaryBox}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.bakiyeLabel}>Mevcut Bakiye</Text>
            <Ionicons name="wallet-outline" size={22} color="rgba(255,255,255,0.7)" />
          </View>
          <Text style={styles.salaryText}>2.000,00 ₺</Text>
          <View style={styles.cardFooter}>
            <View style={styles.trendBox}>
              <Ionicons name="trending-up" size={14} color="#FFFFFF" />
              <Text style={styles.trendText}>+%12 (Bu Ay)</Text>
            </View>
          </View>
        </LinearGradient>
            
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Harcama Analizi</Text>
          <LineChart
            data={chartData}
            width={screenWidth * 0.9}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Son İşlemler</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>Tümü</Text></TouchableOpacity>
          </View>

       
          <View style={styles.transactionItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="fast-food-outline" size={22} color="#21DEEB" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Burger King</Text>
              <Text style={styles.transactionDate}>Bugün, 14:30</Text>
            </View>
            <Text style={styles.transactionAmount}>-180 TL</Text>
          </View>


          <View style={styles.transactionItem}>
            <View style={[styles.iconContainer, { backgroundColor: '#E0FBE2' }]}>
              <Ionicons name="cash-outline" size={22} color="#22C55E" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>Maaş Yatırımı</Text>
              <Text style={styles.transactionDate}>Dün, 09:00</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: '#22C55E' }]}>+15.000 TL</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 17, 82, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  propsForDots: { 
    r: "5",             
    strokeWidth: "1",     
    stroke: "#21DEEB",   
    fill: "#0F056C"       
  },
  style: { 
    borderRadius: 16 
  },
 
  propsForBackgroundLines: {
    strokeDasharray: "", 
    strokeWidth: 0.5,
    stroke: "#E2E8F0"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  hello: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },
  welcome: {
    fontSize: 14,
    color: '#64748B',
  },
  salaryBox: {
    width: '92%',
    padding: 25,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#21DEEB',
    shadowOpacity: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bakiyeLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    fontWeight: '600',
  },
  salaryText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 10,
  },
  cardFooter: {
    marginTop: 15,
  },
  trendBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  trendText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  chartSection: {
    marginTop: 20,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom:10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 20,
    paddingRight: 40,
  },
  transactionsSection: {
    width: '90%',
    marginTop: 20,
    marginBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#21DEEB',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
  },
  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#E0F7F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 15,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748B',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
});