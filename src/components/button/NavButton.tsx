import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

interface NavButtonProps {
    url: string;
    label: string;
    style?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ url, label, style }) => {
    return (
        <div className={`flex items-center justify-end mt-2 ${style}`}>
            <Link href={url} passHref>
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        backgroundColor: "#808080",
                        ":hover": { backgroundColor: "#696969" },
                    }}
                >
                    <p className="font-custom font-semibold">{label}</p>
                </Button>
            </Link>
        </div>
    );
};

export default NavButton;
