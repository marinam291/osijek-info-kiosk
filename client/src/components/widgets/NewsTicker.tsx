import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const isLargeScreen = screenWidth > 1600;

const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;/g, "-")
    .replace(/&nbsp;/g, " ");
};

type NewsItem = {
  id: number;
  title: string;
  date: string;
  imageUrl: string | null;
};

type ThemeColors = {
  cardBackground: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  background: string;
};

type NewsTickerProps = {
  language: string;
  colors: ThemeColors;
};

type WPPost = {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
};

export default function NewsTicker({ language, colors }: NewsTickerProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [fadeAnim] = useState(() => new Animated.Value(1));

  const isHR = language === "HR";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://www.osijek.hr/wp-json/wp/v2/posts?_embed&per_page=5",
        );
        const data = await response.json();

        const formattedNews = data.map((post: WPPost) => ({
          id: post.id,
          title: stripHtml(post.title?.rendered || ""),
          date: new Date(post.date).toLocaleDateString("hr-HR"),
          imageUrl:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        }));

        setNews(formattedNews);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: Platform.OS !== "web",
      }).start(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: Platform.OS !== "web",
        }).start();
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [news, fadeAnim]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <ActivityIndicator size="small" color={colors.accent} />
        <Text style={{ color: colors.textSecondary, marginLeft: 10 }}>
          {isHR ? "Učitavanje vijesti..." : "Loading news..."}
        </Text>
      </View>
    );
  }

  if (news.length === 0) return null;

  const currentNews = news[currentIndex];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBackground, borderColor: colors.border },
      ]}
    >
      <View style={[styles.headerBadge, { backgroundColor: colors.accent }]}>
        <Feather name="bell" size={isLargeScreen ? 18 : 14} color="#FFF" />
        <Text style={styles.headerBadgeText}>
          {isHR ? "AKTUALNO" : "LATEST NEWS"}
        </Text>
      </View>

      <Animated.View style={[styles.newsWrapper, { opacity: fadeAnim }]}>
        {currentNews.imageUrl && (
          <Image
            source={{ uri: currentNews.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.date, { color: colors.accent }]}>
            {currentNews.date}
          </Text>
          <Text
            style={[styles.title, { color: colors.textPrimary }]}
            numberOfLines={2}
          >
            {currentNews.title}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: isLargeScreen ? 180 : 120,
    borderRadius: isLargeScreen ? 30 : 20,
    borderWidth: 2,
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  headerBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: isLargeScreen ? 16 : 12,
    paddingVertical: isLargeScreen ? 6 : 4,
    borderBottomRightRadius: isLargeScreen ? 15 : 10,
    gap: 6,
    zIndex: 10,
  },
  headerBadgeText: {
    color: "#FFF",
    fontSize: isLargeScreen ? 14 : 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  newsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: isLargeScreen ? 240 : 140,
    height: "100%",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: isLargeScreen ? 30 : 20,
    paddingTop: isLargeScreen ? 25 : 15,
  },
  date: {
    fontSize: isLargeScreen ? 18 : 14,
    fontWeight: "bold",
    marginBottom: isLargeScreen ? 8 : 4,
  },
  title: {
    fontSize: isLargeScreen ? 28 : 20,
    fontWeight: "bold",
    lineHeight: isLargeScreen ? 36 : 28,
  },
});
