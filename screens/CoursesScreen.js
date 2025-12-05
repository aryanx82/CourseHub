import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COURSES } from '../data/courses';

const FILTERS = ['All', 'Development', 'Design', 'Data', 'Business', 'Marketing', 'AI'];

export default function CoursesScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'All') return COURSES;
    return COURSES.filter((course) => course.category === activeFilter);
  }, [activeFilter]);

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={{ flex: 1 }}>
        <Text style={styles.level}>{item.level}</Text>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.metaText}>by {item.instructor}</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#6c7383" />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={14} color="#f29d3a" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.enrollBtn}>
        <Text style={styles.enrollText}>Enroll</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore curated courses</Text>
      <Text style={styles.subheading}>Build job-ready skills with mentor-led tracks.</Text>

      <FlatList
        data={FILTERS}
        horizontal
        keyExtractor={(filter) => filter}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveFilter(item)}
            style={[
              styles.filterChip,
              activeFilter === item && { backgroundColor: '#6C7BFF' },
            ]}
          >
            <Text style={[styles.filterText, activeFilter === item && { color: '#fff' }]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredCourses}
        keyExtractor={(course) => course.id}
        renderItem={renderCourse}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 18,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
  },
  subheading: {
    color: '#6c7383',
    marginTop: 6,
  },
  filterChip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#f1f2f6',
    marginRight: 10,
  },
  filterText: {
    fontWeight: '600',
    color: '#434e68',
  },
  courseCard: {
    flexDirection: 'row',
    borderRadius: 18,
    backgroundColor: '#f7f7fb',
    padding: 14,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 14,
  },
  level: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7E4BB3',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    color: '#6c7383',
    marginLeft: 6,
    fontSize: 13,
  },
  rating: {
    marginLeft: 4,
    fontWeight: '700',
    color: '#f29d3a',
  },
  enrollBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#e0d8ff',
  },
  enrollText: {
    color: '#6C7BFF',
    fontWeight: '700',
  },
});

