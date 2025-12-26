import {
    TextField,
    Button,
    Select,
    MenuItem,
    IconButton,
    Tabs,
    Tab
} from "@mui/material";
import { useEffect, useState } from "react";
import { IconPicker } from "./IconPicker";
import { FeedbackAlert } from "./FeedbackAlert";
import type { FeedbackType } from "./FeedbackAlert";
import { CircularProgress } from "@mui/material";
import {
    Trash2,
    Pencil,
    X,
    Building2,
    CircleDollarSign,
    BedDouble,
    BusFront,
    Cctv,
    ShoppingBasket,
    Check,
    Star,
    ThumbsUp,
    Heart,
    LampDesk,
    Sofa,
    Bike,
    Car,
    WashingMachine,
    Monitor

} from "lucide-react";

const ICON_MAP: Record<AdvantageIcon, React.ElementType> = {
    Building2,
    CircleDollarSignIcon: CircleDollarSign,
    BedDouble,
    BusFront,
    Cctv,
    ShoppingBasketIcon: ShoppingBasket,
    Check,
    Star,
    ThumbsUp,
    Heart,
    LampDesk,
    Sofa,
    Bike,
    Car,
    WashingMachine,
    Monitor
};

type AdvantageType = "Companies" | "Individuals";
type AdvantageIcon =
    | "Building2"
    | "CircleDollarSignIcon"
    | "BedDouble"
    | "BusFront"
    | "Cctv"
    | "ShoppingBasketIcon"
    | "Check"
    | "Star"
    | "ThumbsUp"
    | "LampDesk"
    | "Sofa"
    | "Bike"
    | "Car"
    | "WashingMachine"
    | "Monitor"
    | "Heart";

type Advantage = {
    _id: string;
    text: { en: string; hu: string };
    icon: string;
    type: string;
};

