import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Share2 } from 'lucide-react';
import { FeedbackAlert } from "./FeedbackAlert";
import type { FeedbackType } from "./FeedbackAlert";

type Contacts = {
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    telegram: string;
    location: string;
};

export const ContactsControlBlock = () => {
    const [contacts, setContacts] = useState<Contacts>({
        phone: "",
        email: "",
        facebook: "",
        instagram: "",
        telegram: "",
        location: ""
    });
    const [draft, setDraft] = useState<Contacts>({ ...contacts });
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

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch('http://localhost:5000/contacts');
                if (!res.ok) throw new Error();
                const data = await res.json();
                setContacts(data);
                setDraft({ ...data });
            } catch (err) {
                showFeedback("error", "Failed to load contacts");
            }
        };
        fetchContacts();
    }, []);

    const handleInputChange = (field: keyof Contacts, value: string) => {
        setDraft(prev => ({ ...prev, [field]: value }));
    };

    const isDirty = JSON.stringify(contacts) !== JSON.stringify(draft);

    const normalizePhone = (phone: string) => phone.replace(/[^\d+]/g, "");

    const SOCIALS = {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        telegram: "https://t.me/",
    };

    const normalizeSocial = (value: string, base: string) => {
        if (!value) return "";
        return value.startsWith("http") ? value : base + value.replace(/^@/, "");
    };

    const extractMapUrl = (input: string) => {
        if (!input) return "";
        const match = input.match(/src="([^"]+)"/);
        if (match?.[1]) return match[1];
        return input.startsWith("https://www.google.com/maps/embed") ? input : "";
    };

    const handleSave = async () => {
        try {
            const payload = {
                ...draft,
                phone: normalizePhone(draft.phone),
                facebook: normalizeSocial(draft.facebook, SOCIALS.facebook),
                instagram: normalizeSocial(draft.instagram, SOCIALS.instagram),
                telegram: normalizeSocial(draft.telegram, SOCIALS.telegram),
                location: extractMapUrl(draft.location),
            };

            const res = await fetch("http://localhost:5000/contacts", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error();

            setContacts({ ...payload });
            setDraft({ ...payload });
            showFeedback("success", "Contacts updated");
        } catch {
            showFeedback("error", "Update failed");
        }
    };

    return (
        <div className="w-full text-[#1E1E1E] mt-6 space-y-6">
            <h3 className="font-bold text-[24px]">Contacts Management</h3>
            <div className="w-full flex flex-col lg:flex-row gap-[4%] mt-2">
                <div className="w-full lg:w-[48%]">
                    <TextField
                        label="Phone Number"
                        placeholder="+36 20 123 4567"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={draft.phone}
                        onChange={e => handleInputChange("phone", e.target.value)}
                        helperText="Include country code (+36)"
                    />
                    <TextField
                        label="Email Address"
                        placeholder="example@mail.com"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={draft.email}
                        onChange={e => handleInputChange("email", e.target.value)}
                    />
                    <TextField
                        label="Facebook Username"
                        placeholder="Username"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={draft.facebook}
                        onChange={e => handleInputChange("facebook", e.target.value)}
                    />
                    <TextField
                        label="Instagram Username"
                        placeholder="Username"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={draft.instagram}
                        onChange={e => handleInputChange("instagram", e.target.value)}
                    />
                    <TextField
                        label="Telegram Username"
                        placeholder="Username"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={draft.telegram}
                        onChange={e => handleInputChange("telegram", e.target.value)}
                    />

                    <Button
                        variant="contained"
                        disabled={!isDirty}
                        sx={{
                            mt: 3,
                            width: "100%",
                            height: 48,
                            backgroundColor: "#AE7461",
                            fontWeight: "bold",
                            fontSize: "16px",
                            "&:hover": { backgroundColor: "#966554" },
                        }}
                        onClick={handleSave}
                    >
                        Update Contact Info
                    </Button>
                </div>

                <div className="w-full lg:w-[48%]">
                    <TextField
                        label="Google Maps Location"
                        multiline
                        rows={3}
                        fullWidth
                        placeholder="<iframe …></iframe> or embed URL"
                        helperText="You can paste the full iframe code or just the embed URL"
                        value={draft.location}
                        onChange={e => handleInputChange("location", e.target.value)}
                    />
                    {draft.location && (
                        <iframe
                            src={extractMapUrl(draft.location)}
                            className="w-full h-[250px] mt-3 rounded-md"
                            loading="lazy"
                        />
                    )}
                    <div className="rounded-md bg-gray-50 mt-3 w-full p-3">
                        <h3 className="font-bold text-[22px]">How to get an iframe for location inserting?</h3>
                        <p className="text-[16px] mt-3">1. Visit <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-[#1976DB]">Google Maps</a></p>
                        <p className="flex text-[16px] mt-2">2. Find the location and click <span className="font-semibold flex items-center mx-1.5">"<Share2 size={16} className="mr-1" />Share"</span></p>
                        <p className="flex text-[16px] mt-2">3. Choose "Insert Map" and copy the HTML code</p>
                        <p className="flex text-[16px] mt-2">4. Paste it in the textfield above!</p>
                    </div>
                </div>
            </div>

            <FeedbackAlert
                open={feedback.open}
                message={feedback.message}
                severity={feedback.severity}
                onClose={() => setFeedback(f => ({ ...f, open: false }))}
            />
        </div>
    );
};
