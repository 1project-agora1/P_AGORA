import { Dialog } from '@mui/material';
import LoginForm from './login-form';

export default function LoginModal({
                                       open,
                                       onClose
                                   }: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        padding: 3,
                        width: '400px',
                        borderRadius: 2,
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                    }
                }
            }}
        >
            <h2 className="text-2xl font-bold mb-4">로그인</h2>
            <LoginForm onSuccess={onClose} onClose={onClose} />
        </Dialog>
    );
}
