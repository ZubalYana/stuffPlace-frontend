import {
    TextField,
    Button
} from "@mui/material";
// import { useState, useEffect } from "react";
import { Share2 } from 'lucide-react';
export const ContactsControlBlock = () => {
    return (
        <div className="w-full text-[#1E1E1E] mt-6 space-y-6">
            <h3 className="font-bold text-[24px]">Contacts Management</h3>
            <div className="w-full flex flex-col lg:flex-row gap-[4%] mt-2">
                <div className="w-full lg:w-[48%]">
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Facebook"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Instagram"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Telegram"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Viber"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
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
                        Update Contact Info
                    </Button>
                </div>
                <div className="w-full lg:w-[48%]">
                    <TextField
                        label="Location ( inserted )"
                        multiline
                        rows={3}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <div className="rounded-md bg-gray-50 mt-2 w-full p-3">
                        <h3 className="font-bold text-[22px]">How to get a frame for location inserting?</h3>
                        <p className="text-[16px] mt-3">1. Visit <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-[#1976DB]">Google Maps</a> </p>
                        <p className="flex text-[16px] mt-2">2. Find the required location and click the <span className="font-semibold flex items-center mx-1.5">"<Share2 size={16} className="mr-1" />Share"</span> button</p>
                        <p className="flex text-[16px] mt-2">3. Choose the <span className="font-semibold mx-1.5">"Insert Map"</span> tab and click on the <span className="font-semibold mx-1.5">"Copy HTML-code"</span> button</p>
                        <p className="flex text-[16px] mt-2">4. Paste in the textfield above and here you go!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}