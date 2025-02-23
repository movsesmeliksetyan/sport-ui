import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Avatar as MuiAvatar,
  Chip as MuiChip,
  Card as MuiCard,
  CardContent as MuiCardContent,
} from '@mui/material';

export const TeamContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  transition: 'background-color 0.2s ease',
}));

export const TeamName = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  flex: 1,
  [theme.breakpoints.up('md')]: {
    fontSize: '1.75rem',
  },
}));

export const Score = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isLive',
})<{ isLive?: boolean }>(({ theme, isLive }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: isLive ? '#FF4444' : theme.palette.primary.main,
  marginLeft: theme.spacing(2),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.spacing(1),
  backgroundColor: isLive ? 'rgba(255, 68, 68, 0.1)' : theme.palette.grey[100],
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));

export const TeamLogo = styled(MuiAvatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(2),
  backgroundColor: '#FFFFFF',
  border: `2px solid ${theme.palette.grey[200]}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  [theme.breakpoints.up('md')]: {
    width: 56,
    height: 56,
  },
}));

export const StatusChip = styled(MuiChip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'LIVE' | 'FINISHED' | 'SCHEDULED' }>(({ theme, status }) => {
  // console.log(status);

  const statusStyles = {
    LIVE: {
      backgroundColor: '#FF4444',
      color: '#FFFFFF',
      animation: 'pulse 2s infinite',
    },
    FINISHED: {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.text.secondary,
      animation: 'none',
    },
    SCHEDULED: {
      backgroundColor: '#E3F2FD',
      color: '#1976D2',
      animation: 'none',
    },
  };

  return {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: '0.75rem',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    ...statusStyles[status],
    [theme.breakpoints.up('md')]: {
      fontSize: '0.875rem',
    },
    '@keyframes pulse': {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.7 },
      '100%': { opacity: 1 },
    },
  };
});

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  minWidth: 275,
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  border: `1px solid ${theme.palette.grey[100]}`,
}));

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  paddingBottom: '16px !important',
  backgroundColor: theme.palette.grey[100],
}));

export const LeagueName = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
}));

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#F5F7FA',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const PageTitle = styled(Typography)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    marginBottom: theme.spacing(3),
    fontSize: '2rem',
    fontWeight: 900,
    textAlign: 'center',
    color: theme.palette.primary.dark,
    letterSpacing: '-0.5px',
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
      fontSize: '2.5rem',
      textAlign: 'left',
    },
  })
);

export const GameTime = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  padding: theme.spacing(0.5, 0),
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
}));

export const VideoPlayer = styled('video')(() => ({
  border: '2px solid #ccc',
  borderRadius: '8px',
  width: '640px', // Set width here
  height: '360px', // Set height here
}));
