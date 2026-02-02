import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, TextInput, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useRef } from 'react' // Tek useState
import DateTimePicker from '@react-native-community/datetimepicker'; // Import düzeltildi

export default function Add() {
    const [type, setType] = useState('gider');
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [date, setDate] = useState(new Date()); // useState düzeltildi
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [notes, setNotes] = useState('');

    const slideAnim = useRef(new Animated.Value(0)).current;
    const screenWidth = Dimensions.get('window').width;

    const handleToggle = (selection) => {
        setType(selection);
        Animated.spring(slideAnim, {
            toValue: selection == 'gider' ? 0 : 1,
            useNativeDriver: false,
            friction: 7,
        }).start();
    };

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [4, (screenWidth * 0.9) / 2],
    });

    const categories = [
        { id: '1', name: 'Yemek', icon: '🍔', color: '#F87171', catType: 'gider' },
        { id: '2', name: 'Market', icon: '🛒', color: '#FBBF24', catType: 'gider' },
        { id: '3', name: 'Ulaşım', icon: '🚗', color: '#60A5FA', catType: 'gider' },
        { id: '4', name: 'Eğlence', icon: '🎮', color: '#A78BFA', catType: 'gider' },
        { id: '5', name: 'Sağlık', icon: '🏥', color: '#F472B6', catType: 'gider' },
        { id: '7', name: 'Giyim', icon: '👕', color: '#818CF8', catType: 'gider' },
        { id: '13', name: 'Eğitim', icon: '📚', color: '#2DD4BF', catType: 'gider' },
        { id: '9', name: 'Maaş', icon: '💰', color: '#10B981', catType: 'gelir' },
        { id: '10', name: 'Burs', icon: '🎓', color: '#3B82F6', catType: 'gelir' },
        { id: '11', name: 'Ek İş', icon: '🚀', color: '#8B5CF6', catType: 'gelir' },
        { id: '14', name: 'Yatırım', icon: '📈', color: '#4ADE80', catType: 'gelir' },
        { id: '15', name: 'Satış', icon: '🏷️', color: '#F472B6', catType: 'gelir' },
        { id: '16', name: 'Hediye', icon: '🎁', color: '#F87171', catType: 'gelir' },
        { id: '17', name: 'Faiz', icon: '🏦', color: '#60A5FA', catType: 'gelir' },
        { id: '8', name: 'Diğer', icon: '📦', color: '#A3A3A3', catType: 'both' },
    ]

    const displayCategories = categories.filter(cat => 
        cat.catType === type || cat.catType === 'both'
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Üst Switch */}
            <View style={styles.switch}>
                <Animated.View style={[styles.slidingBackground, { transform: [{ translateX }], backgroundColor: type === 'gider' ? '#FD6D6D' : '#19DEEC' }]} />
                <TouchableOpacity style={styles.Button} onPress={() => handleToggle('gider')} activeOpacity={1}>
                    <Text style={[styles.switchText, type === 'gider' && styles.activeText]}>Gider</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button} onPress={() => handleToggle('gelir')} activeOpacity={1}>
                    <Text style={[styles.switchText, type === 'gelir' && styles.activeText]}>Gelir</Text>
                </TouchableOpacity>
            </View>

            {/* Tutar Girişi */}
            <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Tutar</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.amountInput, { color: type === 'gider' ? '#FF5D5D' : '#24EAF9' }]}
                        placeholder="0.00"
                        placeholderTextColor="#CBD5E1"
                        keyboardType="decimal-pad"
                        autoFocus={true} // Sadece ilk girişte klavye açılır
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <Text style={[styles.currencyText, { color: type === 'gider' ? '#FF5D5D' : '#15ADB8' }]}>₺</Text>
                </View>
            </View>

            {/* Kategoriler */}
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryTitle}>Kategori</Text>
                <View style={styles.grid}>
                    {displayCategories.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.categoryItem, selectedCategory === item.id && { borderColor: type === 'gider' ? '#FF5D5D' : '#24EAF9', borderWidth: 2 }]}
                            onPress={() => setSelectedCategory(item.id)}
                        >
                            <Text style={styles.categoryIcon}>{item.icon}</Text>
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Detaylar (Tarih ve Not) */}
            <View style={styles.detailsContainer}>
                <TouchableOpacity style={styles.dateSection} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.detailLabel}>İşlem Tarihi</Text>
                    <View style={styles.datePickerButton}>
                        <Text style={styles.dateText}>{date.toLocaleDateString('tr-TR')}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.notesSection}>
                    <Text style={styles.detailLabel}>Açıklama</Text>
                    <TextInput
                        style={styles.noteInput}
                        placeholder='Not ekle...'
                        placeholderTextColor="#CBD5E1"
                        value={notes}
                        onChangeText={setNotes}
                    />
                </View>
            </View>

            {/* Tarih Seçici Modal - Artık Daha Güvenli */}
            {showDatePicker && (
                <Modal transparent={true} animationType="fade">
                    <TouchableOpacity 
                        style={styles.modalOverlay} 
                        activeOpacity={1} 
                        onPress={() => setShowDatePicker(false)}
                    >
                        <View style={styles.pickerContainer}>
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="inline"
                              maximumDate={new Date()} // Gelecek tarihler kilitli
                                accentColor={type === 'gider' ? '#FF5D5D' : '#1CE6F4'} // TAM İSTEDİĞİN DİNAMİĞİ BURAYA KOYDUK d
                                textColor="#1E293B"   // Yazıların netliği için d
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) setDate(selectedDate);
                                    if (event.type !== 'set') setShowDatePicker(false);
                                    // iOS'ta 'set' butonuna basınca kapanması için:
                                    if (event.type === 'set') setShowDatePicker(false);
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
            <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: type === 'gider' ? '#FF5D5D' : '#1CE6F4' }]}>
                <Text  style={styles.saveButtonText}>Kaydet</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 10,
    },
    switch: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        backgroundColor: '#F1F5F9',
        borderRadius: 25,
        padding: 4,
        position: 'relative',
    },
    slidingBackground: {
        position: 'absolute',
        width: '49%',
        height: '100%',
        borderRadius: 22,
        top: '2.5%',
        left: 0,
        elevation: 4,
    },
    Button: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    switchText: {
        color: '#64748B',
        fontSize: 18,
        fontWeight: '600',
    },
    activeText: {
        color: '#FFFFFF',
    },
    amountContainer: {
        marginTop: 60,
        width: '100%',
        alignItems: 'center',
    },
    amountLabel: {
        fontSize: 16,
      color: '#000000',
        fontWeight: '500',
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center', // ₺ simgesini sayıya dikeyde hizalar
        justifyContent: 'center', // Tüm grubu (Sayı+₺) tam ortada tutar
        width: '100%',
        
    },
    amountInput: {
        fontSize: 54, // Daha belirgin yaptık
        fontWeight: '800',
        padding: 0,
        margin: 0,
        textAlign: 'center',
        // width değerini sildik; sadece içeriği kadar yer kaplayacak
    },
    currencyText: {
        fontSize: 32,
        fontWeight: '600',
        marginLeft: 10, 
        alignSelf: 'center',
         color: '#64748B',
    },
     categoryTitle: {
         fontSize: 16,
        color: '#000000',
        fontWeight: '500',
        marginBottom: 15,
     },
     categoryContainer:{
         marginTop: 45,
        width: '100%',
        alignItems: 'center',
     },
     grid:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
     },

     categoryItem: {
        width: '25%', // 3 sütunlu yapı
        backgroundColor: '#F8FAFC',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'transparent', // Seçili değilken belli olmasın
        },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 5,
        },
    categoryName: {
        fontSize: 12,
        color: '#475569',
        fontWeight: '500',
        },
    detailsContainer: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 30,
        justifyContent: 'space-between',
    },
    dateSection: {
        width: '45%', // Ekranın yaklaşık yarısı
    },
    notesSection: {
        width: '50%', // Diğer yarısı
        border:'none',
    },
    detailLabel: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '600',
        marginBottom: 8,
    },
    datePickerButton: {
        backgroundColor: '#F8FAFC',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 12,
        borderBottomWidth: 1.5, // Sadece alt çizgi
  borderBottomColor: '#E2E8F0', // Çizgi rengi
        height: 50,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 15,
        color: '#1E293B',
        fontWeight: '500',
    },
    noteInput: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        fontSize: 15,
        color: '#1E293B',
        borderBottomWidth: 1.5, // Sadece alt çizgi
  borderBottomColor: '#E2E8F0', // Çizgi rengi
      
    },
    modalOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', // Arka planı hafif karartır
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
},
pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
},
saveButton:{
    width:'70%',
    height:'8%',
    borderRadius:20,
    marginTop:25,
    justifyContent:'center',
    alignItems:'center',
},
saveButtonText:{
    color:'#ffffff',
    fontSize:18,
    fontWeight:'700',
}
       
}
)