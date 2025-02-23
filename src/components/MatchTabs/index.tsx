import { Tabs, Tab, Box } from '@mui/material';
import { MatchStatus } from '@/types';

interface MatchTabsProps {
  currentTab: MatchStatus | 'ALL';
  onTabChange: (tab: MatchStatus | 'ALL') => void;
  counts: {
    all: number;
    live: number;
    scheduled: number;
    finished: number;
  };
}

export const MatchTabs: React.FC<MatchTabsProps> = ({
  currentTab,
  onTabChange,
  counts,
}) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: MatchStatus | 'ALL'
  ) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        defaultValue="LIVE"
      >
        <Tab
          label={`Live (${counts.live})`}
          value="LIVE"
          sx={{ fontWeight: currentTab === 'LIVE' ? 700 : 400 }}
        />
        <Tab
          label={`All (${counts.all})`}
          value="ALL"
          sx={{ fontWeight: currentTab === 'ALL' ? 700 : 400 }}
        />
        <Tab
          label={`Scheduled (${counts.scheduled})`}
          value="SCHEDULED"
          sx={{ fontWeight: currentTab === 'SCHEDULED' ? 700 : 400 }}
        />
        <Tab
          label={`Finished (${counts.finished})`}
          value="FINISHED"
          sx={{ fontWeight: currentTab === 'FINISHED' ? 700 : 400 }}
        />
      </Tabs>
    </Box>
  );
};
