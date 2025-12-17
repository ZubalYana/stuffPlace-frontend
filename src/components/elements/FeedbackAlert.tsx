import { Alert, Snackbar } from "@mui/material";

export type FeedbackType = "success" | "error" | "info" | "warning";

interface FeedbackAlertProps {
    open: boolean;
    message: string;
    severity: FeedbackType;
    onClose: () => void;
}

export const FeedbackAlert = ({
    open,
    message,
    severity,
    onClose,
}: FeedbackAlertProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="standard"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
