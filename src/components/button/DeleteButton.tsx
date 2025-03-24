import Button from "@mui/material/Button";

interface SubmitButtonProps {
    onClick?: () => void;
    buttonName: string;
    style?: string;
}

export default function DeleteButton({
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
                    backgroundColor: "#d32f2f",
                    ":hover": { backgroundColor: "#9a0007" },
                }}
            >
                <p className="font-custom font-semibold"> {buttonName}</p>
            </Button>
        </div>
    );
}