export const AdvantagesControlBlock = () => {
    const [advIcon, setAdvIcon] = useState<AdvantageIcon | "">("");
    const [advTextEn, setAdvTextEn] = useState("");
    const [advTextHu, setAdvTextHu] = useState("");
    const [advType, setAdvType] = useState<AdvantageType>("Companies");
    const [activeTab, setActiveTab] = useState<AdvantageType>("Companies");

    const [advantages, setAdvantages] = useState<Advantage[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

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
        setFeedback({
            open: true,
            severity,
            message,
        });
    };

    const AdvantageIconRenderer = ({ icon }: { icon: AdvantageIcon }) => {
        const Icon = ICON_MAP[icon];
        return <Icon size={18} className="text-[#AE7461]" />;
    };

    const [isLoading, setIsLoading] = useState(false);

    const fetchAdvantages = async () => {
        try {
            const res = await fetch("http://localhost:5000/advantages");
            const data = await res.json();
            setAdvantages(data);
        } catch {
            showFeedback("error", "Failed to load advantages");
        }
    };

    useEffect(() => {
        fetchAdvantages();
    }, []);

    const companiesCount = advantages.filter(a => a.type === "Companies").length;
    const individualsCount = advantages.filter(a => a.type === "Individuals").length;

    const isLimitReached =
        (advType === "Companies" && companiesCount >= 6) ||
        (advType === "Individuals" && individualsCount >= 6);

    const isFormValid =
        advIcon &&
        advTextEn.trim() &&
        advTextHu.trim() &&
        advType &&
        !isLimitReached;

    const handleCreate = async () => {
        if (!isFormValid) return;

        try {
            setIsLoading(true);

            const res = await fetch("http://localhost:5000/advantages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    icon: advIcon,
                    type: advType,
                    text: { en: advTextEn, hu: advTextHu },
                }),
            });

            if (!res.ok) throw new Error();

            showFeedback("success", "Advantage created");
            setAdvIcon("");
            setAdvTextEn("");
            setAdvTextHu("");

            fetchAdvantages();
        } catch {
            showFeedback("error", "Failed to create advantage");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (adv: Advantage) => {
        try {
            await fetch(`http://localhost:5000/advantages/${adv._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adv),
            });

            setEditingId(null);
            fetchAdvantages();
        } catch {
            showFeedback("error", "Update failed");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:5000/advantages/${id}`, { method: "DELETE" });
            setAdvantages(prev => prev.filter(a => a._id !== id));
        } catch {
            showFeedback("error", "Delete failed");
        }
    };

    const renderGroup = (type: AdvantageType) => (
        <>
            <h4 className="font-bold text-lg mt-4">{type}</h4>

            {advantages
                .filter(a => a.type === type)
                .map(a => (
                    <div
                        key={a._id}
                        className="flex items-center gap-3 mt-2 p-2 rounded-md bg-gray-50 hover:bg-gray-200"
                    >
                        <AdvantageIconRenderer icon={a.icon as AdvantageIcon} />

                        {editingId === a._id ? (
                            <>
                                <TextField
                                    size="small"
                                    value={a.text.en}
                                    onChange={e =>
                                        setAdvantages(prev =>
                                            prev.map(x =>
                                                x._id === a._id
                                                    ? { ...x, text: { ...x.text, en: e.target.value } }
                                                    : x
                                            )
                                        )
                                    }
                                    className="flex-1"
                                />

                                <IconButton onClick={() => handleUpdate(a)}>
                                    <Check size={18} />
                                </IconButton>
                                <IconButton onClick={() => setEditingId(null)}>
                                    <X size={18} />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <span className="flex-1 text-sm">{a.text.en}</span>

                                <IconButton onClick={() => setEditingId(a._id)}>
                                    <Pencil size={18} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(a._id)}>
                                    <Trash2 size={18} />
                                </IconButton>
                            </>
                        )}
                    </div>
                ))}
        </>
    );



    return (
        <div className="w-full text-[#1E1E1E] mt-6 lg:mt-15 space-y-6">
            <h3 className="font-bold text-[24px]">Advantages Management</h3>

            {feedback && (
                <FeedbackAlert
                    open={feedback.open}
                    message={feedback.message}
                    severity={feedback.severity}
                    onClose={() => setFeedback({ ...feedback, open: false })}
                />
            )}

            <div className="flex flex-col lg:flex-row gap-[4%]">
                <div className="lg:w-[48%]">
                    <IconPicker value={advIcon} onChange={setAdvIcon} />

                    <Select
                        value={advType}
                        onChange={e => setAdvType(e.target.value as AdvantageType)}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="Companies">Companies</MenuItem>
                        <MenuItem value="Individuals">Individuals</MenuItem>
                    </Select>

                    <TextField
                        label="Advantage Text EN"
                        inputProps={{ maxLength: 100 }}
                        sx={{ mt: 2 }}
                        fullWidth
                        value={advTextEn}
                        onChange={e => setAdvTextEn(e.target.value)}
                    />

                    <TextField
                        label="Advantage Text HU"
                        inputProps={{ maxLength: 100 }}
                        sx={{ mt: 2 }}
                        fullWidth
                        value={advTextHu}
                        onChange={e => setAdvTextHu(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        disabled={!isFormValid || isLoading || isLimitReached}
                        onClick={handleCreate}
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
                    >
                        {isLimitReached ? (
                            `Maximum 6 ${advType} advantages reached`
                        ) : isLoading ? (
                            <CircularProgress size={22} />
                        ) : (
                            "Create Advantage"
                        )}
                    </Button>

                </div>

                <div className="lg:w-[48%]">
                    <Tabs
                        value={activeTab}
                        onChange={(_, value) => setActiveTab(value)}
                        variant="fullWidth"
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            mb: 2,
                        }}
                    >
                        <Tab
                            label={`Companies (${companiesCount}/6)`}
                            value="Companies"
                        />
                        <Tab
                            label={`Individuals (${individualsCount}/6)`}
                            value="Individuals"
                        />
                    </Tabs>

                    {renderGroup(activeTab)}
                </div>

            </div>
        </div>
    );
};
