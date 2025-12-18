import { useState } from "react";
import type { ChangeEvent } from "react";
import { PhotoCamera } from "@mui/icons-material";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
} from "@mui/material";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { FeedbackAlert } from "./FeedbackAlert";
import { UnitsAdminView } from "./UnitsAdminView";
export const UnitsControlBlock = ({ units, setUnits }: { units: any[]; setUnits: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });
    const [occupancy, setOccupancy] = useState("");
    const [roomType, setRoomType] = useState<RoomType | "">("");
    const [comfort, setComfort] = useState<ComfortType | "">("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [descriptionHu, setDescriptionHu] = useState("");

    const OCCUPANCY_OPTIONS = ["1", "2", "4", "6", "8"];
    const ROOM_TYPE_OPTIONS = ["Single", "Double", "Twin", "Suite"];
    const COMFORT_OPTIONS = ["Economy", "Standard", "Comfort", "Luxury"];

    const ROOM_TYPE_MAP = {
        Single: "Egyágyas",
        Double: "Kétágyas",
        Twin: "Két külön ágyas",
        Suite: "Lakosztály",
    } as const;

    const COMFORT_MAP = {
        Economy: "Gazdaságos",
        Standard: "Standard",
        Comfort: "Komfort",
        Luxury: "Luxus",
    } as const;

    type RoomType = keyof typeof ROOM_TYPE_MAP;
    type ComfortType = keyof typeof COMFORT_MAP;


    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const incoming = Array.from(e.target.files);

        const merged = [...images, ...incoming].slice(0, 8);

        setImages(merged);
        setPreviews(merged.map(file => URL.createObjectURL(file)));

        e.target.value = "";
    };
    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);

        setImages(newImages);
        setPreviews(newPreviews);

        setActiveIndex(null);
    };
    const handleCreateUnit = async () => {
        if (
            isSubmitting ||
            !roomType ||
            !comfort ||
            !occupancy ||
            images.length === 0
        )
            return;

        try {
            setIsSubmitting(true);

            const formData = new FormData();

            formData.append("occupancy", occupancy);
            formData.append(
                "type",
                JSON.stringify({
                    en: roomType,
                    hu: ROOM_TYPE_MAP[roomType],
                })
            );
            formData.append(
                "comfortLevel",
                JSON.stringify({
                    en: comfort,
                    hu: COMFORT_MAP[comfort],
                })
            );
            formData.append(
                "description",
                JSON.stringify({
                    en: descriptionEn,
                    hu: descriptionHu,
                })
            );

            images.forEach((img) => {
                formData.append("images", img);
            });

            const res = await fetch("http://localhost:5000/units", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to create unit");
            }

            const createdUnit = await res.json();
            setUnits(prev => [createdUnit, ...prev]);


            setFeedback({
                open: true,
                severity: "success",
                message: "Unit successfully created",
            });

            setImages([]);
            setPreviews([]);
            setOccupancy("");
            setRoomType("");
            setComfort("");
            setDescriptionEn("");
            setDescriptionHu("");
        } catch (err) {
            setFeedback({
                open: true,
                severity: "error",
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };




    return (
        <div className="w-full h-[550px] bg-[#f9f9f9] shadow-md text-[#1E1E1E] rounded-xl flex flex-col lg:flex-row lg:gap-8 mt-4 p-4 lg:p-6">
            <div className="w-full lg:w-[56%]">
                <h3 className="font-bold text-[24px] mb-3">Units Creation</h3>

                <div className="w-full flex flex-col lg:flex-row">
                    <div className="w-full">

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outlined"
                                startIcon={<PhotoCamera />}
                                onClick={() =>
                                    document.getElementById("unit-images")?.click()
                                }
                            >
                                Add images ({images.length}/8)
                            </Button>

                            <input
                                id="unit-images"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImagesChange}
                            />
                        </div>

                        {previews.length > 0 && (
                            <div className="mt-4 flex gap-3 flex-wrap">
                                {previews.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="
            relative
            w-22 h-20
            rounded-lg
            overflow-hidden
            shadow
            group
        "
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage(idx);
                                            }}
                                            className="
                absolute top-1 right-1
                w-6 h-6
                rounded-full
                bg-black/60
                text-white
                text-sm
                flex items-center justify-center
                opacity-0
                group-hover:opacity-100
                transition
                hover:bg-red-600
                z-10
            "
                                            title="Remove image"
                                        >
                                            ×
                                        </button>
                                        <img
                                            src={src}
                                            alt={`preview-${idx}`}
                                            className="w-full h-full object-cover cursor-pointer"
                                            onClick={() => setActiveIndex(idx)}
                                        />
                                    </div>
                                ))}

                            </div>
                        )}


                        <div className="w-[450px] flex justify-between mt-4">
                            <FormControl fullWidth variant="standard" style={{ maxWidth: '120px' }}>
                                <InputLabel id="occupancy-label">Occupancy</InputLabel>
                                <Select
                                    labelId="occupancy-label"
                                    value={occupancy}
                                    onChange={(e) => setOccupancy(e.target.value)}
                                >
                                    {OCCUPANCY_OPTIONS.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth variant="standard" style={{ maxWidth: '130px' }}>
                                <InputLabel id="room-type-label">Room type</InputLabel>
                                <Select
                                    labelId="room-type-label"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                >
                                    {ROOM_TYPE_OPTIONS.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth variant="standard" style={{ maxWidth: '150px' }}>
                                <InputLabel id="comfort-label">Comfort level</InputLabel>
                                <Select
                                    labelId="comfort-label"
                                    value={comfort}
                                    onChange={(e) => setComfort(e.target.value)}
                                >
                                    {COMFORT_OPTIONS.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row gap-4 mt-4">
                            <TextField
                                label="Room description ( English )"
                                className="w-full"
                                multiline
                                rows={5}
                                value={descriptionEn}
                                onChange={(e) => setDescriptionEn(e.target.value)}
                            />

                            <TextField
                                label="Room description ( Hungarian )"
                                className="w-full"
                                multiline
                                rows={5}
                                value={descriptionHu}
                                onChange={(e) => setDescriptionHu(e.target.value)}
                            />
                        </div>
                    </div>

                </div>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        width: "100%",
                        height: 48,
                        backgroundColor: "#AE7461",
                        fontWeight: "bold",
                        fontSize: "16px",
                        "&:hover": {
                            backgroundColor: "#966554",
                        },
                    }}
                    onClick={handleCreateUnit}
                    disabled={
                        isSubmitting ||
                        images.length === 0 ||
                        !occupancy ||
                        !roomType ||
                        !comfort ||
                        !descriptionEn ||
                        !descriptionHu
                    }
                >
                    {isSubmitting ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                        "Create Unit"
                    )}
                </Button>


            </div>
            <div className="w-full lg:w-[41%]">
                <UnitsAdminView units={units} setUnits={setUnits} />
            </div>

            <Dialog
                fullScreen
                open={activeIndex !== null}
                onClose={() => setActiveIndex(null)}
            >
                {activeIndex !== null && (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                        <IconButton
                            onClick={() => setActiveIndex(null)}
                            className="absolute! top-4 right-4 text-white! z-10"
                        >
                            <CloseIcon />
                        </IconButton>

                        <img
                            src={previews[activeIndex]}
                            alt="Fullscreen preview"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                )}
            </Dialog>
            <FeedbackAlert
                open={feedback.open}
                severity={feedback.severity}
                message={feedback.message}
                onClose={() =>
                    setFeedback((prev) => ({ ...prev, open: false }))
                }
            />

        </div>
    );
};
