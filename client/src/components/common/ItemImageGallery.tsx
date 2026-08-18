import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";

type ItemImageGalleryProps = {
  galerija?: ImageSourcePropType[];
  slika?: ImageSourcePropType;
  onImagePress: (img: ImageSourcePropType) => void;
};

export default function ItemImageGallery({
  galerija,
  slika,
  onImagePress,
}: ItemImageGalleryProps) {
  if (galerija) {
    return (
      <View style={styles.galleryContainer}>
        {galerija.map((img, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onImagePress(img)}
          >
            <Image source={img} style={styles.galleryImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (slika) {
    return (
      <View style={styles.galleryContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onImagePress(slika)}
        >
          <Image source={slika} style={styles.fullImage} />
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  galleryImage: { width: 350, height: 250, borderRadius: 20 },
  fullImage: { width: 600, height: 400, borderRadius: 20 },
});
