import Button from "@mui/material/Button";

interface SubmitButtonProps {
    onClick?: () => void;
    buttonName: string;
    style?: string;
}

export default function SubmitButton({
    onClick,
    buttonName,
    style,
}: SubmitButtonProps) {
    return (
        <div className={`flex items-center justify-end mt-2 ${style}`}>
            <Button
                type="submit"
                onClick={onClick}
                variant="contained"
                sx={{
                    backgroundColor: "#0045aa",
                    ":hover": { backgroundColor: "#0d117a" },
                }}
            >
                <p className="font-custom font-semibold"> {buttonName}</p>
            </Button>
        </div>
    );
}
