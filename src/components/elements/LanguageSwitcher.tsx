import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

export function LanguageSwitcher() {
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");

        if (savedLanguage) {
            setLanguage(savedLanguage);
            return;
        }

        const detectLanguage = async () => {
            try {
                const res = await fetch("https://api.country.is/");
                const data = await res.json();

                const detectedLang = data.country === "HU" ? "hu" : "en";

                setLanguage(detectedLang);
                localStorage.setItem("language", detectedLang);
            } catch (error) {
                console.error("Language auto-detection failed:", error);
                setLanguage("en");
                localStorage.setItem("language", "en");
            }
        };

        detectLanguage();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const newLang = event.target.value;
        setLanguage(newLang);
        localStorage.setItem("language", newLang);
        window.location.reload();
    };

    return (
        <FormControl
            size="small"
            variant="standard"
            sx={{
                minWidth: 60,
                bgcolor: "transparent",
                marginTop: "5px !important",
            }}
        >
            <Select
                variant="standard"
                disableUnderline
                value={language}
                onChange={handleChange}
                MenuProps={{ disableScrollLock: true }}
                sx={{
                    color: "#1E1E1E",
                    "& .MuiSvgIcon-root": {
                        color: "#1E1E1E",
                    },
                    "& .MuiSelect-icon": {
                        top: "50%",
                        transform: "translateY(-60%)",
                    },
                }}
            >
                <MenuItem value="en">
                    <ReactCountryFlag countryCode="GB" svg style={{ width: 18, height: 18, marginRight: 6 }} />
                    <span className="text-[14px]">ENG</span>
                </MenuItem>

                <MenuItem value="hu">
                    <ReactCountryFlag countryCode="HU" svg style={{ width: 18, height: 18, marginRight: 6 }} />
                    <span className="text-[14px]">HU</span>
                </MenuItem>
            </Select>
        </FormControl>
    );
}
