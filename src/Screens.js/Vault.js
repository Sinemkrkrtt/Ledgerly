import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { FontAwesome5, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Vault = () => {
    const assets = [
        { id: '1', name: 'Bitcoin', ticker: 'BTC', amount: '0.25 BTC', value: '250.000,00 TL', profit: '+5.000,00 TL', color: '#F7931A', iconName: 'bitcoin', library: 'FontAwesome5' },
        { id: '2', name: 'Gram Altın', ticker: 'GAU', amount: '15.5 gr', value: '47.275,00 TL', profit: '+1.250,00 TL', color: '#FFD700', iconName: 'gold', library: 'MaterialCommunityIcons' },
        { id: '3', name: 'ABD Doları', ticker: 'USD', amount: '1.500 $', value: '46.500,00 TL', profit: '-200,00 TL', color: '#85BB65', iconName: 'dollar-sign', library: 'FontAwesome5' },
        { id: '4', name: 'Ethereum', ticker: 'ETH', amount: '1.2 ETH', value: '105.400,00 TL', profit: '+8.450,00 TL', color: '#627EEA', iconName: 'ethereum', library: 'FontAwesome5' },
        { id: '5', name: 'Türk Hava Yolları', ticker: 'THYAO', amount: '100 Lot', value: '28.400,00 TL', profit: '+450,00 TL', color: '#E30613', iconName: 'airplane', library: 'Ionicons' }
    ];

    const marketData = [
        { id: '1', name: 'BIST 100', price: '9.450', change: '+0.5%', up: true, trend: [10, 18, 12, 22, 19] },
        { id: '2', name: 'USD/TRY', price: '33.20', change: '-0.1%', up: false, trend: [20, 15, 18, 14, 12] },
        { id: '3', name: 'XAU/USD', price: '2.350', change: '+0.8%', up: true, trend: [8, 12, 16, 20, 24] },
        { id: '4', name: 'BTC/USDT', price: '64.210', change: '+2.4%', up: true, trend: [10, 25, 15, 35, 40] },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
        
                <View style={styles.vaultCard}>
                    <View style={[styles.cardGlow, styles.glowTop]} />
                    <View style={[styles.cardGlow, styles.glowBottom]} />
                    <View style={styles.content}>
                        <Text style={styles.vaultLabel}>Toplam Varlık</Text>
                        <TouchableOpacity style={styles.total} activeOpacity={0.8}>
                            <Text style={styles.totalText}>₺ 452.850,00</Text>
                        </TouchableOpacity>
                        <View style={styles.badgeRow}>
                            <View style={styles.profitBadge}>
                                <Text style={styles.profitText}>▲ +₺ 1.250 (%0.28)</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Assets List Section */}
                <View style={styles.assetsSection}>
                    <View style={styles.assetsHeader}>
                        <Text style={styles.assetsLabel}>Varlıklar</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>Varlık Ekle</Text>
                        </TouchableOpacity>
                    </View>
                    {assets.map((asset) => (
                        <View key={asset.id} style={styles.assetItem}>
                            <View style={[styles.iconWrapper, { backgroundColor: `${asset.color}26` }]}>
                                {asset.library === 'FontAwesome5' && <FontAwesome5 name={asset.iconName} size={20} color={asset.color} />}
                                {asset.library === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={asset.iconName} size={24} color={asset.color} />}
                                {asset.library === 'Ionicons' && <Ionicons name={asset.iconName} size={20} color={asset.color} />}
                            </View>
                            <View style={styles.assetDetails}>
                                <Text style={styles.assetName}>{asset.name}</Text>
                                <View style={styles.tickerBadge}>
                                    <Text style={styles.assetTicker}>{asset.ticker}</Text>
                                </View>
                            </View>
                            <View style={styles.assetValueContainer}>
                                <Text style={styles.assetValue}>{asset.value}</Text>
                                <Text style={[styles.assetProfit, { color: asset.profit.startsWith('+') ? '#4ADE80' : '#FB7185' }]}>
                                    {asset.profit}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={[styles.assetsSection, { marginTop: 10 }]}>
                    <View style={styles.marketTitleRow}>
                        <Text style={styles.assetsLabel}>Piyasalar</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                        {marketData.map((item) => (
                            <View key={item.id} style={styles.proTickerItem}>
                                <View style={styles.tickerTop}>
                                    <Text style={styles.tickerNameText}>{item.name}</Text>
                                    <Text style={[styles.tickerChangeText, { color: item.up ? '#4ADE80' : '#FB7185' }]}>
                                        {item.up ? '▲' : '▼'} {item.change}
                                    </Text>
                                </View>
                                <View style={styles.tickerBottom}>
                                    <Text style={styles.tickerPriceText}>{item.price}</Text>
                                    <View style={styles.miniChart}>
                                        {item.trend.map((val, i) => (
                                            <View key={i} style={[styles.chartBar, { height: val, backgroundColor: item.up ? '#4ADE80' : '#FB7185' }]} />
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Vault;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 10,
  },
  vaultCard: {
    width: '92%',
    height: 180,
    backgroundColor: '#030C46',
    borderRadius: 24,
    marginTop: 20,
    overflow: 'hidden', 
    elevation: 15,
    shadowColor: '#0FEFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },

  vaultLabel: {
    color: '#B5C0CE',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  total: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 37,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom:5,
  },

  cardGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0FEFFF',
    opacity: 0.25,
    zIndex: 1,
  },
  glowTop: {
    top: -100,
    right: -80,
  },
  glowBottom: {
    bottom: -180,
    left: -100,
    width: 250,
    height: 250,
    opacity: 0.3, 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', 
    paddingLeft: 25,
    zIndex: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 12,
  
  },
  profitBadge: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  profitText: {
    color: '#43F685',
    fontSize: 14,
    fontWeight: '700',
    
  },
  assetsSection:{
    width:'90%',
    marginTop:25,
  },
  assetsLabel:{
    fontSize:18,
    fontWeight:'700',
    marginBottom:15,

  },
  assetsSection: {
    width: '90%',
    marginTop: 30,
    paddingBottom: 20,
  },
  assetsLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 15,
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  assetIconText: {
    fontSize: 22,
  },
  assetDetails: {
    flex: 1, 
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  assetTicker: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  assetValueContainer: {
    alignItems: 'flex-end',
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  assetProfit: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
   
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
},
tickerBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
},
assetTicker: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
},
assetsHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
},
addButton:{
    paddingHorizontal:0,
},

addButtonText:{
    color: '#02F7F7',
    fontWeight:'700',
    fontSize:14,
    marginTop:-2,

    borderBottomColor: '#04D3D3',
    borderBottomWidth:0.5,
    letterSpacing:0.3,
},
tickerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#030C46', 
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 239, 255, 0.2)', 
    position: 'absolute', 
    bottom: 0,
  },
  tickerContent: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    paddingVertical: 10,
  },
  tickerName: {
    color: '#B5C0CE',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
  },
  tickerPrice: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 6,
  },
  tickerChange: {
    fontSize: 12,
    fontWeight: '800',
  },

  marketTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
     marginBottom: 15 
    },
    proTickerItem: {
        backgroundColor: '#F8FAFC', 
        width: 140, 
        padding: 12,
         borderRadius: 16,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    tickerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
     },
    tickerNameText: { 
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B' 
},
    tickerChangeText: { 
    fontSize: 11, 
    fontWeight: '800' },
    tickerBottom: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end' },
    tickerPriceText: { 
    fontSize: 15, 
    fontWeight: '700',
     color: '#1E293B'
     },
    miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end', 
    height: 20,
    gap: 2 },
    chartBar: { 
    width: 3,
    borderRadius: 1 
},
})