import Button from "@mui/material/Button";

interface SubmitButtonProps {
    onClick: () => void;
    buttonName: string;
}

export default function SubmitButton({
    onClick,
    buttonName,
}: SubmitButtonProps) {
    return (
        <div className="flex items-center justify-end mt-10 ">
            <Button
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
