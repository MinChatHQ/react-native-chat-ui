import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        justifyContent: "flex-end",
        marginRight: 10,
        marginTop: 12,
        position: "relative",
        boxSizing: "border-box"

    },
    container: {
        width: "auto",
        maxWidth: 200,
        flexWrap: "wrap",
        marginBottom: 12,
        marginLeft: 10,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        position: "relative",
        gap: 10,
        boxSizing: "border-box",
    },
    background: {
        top:0, 
        left:0,
         right:0, 
         bottom:0,
        position: "absolute",
        borderRadius: 16,
    },
    loadingContainer: {
        position: "absolute",
        height: "100%",
        alignItems: "center",
    },
    contentContainer: {
        textAlign: "left",
        alignSelf: "flex-start",
        lineHeight: "auto",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        position: "relative",
        boxSizing: "border-box",
    },
    contentText: {
        // fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"",
        color: "#000000",
        fontSize: 14,

    }
})
 
export default styles