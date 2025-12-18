import { useState } from "react";
import {
    Dialog,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { FeedbackAlert, type FeedbackType } from "./FeedbackAlert";
export const UnitDetailsDialog = ({
    unit,
    onClose,
    setUnits,
}: {
    unit: any;
    onClose: () => void;
    setUnits: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
    const [editedUnit, setEditedUnit] = useState(unit);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackSeverity, setFeedbackSeverity] = useState<FeedbackType>("success");

    const handleSave = async () => {
        const res = await fetch(`http://localhost:5000/units/${unit._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedUnit),
        });

        const updated = await res.json();

        setUnits(prev =>
            prev.map(u => (u._id === updated._id ? updated : u))
        );

        onClose();
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/units/${unit._id}`, {
                method: "DELETE",
            });

            setUnits(prev => prev.filter(u => u._id !== unit._id));
            setFeedbackMessage("Unit deleted successfully!");
            setFeedbackSeverity("success");
            setFeedbackOpen(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            setFeedbackMessage("Failed to delete unit.");
            setFeedbackSeverity("error");
            setFeedbackOpen(true);
        }
    };


    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:5000/upload/unit", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        setEditedUnit((prev: any) => ({
            ...prev,
            images: [...prev.images, data.url],
        }));
    };

    const handleDeleteImage = (url: string) => {
        setEditedUnit((prev: any) => ({
            ...prev,
            images: prev.images.filter((img: string) => img !== url),
        }));

    };

    const handleDeleteAllImages = () => {
        setEditedUnit((prev: any) => ({
            ...prev,
            images: [],
        }));
    };


    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <div className="p-6 relative w-full">
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: "16px",
                        right: "16px"
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <h2 className="text-2xl font-bold mb-4">Unit Details</h2>

                <div className="mt-3">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">Images</h3>

                        <div className="flex gap-2">
                            <Button
                                startIcon={<AddPhotoAlternateIcon />}
                                component="label"
                                size="small"
                            >
                                Add
                                <input
                                    hidden
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            handleImageUpload(e.target.files[0]);
                                        }
                                    }}
                                />
                            </Button>

                            {editedUnit.images.length > 0 && (
                                <Button
                                    color="error"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteAllImages}
                                >
                                    Delete all
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {editedUnit.images.map((img: string) => (
                            <div
                                key={img}
                                className="relative group rounded overflow-hidden"
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-40 object-cover"
                                />

                                <button
                                    onClick={() => handleDeleteImage(img)}
                                    className="
                        absolute top-2 right-2
                        bg-black/60 text-white
                        w-7 h-7 rounded-full
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100
                        transition
                    "
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full flex gap-4 mb-4 mt-6">
                    <TextField
                        label="Occupancy"
                        value={editedUnit.occupancy}
                        onChange={e =>
                            setEditedUnit({ ...editedUnit, occupancy: e.target.value })
                        }
                    />
                    <TextField
                        label="Type (EN)"
                        value={editedUnit.type.en}
                        onChange={e =>
                            setEditedUnit({
                                ...editedUnit,
                                type: { ...editedUnit.type, en: e.target.value },
                            })
                        }
                    />
                    <TextField
                        label="Comfort Level"
                        value={editedUnit.comfortLevel.en || ""}
                        onChange={e =>
                            setEditedUnit({ ...editedUnit, comfortLevel: e.target.value })
                        }
                    />
                </div>

                <div className="w-full flex gap-4">
                    <TextField
                        label="Description (EN)"
                        fullWidth
                        multiline
                        rows={4}
                        value={editedUnit.description.en}
                        onChange={e =>
                            setEditedUnit({
                                ...editedUnit,
                                description: {
                                    ...editedUnit.description,
                                    en: e.target.value,
                                },
                            })
                        }
                    />

                    <TextField
                        label="Description (HU)"
                        fullWidth
                        multiline
                        rows={4}
                        className="mt-4"
                        value={editedUnit.description.hu}
                        onChange={e =>
                            setEditedUnit({
                                ...editedUnit,
                                description: {
                                    ...editedUnit.description,
                                    hu: e.target.value,
                                },
                            })
                        }
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <Button
                        color="error"
                        onClick={() => setConfirmDelete(true)}
                    >
                        Delete
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save changes
                    </Button>
                </div>

                {confirmDelete && (
                    <div className="mt-4 bg-red-50 p-4 rounded">
                        <p className="mb-2">
                            Are you sure you want to delete this unit?
                        </p>
                        <div className="flex gap-2">
                            <Button
                                color="error"
                                variant="contained"
                                onClick={handleDelete}
                            >
                                Yes, delete
                            </Button>
                            <Button onClick={() => setConfirmDelete(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <FeedbackAlert
                open={feedbackOpen}
                message={feedbackMessage}
                severity={feedbackSeverity}
                onClose={() => setFeedbackOpen(false)}
            />

        </Dialog>
    );
};
