import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.badge}>About CourseHub</Text>
        <Text style={styles.title}>Empowering lifelong learners everywhere</Text>
        <Text style={styles.paragraph}>
        Inspired by the Online Course Finder experience, CourseHub helps you discover curated programs
        from trusted instructors and institutions. Our mission is to make quality education accessible,
        engaging, and tailored to each learner’s goals.
      </Text>

        <View style={styles.statGrid}>
        {[
          { label: 'Active Learners', value: '50K+' },
          { label: 'Expert Mentors', value: '1,200+' },
          { label: 'Projects Completed', value: '15K+' },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why learners choose us</Text>
          <Text style={styles.listItem}>• Adaptive recommendation engine tailored to your goals</Text>
          <Text style={styles.listItem}>• Weekly live events with industry mentors</Text>
          <Text style={styles.listItem}>• Career support spanning portfolios, interviews, and networking</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  badge: {
    color: '#7E4BB3',
    fontWeight: '700',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 14,
  },
  paragraph: {
    color: '#4a4e69',
    lineHeight: 22,
    marginBottom: 24,
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#f6f1ff',
    marginHorizontal: 6,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#7E4BB3',
  },
  statLabel: {
    marginTop: 6,
    color: '#6c7383',
    fontSize: 12,
  },
  section: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#f7f7fb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 6,
    color: '#4a4e69',
  },
});

