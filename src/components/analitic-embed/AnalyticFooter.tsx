import { Box, Typography, Avatar, Grid } from "@mui/material";

export default function AnalyticFooter() {
  return (
    <>
      <Box className=" text-center mt-2">
        <strong>Note:</strong> Numbers are updated hourly except TikTok.
      </Box>

      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="4px"
        className="mt-1"
      >
        <Typography className="text-xs">Powered by</Typography>
        <Avatar
          src="/assets/images/logo/gwLogo.png"
          sx={{ width: 20, height: 20 }}
        />
      </Grid>
    </>
  );
}
