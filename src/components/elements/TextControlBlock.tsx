import { useState, useEffect } from "react";
import {
    TextField,
    Tabs,
    Tab,
    Button,
} from "@mui/material";
import { FeedbackAlert, type FeedbackType } from "./FeedbackAlert";
import CircularProgress from "@mui/material/CircularProgress";

type Lang = "en" | "hu";

type LocalizedText = {
    en: string;
    hu: string;
};

type HighlightedLocalizedText = {
    en: {
        text: string;
        highlights: string[];
        highlightsInput: string;
    };
    hu: {
        text: string;
        highlights: string[];
        highlightsInput: string;
    };
};


export const TextControlBlock = () => {
    const [lang, setLang] = useState<Lang>("en");
    const [isSaving, setIsSaving] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackSeverity, setFeedbackSeverity] = useState<FeedbackType>("success");
    const [initialData, setInitialData] = useState<string | null>(null);

    const [mainDescription, setMainDescription] =
        useState<HighlightedLocalizedText>({
            en: { text: "", highlights: [], highlightsInput: "" },
            hu: { text: "", highlights: [], highlightsInput: "" },
        });
    const [aboutText, setAboutText] =
        useState<HighlightedLocalizedText>({
            en: { text: "", highlights: [], highlightsInput: "" },
            hu: { text: "", highlights: [], highlightsInput: "" },
        });
    const [advantagesText, setAdvantagesText] =
        useState<LocalizedText>({ en: "", hu: "" });
    const [unitsText, setUnitsText] =
        useState<LocalizedText>({ en: "", hu: "" });
    const [facilitiesText, setFacilitiesText] =
        useState<LocalizedText>({ en: "", hu: "" });
    const [footerSubtext, setFooterSubtext] =
        useState<LocalizedText>({ en: "", hu: "" });

    // const isEmpty = (value: string) => value.trim().length === 0;

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("http://localhost:5000/text", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mainDescription,
                    aboutText,
                    advantagesText,
                    unitsText,
                    facilitiesText,
                    footerSubtext,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to save text");
            }

            console.log("Saved successfully:", data);

            setInitialData(
                JSON.stringify({
                    mainDescription,
                    aboutText,
                    advantagesText,
                    unitsText,
                    facilitiesText,
                    footerSubtext,
                })
            );
            setFeedbackMessage('Text modified successfully!');
            setFeedbackSeverity("success");
            setFeedbackOpen(true);
        } catch (err: any) {
            console.error(err);
            setFeedbackMessage(`Error: ${err.message}`);
            setFeedbackSeverity("error");
            setFeedbackOpen(true);
        } finally {
            setIsSaving(false);
        }
    };

    const fetchText = async () => {
        try {
            const res = await fetch("http://localhost:5000/text");
            if (!res.ok) throw new Error("Failed to fetch text");

            const data = await res.json();

            setMainDescription({
                en: {
                    ...data.mainDescription.en,
                    highlightsInput: data.mainDescription.en.highlights.join(", "),
                },
                hu: {
                    ...data.mainDescription.hu,
                    highlightsInput: data.mainDescription.hu.highlights.join(", "),
                },
            });

            setAboutText(data.aboutUsText);
            setAdvantagesText(data.advantagesText);
            setUnitsText(data.unitsText);
            setFacilitiesText(data.facilitiesText);
            setFooterSubtext(data.footerSubtext);

            setInitialData(
                JSON.stringify({
                    mainDescription: data.mainDescription,
                    aboutText: data.aboutUsText,
                    advantagesText: data.advantagesText,
                    unitsText: data.unitsText,
                    facilitiesText: data.facilitiesText,
                    footerSubtext: data.footerSubtext,
                })
            );
        } catch (err: any) {
            console.error("Error fetching text:", err);
        }
    };

    useEffect(() => {
        fetchText();
    }, []);

    const hasChanges =
        initialData !==
        JSON.stringify({
            mainDescription,
            aboutText,
            advantagesText,
            unitsText,
            facilitiesText,
            footerSubtext,
        });


    return (
        <div className="w-full text-[#1E1E1E] mt-6 space-y-6">
            <h3 className="font-bold text-[24px] mb-3">Landing Texts Management</h3>

            <Tabs
                value={lang}
                onChange={(_, value) => setLang(value)}
                sx={{ mb: 2 }}
            >
                <Tab label="English" value="en" />
                <Tab label="Hungarian" value="hu" />
            </Tabs>

            <div className="w-full flex flex-col lg:flex-row mt-6 lg:gap-[4%]">
                <div className="w-[48%] lg:w-full">
                    <div className="space-y-3">
                        <TextField
                            label={`Main Page Description (${lang.toUpperCase()})`}
                            multiline
                            rows={5}
                            value={mainDescription[lang].text}
                            inputProps={{ maxLength: 400 }}
                            onChange={(e) =>
                                setMainDescription({
                                    ...mainDescription,
                                    [lang]: {
                                        ...mainDescription[lang],
                                        text: e.target.value,
                                    },
                                })
                            }
                            helperText={
                                `${mainDescription[lang].text.length}/400`
                            }
                            fullWidth
                        />

                        <TextField
                            label={`Main Page Highlighted (${lang.toUpperCase()})`}
                            placeholder="Comma-separated phrases"
                            value={mainDescription[lang].highlightsInput}
                            onChange={(e) =>
                                setMainDescription({
                                    ...mainDescription,
                                    [lang]: {
                                        ...mainDescription[lang],
                                        highlightsInput: e.target.value,
                                    },
                                })
                            }
                            onBlur={() =>
                                setMainDescription({
                                    ...mainDescription,
                                    [lang]: {
                                        ...mainDescription[lang],
                                        highlights: mainDescription[lang].highlightsInput
                                            .split(",")
                                            .map(h => h.trim())
                                            .filter(Boolean),
                                    },
                                })
                            }
                            helperText="Comma-separated phrases, each must exist in the description"
                            fullWidth
                        />



                    </div>
                    <div className="space-y-3 mt-6">
                        <TextField
                            label={`About Us Text (${lang.toUpperCase()})`}
                            multiline
                            rows={5}
                            value={aboutText[lang].text}
                            inputProps={{ maxLength: 700 }}
                            onChange={(e) =>
                                setAboutText({
                                    ...aboutText,
                                    [lang]: {
                                        ...aboutText[lang],
                                        text: e.target.value,
                                    },
                                })
                            }
                            helperText={
                                `${aboutText[lang].text.length}/700`
                            }
                            fullWidth
                        />

                        <TextField
                            label={`About Us Highlighted (${lang.toUpperCase()})`}
                            placeholder="Comma-separated phrases"
                            value={aboutText[lang].highlightsInput}
                            onChange={(e) =>
                                setAboutText({
                                    ...aboutText,
                                    [lang]: {
                                        ...aboutText[lang],
                                        highlightsInput: e.target.value,
                                    },
                                })
                            }
                            onBlur={() =>
                                setAboutText({
                                    ...aboutText,
                                    [lang]: {
                                        ...aboutText[lang],
                                        highlights: aboutText[lang].highlightsInput
                                            .split(",")
                                            .map(h => h.trim())
                                            .filter(Boolean),
                                    },
                                })
                            }
                            error={aboutText[lang].highlights.some(
                                h => !aboutText[lang].text.includes(h)
                            )}
                            helperText="Comma-separated phrases, each must exist in the text"
                            fullWidth
                        />



                    </div>
                </div>

                <div className="w-[48%] lg:w-full">
                    {[
                        {
                            label: "Advantages Text",
                            max: 120,
                            state: advantagesText,
                            setState: setAdvantagesText,
                        },
                        {
                            label: "Units Section Text",
                            max: 120,
                            state: unitsText,
                            setState: setUnitsText,
                        },
                        {
                            label: "Facilities Section Text",
                            max: 120,
                            state: facilitiesText,
                            setState: setFacilitiesText,
                        },
                        {
                            label: "Footer Subtext",
                            max: 150,
                            state: footerSubtext,
                            setState: setFooterSubtext,
                        },
                    ].map(({ label, max, state, setState }) => (
                        <div key={label} className="space-y-2 mb-3">
                            <TextField
                                label={`${label} (${lang.toUpperCase()})`}
                                value={state[lang]}
                                inputProps={{ maxLength: max }}
                                onChange={(e) =>
                                    setState({
                                        ...state,
                                        [lang]: e.target.value,
                                    })
                                }
                                helperText={
                                    `${state[lang].length}/${max}`
                                }
                                fullWidth
                            />
                        </div>
                    ))}
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            width: "100%",
                            height: 48,
                            backgroundColor: "#AE7461",
                            fontWeight: "bold",
                            fontSize: "16px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#966554",
                            },
                        }}
                        onClick={handleSave}
                        disabled={isSaving || !hasChanges}
                    >
                        {isSaving ? (
                            <CircularProgress size={24} sx={{ color: "white" }} />
                        ) : (
                            "Save Changes"
                        )}
                    </Button>



                </div>
            </div>
            <FeedbackAlert
                open={feedbackOpen}
                message={feedbackMessage}
                severity={feedbackSeverity}
                onClose={() => setFeedbackOpen(false)}
            />
        </div>
    );
};
