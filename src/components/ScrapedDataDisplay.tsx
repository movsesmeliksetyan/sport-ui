import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ScrapedData } from '@/types';

interface Props {
  data: ScrapedData;
}

const ScrapedDataDisplay: React.FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Scraped at: {new Date(data.timestamp).toLocaleString()}
        </Typography>
        <Box mt={2}>
          <Typography variant="body1">{data.content}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ScrapedDataDisplay;
