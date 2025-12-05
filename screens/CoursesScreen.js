import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useBookmarks } from '../context/BookmarksContext';
import { COURSES } from '../data/courses';

const FILTERS = ['All', 'Development', 'Design', 'Data', 'Business', 'Marketing', 'AI'];

export default function CoursesScreen() {
  const route = useRoute();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'All') return COURSES;
    return COURSES.filter((course) => course.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const categoryFromRoute = route.params?.category;
    if (categoryFromRoute && FILTERS.includes(categoryFromRoute)) {
      setActiveFilter(categoryFromRoute);
    }
  }, [route.params?.category]);

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
      <View style={styles.actionsCol}>
        <TouchableOpacity
          style={styles.bookmarkCircle}
          onPress={() => toggleBookmark(item.id)}
        >
          <MaterialIcons
            name={isBookmarked(item.id) ? 'bookmark' : 'bookmark-border'}
            size={20}
            color={isBookmarked(item.id) ? '#6C7BFF' : '#4a4e69'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.enrollBtn}>
          <Text style={styles.enrollText}>Enroll</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Explore curated courses</Text>
      <Text style={styles.subheading}>Build job-ready skills with mentor-led tracks.</Text>

      <View style={styles.filterBar}>
        <FlatList
          data={FILTERS}
          horizontal
          keyExtractor={(filter) => filter}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveFilter(item)}
              style={[
                styles.filterChip,
                activeFilter === item && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(course) => course.id}
        renderItem={renderCourse}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 26,
    paddingHorizontal: 18,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
  },
  subheading: {
    color: '#6c7383',
    marginTop: 8,
  },
  filterBar: {
    marginTop: 18,
    marginBottom: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f6f7fb',
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#f1f2f6',
    marginRight: 8,
  },
  filterText: {
    fontWeight: '600',
    color: '#434e68',
  },
  filterChipActive: {
    backgroundColor: '#6C7BFF',
    shadowColor: '#6C7BFF',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  filterTextActive: {
    color: '#fff',
  },
  courseCard: {
    flexDirection: 'row',
    borderRadius: 18,
    backgroundColor: '#f8f8ff',
    padding: 16,
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
  actionsCol: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  bookmarkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0d8ff',
  },
  enrollBtn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0d8ff',
  },
  enrollText: {
    color: '#6C7BFF',
    fontWeight: '700',
  },
});

