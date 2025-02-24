import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
} 

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
}

export const getType = (value,body) => {
    if(value?.params) {
        return {params: body};
    } else  if(value?.query) {
        if(typeof body === 'object') {
            return {query: body._id};
        } else {
            return {query:body};
        }
    }
    return {};
}


export const ErrorDialog = ({ open, onClose, message = "An unexpected error occurred !" }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': { 
                    borderRadius: '12px', 
                    padding: '20px', 
                    minWidth: '350px', 
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
                }
            }}
        >
            {/* Header with Icon */}
            <DialogTitle sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                fontWeight: 'bold',
                fontSize: '20px',
                color: '#d32f2f'
            }}>
                <WarningAmberIcon sx={{ color: '#d32f2f', fontSize: '28px' }} />
                ThinkSync
            </DialogTitle>

            {/* Content */}
            <DialogContent>
                <DialogContentText sx={{ fontSize: '16px', color: '#333', textAlign: 'center' }}>
                    {message}
                </DialogContentText>
            </DialogContent>

            {/* Action Buttons */}
            <DialogActions sx={{ justifyContent: 'center', paddingBottom: '16px' }}>
                <Button 
                    onClick={onClose} 
                    variant="contained" 
                    sx={{
                        backgroundColor: '#d32f2f', 
                        '&:hover': { backgroundColor: '#b71c1c' },
                        borderRadius: '8px',
                        padding: '6px 20px',
                        fontSize: '14px'
                    }}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

