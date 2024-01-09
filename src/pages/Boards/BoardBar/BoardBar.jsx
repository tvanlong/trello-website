import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLES = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        borderBottom: '1px solid #00bfa5',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx={MENU_STYLES} icon={<DashboardIcon />} label='MERN Stack Board' clickable />
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label='Public/Private Workspace' clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label='Add To Google Drive' clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label='Automation' clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label='Filter' clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: 1,
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: '0.8rem',
              border: 'none'
            }
          }}
        >
          <Tooltip title='Remy Sharp'>
            <Avatar alt='Remy Sharp' src='' />
          </Tooltip>
          <Tooltip title='Remy Sharp'>
            <Avatar alt='Remy Sharp' src='' />
          </Tooltip>
          <Tooltip title='Remy Sharp'>
            <Avatar alt='Remy Sharp' src='' />
          </Tooltip>
          <Tooltip title='Remy Sharp'>
            <Avatar alt='Remy Sharp' src='' />
          </Tooltip>
          <Tooltip title='Remy Sharp'>
            <Avatar alt='Remy Sharp' src='' />
          </Tooltip>
          <Tooltip title='Remy Sharp'>
            <Avatar alt='Remy Sharp' src='' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
