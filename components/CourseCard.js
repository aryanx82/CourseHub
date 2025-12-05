import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useBookmarks } from '../context/BookmarksContext';

export default function CourseCard({ course }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(course.id);

  const handleToggle = () => {
    toggleBookmark(course.id);
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: course.image }} style={styles.cardImage} />

      <View style={styles.cardBody}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{course.level}</Text>
        </View>

        <Text style={styles.cardTitle}>{course.title}</Text>
        <Text style={styles.cardSubtitle}>by {course.instructor}</Text>

        <View style={styles.cardFooter}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={14} color="#fff" />
            <Text style={styles.ratingText}>{course.rating}</Text>
          </View>

          <TouchableOpacity style={styles.bookmarkBtn} onPress={handleToggle}>
            <MaterialIcons
              name={bookmarked ? 'bookmark' : 'bookmark-border'}
              size={20}
              color={bookmarked ? '#6C7BFF' : '#333'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 12,
  },
  badge: {
    position: 'absolute',
    right: 12,
    top: -16,
    backgroundColor: '#1abc9c',
    padding: 5,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  cardTitle: { fontWeight: '800', fontSize: 16 },
  cardSubtitle: { color: '#666', marginTop: 5 },
  cardFooter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingBox: {
    backgroundColor: '#f29d3a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '700',
  },
  bookmarkBtn: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 6,
  },
});

