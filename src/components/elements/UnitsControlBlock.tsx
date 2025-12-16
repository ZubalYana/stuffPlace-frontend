import { useState } from "react";
import type { ChangeEvent } from "react";
import { PhotoCamera } from "@mui/icons-material";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
export const UnitsControlBlock = () => {
    const [image, setImage] = useState<string | null>(null);

    const [occupancy, setOccupancy] = useState("");
    const [roomType, setRoomType] = useState("");
    const [comfort, setComfort] = useState("");

    const OCCUPANCY_OPTIONS = ["1", "2", "4", "6", "8"];
    const ROOM_TYPE_OPTIONS = ["Single", "Double", "Twin", "Suite"];
    const COMFORT_OPTIONS = ["Economy", "Standard", "Comfort", "Luxury"];

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <div className="w-full h-[550px] bg-[#f9f9f9] shadow-md text-[#1E1E1E] rounded-xl mt-4 p-4 lg:p-6">
            <div className="w-full lg:w-[55%]">
                <h3 className="font-bold text-[24px] mb-3">Units Creation</h3>

                <div className="w-full flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[50%]">

                        <label
                            htmlFor="unit-image"
                            className="
                    relative
                    w-full h-50
                    border-2 border-dashed border-gray-300
                    rounded-xl
                    flex items-center justify-center
                    cursor-pointer
                    bg-white
                    hover:border-blue-500
                    transition
                    overflow-hidden
                "
                        >
                            {image ? (
                                <>
                                    <img
                                        src={image}
                                        alt="Unit preview"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white font-medium">
                                        Change image
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                    <PhotoCamera fontSize="large" />
                                    <span className="text-sm">Click to upload image</span>
                                </div>
                            )}
                        </label>
                        <input
                            id="unit-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <div className="w-full flex justify-between mt-4">
                            <FormControl fullWidth variant="standard" style={{ width: '70px' }}>
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

                            <FormControl fullWidth variant="standard" style={{ width: '100px' }}>
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

                            <FormControl fullWidth variant="standard" style={{ width: '150px' }}>
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

                    </div>
                    <div className="w-full lg:w-[50%] lg:ml-5">
                        <TextField label="Room description ( English )" className="w-full" multiline rows={6} />
                        <TextField label="Room description ( Hungarian )" style={{ marginTop: '15px' }} className="w-full" multiline rows={6} />
                    </div>
                </div>
            </div>
        </div>
    );
};
