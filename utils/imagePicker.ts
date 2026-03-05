import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

/**
 * Opens the device's image library and returns the selected image URI.
 * Requests media library permissions first — shows an alert and returns `null` if denied.
 * The image is cropped to a 16:9 aspect ratio.
 * @returns The URI of the selected image, or `null` if cancelled or permission denied.
 */
export const pickFlagImage = async (): Promise<string | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!");
        return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
    });

    if (result.canceled) return null;
    return result.assets[0].uri;
};
