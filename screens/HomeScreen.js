import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CourseCard from '../components/CourseCard';
import { FEATURED_COURSES } from '../data/courses';

export default function HomeScreen() {
  const renderHeader = () => (
    <>
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
            <TouchableOpacity style={styles.notificationBtn}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.heroSubtitle}>
            Explore thousands of courses from world-class instructors.
          </Text>

          <View style={styles.searchRow}>
            <TextInput
              placeholder="What do you want to learn today?"
              style={styles.searchInput}
              placeholderTextColor="#666"
            />
            <TouchableOpacity style={styles.searchBtn}>
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

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.primaryCTA}>
              <Text style={styles.primaryCTAText}>Browse tracks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryCTA}>
              <Text style={styles.secondaryCTAText}>Get guidance</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tagRow}>
            {['Design', 'AI & Data', 'Marketing', 'Product'].map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>Featured Courses</Text>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="light-content" />

      <FlatList
        data={FEATURED_COURSES}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 18,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroFullWidth: {
    width: '100%',
    paddingTop: 70,
    paddingBottom: 60,
    alignItems: 'center',
  },
  heroContent: {
    width: '92%',
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
    marginBottom: 26,
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
    marginTop: 12,
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
  actionRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  primaryCTA: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
    marginRight: 10,
  },
  primaryCTAText: {
    textAlign: 'center',
    color: '#6C7BFF',
    fontWeight: '700',
  },
  secondaryCTA: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
  },
  secondaryCTAText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionWrapper: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
});

