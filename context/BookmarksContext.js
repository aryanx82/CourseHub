import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const BookmarksContext = createContext(null);

const BOOKMARKS_KEY = '@coursehub_bookmarks';

export function BookmarksProvider({ children }) {
  const { user } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const storageKey = user?.email ? `${BOOKMARKS_KEY}_${user.email}` : null;

  useEffect(() => {
    const hydrate = async () => {
      setLoading(true);
      setBookmarkedIds([]);

      if (!storageKey) {
        setLoading(false);
        return;
      }

      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setBookmarkedIds(parsed);
          }
        }
      } catch (e) {
        // ignore for now
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, [storageKey]);

  useEffect(() => {
    const persist = async () => {
      if (!storageKey) return;
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(bookmarkedIds));
      } catch (e) {
        // ignore for now
      }
    };

    if (!loading) {
      persist();
    }
  }, [bookmarkedIds, loading, storageKey]);

  const addBookmark = (id) => {
    setBookmarkedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeBookmark = (id) => {
    setBookmarkedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id) => bookmarkedIds.includes(id);

  const value = useMemo(
    () => ({
      bookmarkedIds,
      loading,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      isBookmarked,
    }),
    [bookmarkedIds, loading]
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return ctx;
}
