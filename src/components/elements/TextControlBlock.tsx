import { useState } from "react";
import {
    TextField,
    Tabs,
    Tab,
} from "@mui/material";

type Lang = "en" | "hu";

type LocalizedText = {
    en: string;
    hu: string;
};

type HighlightedLocalizedText = {
    en: {
        text: string;
        highlight: string;
    };
    hu: {
        text: string;
        highlight: string;
    };
};

export const TextControlBlock = () => {
    const [lang, setLang] = useState<Lang>("en");

    const [mainDescription, setMainDescription] =
        useState<HighlightedLocalizedText>({
            en: { text: "", highlight: "" },
            hu: { text: "", highlight: "" },
        });

    const [aboutText, setAboutText] =
        useState<HighlightedLocalizedText>({
            en: { text: "", highlight: "" },
            hu: { text: "", highlight: "" },
        });

    const [advantagesText, setAdvantagesText] =
        useState<LocalizedText>({ en: "", hu: "" });

    const [unitsText, setUnitsText] =
        useState<LocalizedText>({ en: "", hu: "" });

    const [facilitiesText, setFacilitiesText] =
        useState<LocalizedText>({ en: "", hu: "" });

    const [footerSubtext, setFooterSubtext] =
        useState<LocalizedText>({ en: "", hu: "" });

    const isEmpty = (value: string) => value.trim().length === 0;

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
                            label={`Main Page Highligted (${lang.toUpperCase()})`}
                            value={mainDescription[lang].highlight}
                            inputProps={{ maxLength: 80 }}
                            onChange={(e) =>
                                setMainDescription({
                                    ...mainDescription,
                                    [lang]: {
                                        ...mainDescription[lang],
                                        highlight: e.target.value,
                                    },
                                })
                            }
                            error={
                                !isEmpty(mainDescription[lang].highlight) &&
                                !mainDescription[lang].text.includes(
                                    mainDescription[lang].highlight
                                )
                            }
                            helperText="Must exist inside the description"
                            fullWidth
                            sx={{ marginTop: '10px' }}
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
                            value={aboutText[lang].highlight}
                            inputProps={{ maxLength: 100 }}
                            onChange={(e) =>
                                setAboutText({
                                    ...aboutText,
                                    [lang]: {
                                        ...aboutText[lang],
                                        highlight: e.target.value,
                                    },
                                })
                            }
                            error={
                                !isEmpty(aboutText[lang].highlight) &&
                                !aboutText[lang].text.includes(
                                    aboutText[lang].highlight
                                )
                            }
                            helperText="Must exist inside the text"
                            fullWidth
                            sx={{ marginTop: '10px' }}
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
                </div>
            </div>
        </div>
    );
};
