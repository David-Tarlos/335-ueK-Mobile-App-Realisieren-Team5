import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../atoms/Typography";
import BottomNavigationBar from "../organisms/BottomNavigationBar";

interface MainTemplateProps {
    title: string;
    children: React.ReactNode;
    currentRoute: string;
    onNavigate: (route: string) => void;
    scrollable?: boolean;
}

const MainTemplate: React.FC<MainTemplateProps> = ({
    title,
    children,
    currentRoute,
    onNavigate,
    scrollable = true,
}) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <View style={styles.container}>
                <Typography variant="header" style={styles.header}>
                    {title}
                </Typography>

                {scrollable ? (
                    <ScrollView contentContainerStyle={styles.content}>
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[styles.content, styles.flex1]}>
                        {children}
                    </View>
                )}

                <BottomNavigationBar
                    currentRoute={currentRoute}
                    onNavigate={onNavigate}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: "#ffffff",
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    flex1: {
        flex: 1,
    },
});

export default MainTemplate;
