import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CourseCard from '../components/CourseCard';
import { FEATURED_COURSES } from '../data/courses';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigation.navigate('Courses', { search: trimmed });
    // optionally clear search after navigating
    // setQuery('');
  };

  const renderHeader = () => (
      <LinearGradient
        colors={['#6C7BFF', '#7E4BB3']}
        style={styles.heroFullWidth}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.heroContent}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.kicker}>Personalized for you</Text>
              <Text style={styles.heroTitle}>
                Discover Your Next{'\n'}Learning Adventure
              </Text>
            </View>
          </View>

          <Text style={styles.heroSubtitle}>
            Explore thousands of courses from world-class instructors.
          </Text>

          <View style={styles.searchRow}>
            <TextInput
              placeholder="What do you want to learn today?"
              style={styles.searchInput}
              placeholderTextColor="#666"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Ionicons name="search" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            {[
              { label: 'Students', value: '50K+' },
              { label: 'Instructors', value: '1,200+' },
              { label: 'Courses', value: '5,000+' },
            ].map((stat) => (
              <View key={stat.label} style={styles.statPill}>
                <Text style={styles.statNum}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" />

      {renderHeader()}

      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>Featured Courses</Text>
      </View>

      <FlatList
        data={FEATURED_COURSES}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroFullWidth: {
    width: '100%',
    paddingTop: 64,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    width: '94%',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kicker: {
    color: '#dcd6ff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#EDEAFE',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  searchRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchBtn: {
    marginLeft: 10,
    backgroundColor: '#6e4be8',
    padding: 10,
    borderRadius: 50,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statPill: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 14,
    paddingVertical: 10,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statNum: { color: '#fff', fontWeight: '800', fontSize: 18 },
  statLabel: { color: '#EDEAFE', marginTop: 4, fontSize: 12 },
  sectionWrapper: {
    paddingTop: 18,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'left',
  },
});
