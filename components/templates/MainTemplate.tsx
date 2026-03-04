import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNavigationBar from "../organisms/BottomNavigationBar";
import PageHeader from "../molecules/PageHeader";
import { BottomNavRoute } from "../../types/navigation";
import { COLORS } from "../../theme/colors";

interface MainTemplateProps {
    title: string;
    children: React.ReactNode;
    currentRoute: BottomNavRoute;
    onNavigate: (route: BottomNavRoute) => void;
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
                <PageHeader title={title} />

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
        backgroundColor: COLORS.screenBackground,
    },
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 72,
        paddingBottom: 24,
    },
    flex1: {
        flex: 1,
    },
});

export default MainTemplate;
