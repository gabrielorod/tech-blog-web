import { Box, Typography, Avatar, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplyIcon from '@mui/icons-material/Reply';

interface CommentItemProps {
  name: string;
  time: string;
  content: string;
  isReply?: boolean;
  canDelete?: boolean;
  onReply?: () => void;
  onDelete?: () => void;
}

export default function CommentItem({
  name,
  time,
  content,
  isReply = false,
  canDelete = false,
  onReply,
  onDelete,
}: CommentItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: isReply ? '16px 16px 16px 68px' : '16px',
        gap: '12px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Avatar sx={{ width: 40, height: 40, bgcolor: '#EDF2E8', borderRadius: '20px' }} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'Newsreader',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '21px',
                color: '#141712',
              }}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Newsreader',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px',
                color: '#758269',
              }}
            >
              {time}
            </Typography>
          </Box>

          {canDelete && (
            <IconButton size="small" onClick={onDelete} sx={{ color: '#758269', p: 0 }}>
              <DeleteOutlineIcon sx={{ width: 16, height: 16 }} />
            </IconButton>
          )}
        </Box>

        <Typography
          sx={{
            fontFamily: 'Newsreader',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '21px',
            color: '#141712',
            mt: '4px',
          }}
        >
          {content}
        </Typography>

        <Box sx={{ display: 'flex', mt: '8px' }}>
          <IconButton size="small" onClick={onReply} sx={{ p: 0 }}>
            <ReplyIcon sx={{ width: 16, height: 16, color: '#758269' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
