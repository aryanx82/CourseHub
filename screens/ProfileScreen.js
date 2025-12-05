import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarksContext';
import { COURSES } from '../data/courses';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { bookmarkedIds, isBookmarked, toggleBookmark } = useBookmarks();

  const bookmarkedCourses = useMemo(
    () => COURSES.filter((course) => bookmarkedIds.includes(course.id)),
    [bookmarkedIds]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>

      {bookmarkedCourses.length > 0 && (
        <View style={styles.savedSection}>
          <Text style={styles.savedTitle}>Saved courses</Text>
          {bookmarkedCourses.slice(0, 5).map((course) => (
            <View key={course.id} style={styles.profileCourseCard}>
              <Image source={{ uri: course.image }} style={styles.profileThumbnail} />
              <View style={{ flex: 1 }}>
                <Text style={styles.profileLevel}>{course.level}</Text>
                <Text style={styles.profileCourseTitle} numberOfLines={1}>
                  {course.title}
                </Text>
                <Text style={styles.profileMetaText} numberOfLines={1}>
                  by {course.instructor}
                </Text>
                <View style={styles.profileMetaRow}>
                  <View style={styles.profileMetaItem}>
                    <Ionicons name="time-outline" size={14} color="#6c7383" />
                    <Text style={styles.profileMetaText}>{course.duration}</Text>
                  </View>
                  <View style={styles.profileMetaItem}>
                    <Ionicons name="star" size={14} color="#f29d3a" />
                    <Text style={styles.profileRating}>{course.rating}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.profileBookmarkCircle}
                onPress={() => toggleBookmark(course.id)}
              >
                <MaterialIcons
                  name={isBookmarked(course.id) ? 'bookmark' : 'bookmark-border'}
                  size={20}
                  color={isBookmarked(course.id) ? '#6C7BFF' : '#4a4e69'}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.ctaBtn}>
        <Text style={styles.ctaText}>Continue Learning</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={signOut}>
        <Text style={styles.secondaryText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#6c7383',
    marginBottom: 32,
  },
  savedSection: {
    marginBottom: 32,
  },
  savedTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  profileCourseCard: {
    flexDirection: 'row',
    borderRadius: 18,
    backgroundColor: '#f8f8ff',
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  profileThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  profileLevel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7E4BB3',
  },
  profileCourseTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 2,
  },
  profileMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  profileMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  profileMetaText: {
    color: '#6c7383',
    marginLeft: 6,
    fontSize: 12,
  },
  profileRating: {
    marginLeft: 4,
    fontWeight: '700',
    color: '#f29d3a',
    fontSize: 12,
  },
  profileBookmarkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#e0d8ff',
  },
  ctaBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#6C7BFF',
    alignItems: 'center',
    marginBottom: 16,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryText: {
    color: '#4a4e69',
    fontWeight: '700',
  },
});

