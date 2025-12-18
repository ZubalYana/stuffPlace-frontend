import { useState } from "react";
import {
    Dialog,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
        await fetch(`http://localhost:5000/units/${unit._id}`, {
            method: "DELETE",
        });

        setUnits(prev => prev.filter(u => u._id !== unit._id));
        onClose();
    };

    return (
        <Dialog open onClose={onClose} maxWidth="md" fullWidth>
            <div className="p-6 relative">
                <IconButton
                    onClick={onClose}
                    className="absolute top-3 right-3"
                >
                    <CloseIcon />
                </IconButton>

                <h2 className="text-xl font-bold mb-4">Unit Details</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
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
                </div>

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
        </Dialog>
    );
};
