import { IconPicker } from "./IconPicker";
import { useEffect, useState } from "react";
import {
    TextField,
    Button,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { Trash2, Pencil, X, Check } from "lucide-react";
import { FeedbackAlert } from "./FeedbackAlert";
import type { FeedbackType } from "./FeedbackAlert";

type Facility = {
    _id: string;
    title: { en: string; hu: string };
    text: { en: string; hu: string };
    icon: string;
};

export const FacilitiesControlBlock = () => {
    const [facilityTitleEn, setFacilityTitleEn] = useState("");
    const [facilityTitleHu, setFacilityTitleHu] = useState("");
    const [facilityTextEn, setFacilityTextEn] = useState("");
    const [facilityTextHu, setFacilityTextHu] = useState("");
    const [facilityIcon, setFacilityIcon] = useState("");

    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [feedback, setFeedback] = useState<{
        open: boolean;
        message: string;
        severity: FeedbackType;
    }>({
        open: false,
        message: "",
        severity: "success",
    });

    const showFeedback = (severity: FeedbackType, message: string) => {
        setFeedback({ open: true, severity, message });
    };

    const resetForm = () => {
        setFacilityTitleEn("");
        setFacilityTitleHu("");
        setFacilityTextEn("");
        setFacilityTextHu("");
        setFacilityIcon("");
    };

    const canSubmit =
        facilityTitleEn.trim() &&
        facilityTitleHu.trim() &&
        facilityTextEn.trim() &&
        facilityTextHu.trim() &&
        facilityIcon;

    /* =========================
        FETCH
    ========================== */
    const fetchFacilities = async () => {
        try {
            const res = await fetch("http://localhost:5000/facilities");
            if (!res.ok) throw new Error();
            const data = await res.json();
            setFacilities(data);
        } catch {
            showFeedback("error", "Failed to load facilities");
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    /* =========================
        CREATE
    ========================== */
    const handleCreate = async () => {
        if (!canSubmit) return;

        try {
            setIsLoading(true);

            const res = await fetch("http://localhost:5000/facilities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    icon: facilityIcon,
                    title: { en: facilityTitleEn, hu: facilityTitleHu },
                    text: { en: facilityTextEn, hu: facilityTextHu },
                }),
            });

            if (!res.ok) throw new Error();

            showFeedback("success", "Facility created");
            resetForm();
            fetchFacilities();
        } catch {
            showFeedback("error", "Failed to create facility");
        } finally {
            setIsLoading(false);
        }
    };

    /* =========================
        UPDATE
    ========================== */
    const handleUpdate = async (facility: Facility) => {
        try {
            const res = await fetch(
                `http://localhost:5000/facilities/${facility._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(facility),
                }
            );

            if (!res.ok) throw new Error();

            setEditingId(null);
            showFeedback("success", "Facility updated");
            fetchFacilities();
        } catch {
            showFeedback("error", "Failed to update facility");
        }
    };

    /* =========================
        DELETE
    ========================== */
    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(
                `http://localhost:5000/facilities/${id}`,
                { method: "DELETE" }
            );

            if (!res.ok) throw new Error();

            setFacilities((prev) => prev.filter((f) => f._id !== id));
            showFeedback("success", "Facility deleted");
        } catch {
            showFeedback("error", "Failed to delete facility");
        }
    };

    return (
        <div className="w-full text-[#1E1E1E] mt-6 space-y-6">
            <h3 className="font-bold text-[24px]">Facilities Management</h3>

            <div className="flex flex-col lg:flex-row gap-[4%]">
                {/* CREATE */}
                <div className="lg:w-[48%]">
                    <IconPicker value={facilityIcon as any} onChange={setFacilityIcon} />

                    <TextField
                        label="Title EN"
                        fullWidth
                        value={facilityTitleEn}
                        inputProps={{ maxLength: 20 }}
                        helperText={`${facilityTitleEn.length}/20`}
                        onChange={(e) => setFacilityTitleEn(e.target.value)}
                        sx={{ mt: 3 }}
                    />

                    <TextField
                        label="Title HU"
                        fullWidth
                        value={facilityTitleHu}
                        inputProps={{ maxLength: 20 }}
                        helperText={`${facilityTitleHu.length}/20`}
                        onChange={(e) => setFacilityTitleHu(e.target.value)}
                        sx={{ mt: 1 }}
                    />

                    <TextField
                        label="Text EN"
                        fullWidth
                        multiline
                        minRows={2}
                        value={facilityTextEn}
                        inputProps={{ maxLength: 140 }}
                        helperText={`${facilityTextEn.length}/140`}
                        onChange={(e) => setFacilityTextEn(e.target.value)}
                        sx={{ mt: 1 }}
                    />

                    <TextField
                        label="Text HU"
                        fullWidth
                        multiline
                        minRows={2}
                        value={facilityTextHu}
                        inputProps={{ maxLength: 140 }}
                        helperText={`${facilityTextHu.length}/140`}
                        onChange={(e) => setFacilityTextHu(e.target.value)}
                        sx={{ mt: 1 }}
                    />


                    <Button
                        variant="contained"
                        disabled={!canSubmit || isLoading}
                        onClick={handleCreate}
                        sx={{
                            mt: 3,
                            width: "100%",
                            height: 48,
                            backgroundColor: "#AE7461",
                            fontWeight: "bold",
                            fontSize: "16px",
                            "&:hover": { backgroundColor: "#966554" },
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={22} />
                        ) : (
                            "Create Facility"
                        )}
                    </Button>
                </div>

                {/* LIST */}
                <div className="lg:w-[48%] space-y-3">
                    {facilities.length === 0 && (
                        <p className="text-sm text-gray-500">
                            No facilities yet
                        </p>
                    )}

                    {facilities.map((f) => (
                        <div
                            key={f._id}
                            className="p-3 border rounded space-y-2"
                        >
                            {editingId === f._id ? (
                                <>
                                    <TextField
                                        size="small"
                                        label="Title EN"
                                        value={f.title.en}
                                        onChange={(e) =>
                                            setFacilities((prev) =>
                                                prev.map((x) =>
                                                    x._id === f._id
                                                        ? {
                                                            ...x,
                                                            title: {
                                                                ...x.title,
                                                                en: e.target.value,
                                                            },
                                                        }
                                                        : x
                                                )
                                            )
                                        }
                                    />
                                    <TextField
                                        size="small"
                                        label="Text EN"
                                        value={f.text.en}
                                        onChange={(e) =>
                                            setFacilities((prev) =>
                                                prev.map((x) =>
                                                    x._id === f._id
                                                        ? {
                                                            ...x,
                                                            text: {
                                                                ...x.text,
                                                                en: e.target.value,
                                                            },
                                                        }
                                                        : x
                                                )
                                            )
                                        }
                                    />
                                    <div className="flex gap-1">
                                        <IconButton onClick={() => handleUpdate(f)}>
                                            <Check size={18} />
                                        </IconButton>
                                        <IconButton onClick={() => setEditingId(null)}>
                                            <X size={18} />
                                        </IconButton>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between">
                                        <strong>{f.title.en}</strong>
                                        <div>
                                            <IconButton onClick={() => setEditingId(f._id)}>
                                                <Pencil size={18} />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(f._id)}>
                                                <Trash2 size={18} />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {f.text.en}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <FeedbackAlert
                open={feedback.open}
                message={feedback.message}
                severity={feedback.severity}
                onClose={() =>
                    setFeedback((f) => ({ ...f, open: false }))
                }
            />
        </div>
    );
};
