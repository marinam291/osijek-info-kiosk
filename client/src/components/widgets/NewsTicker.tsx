import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

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
  title: { rendered: string };
  _embedded?: { "wp:featuredmedia"?: Array<{ source_url: string }> };
};

export default function NewsTicker({ language, colors }: NewsTickerProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeAnim] = useState(() => new Animated.Value(1));
  const { width } = useWindowDimensions();
  const scale = width / 1920;
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
        setCurrentIndex((prev) => (prev + 1) % news.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: Platform.OS !== "web",
        }).start();
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [news, fadeAnim]);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            height: 200 * scale,
            borderRadius: 30 * scale,
            borderWidth: 2 * scale,
          },
        ]}
      >
        <View
          style={[
            styles.headerBadge,
            {
              backgroundColor: colors.accent,
              paddingHorizontal: 18 * scale,
              paddingVertical: 8 * scale,
              borderBottomRightRadius: 16 * scale,
              gap: 8 * scale,
            },
          ]}
        >
          <Feather name="bell" size={20 * scale} color="#FFF" />
          <Text
            style={[
              styles.headerBadgeText,
              {
                fontSize: 16 * scale,
              },
            ]}
          >
            {isHR ? "AKTUALNO - GRAD OSIJEK" : "LATEST NEWS - CITY OF OSIJEK"}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text
              style={[
                styles.loadingText,
                { color: colors.textSecondary, fontSize: 20 * scale },
              ]}
            >
              {isHR ? "Učitavam vijesti..." : "Loading news..."}
            </Text>
          </View>
        ) : news.length === 0 ? (
          <View style={styles.loadingContainer}>
            <Text
              style={[
                styles.loadingText,
                { color: colors.textSecondary, fontSize: 20 * scale },
              ]}
            >
              {isHR ? "Nema dostupnih vijesti." : "No news available."}
            </Text>
          </View>
        ) : (
          <Animated.View style={[styles.newsWrapper, { opacity: fadeAnim }]}>
            {news[currentIndex].imageUrl && (
              <Image
                source={{ uri: news[currentIndex].imageUrl! }}
                style={[
                  styles.image,
                  {
                    width: 260 * scale,
                  },
                ]}
                resizeMode="cover"
              />
            )}
            <View
              style={[
                styles.textContainer,
                {
                  paddingHorizontal: 35 * scale,
                  paddingTop: 30 * scale,
                },
              ]}
            >
              <Text
                style={[
                  styles.date,
                  {
                    color: colors.accent,
                    fontSize: 20 * scale,
                    marginBottom: 8 * scale,
                  },
                ]}
              >
                {news[currentIndex].date}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    color: colors.textPrimary,
                    fontSize: 32 * scale,
                    lineHeight: 40 * scale,
                  },
                ]}
                numberOfLines={2}
              >
                {news[currentIndex].title}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>

      {!isHR && (
        <Text
          style={[
            styles.notice,
            {
              color: colors.textSecondary,
              fontSize: 16 * scale,
              marginTop: 12 * scale,
            },
          ]}
        >
          * News available in Croatian language only.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  container: {
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontStyle: "italic",
  },
  notice: {
    textAlign: "center",
    fontStyle: "italic",
  },
  headerBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  headerBadgeText: {
    color: "#FFF",
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
    height: "100%",
  },
  textContainer: {
    flex: 1,
  },
  date: {
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
  },
});
