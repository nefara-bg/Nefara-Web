import { Box, Button, Stack, Typography } from "@mui/material";
import uk from "../../../../img/uk.webp";
import bg from "../../../../img/bg.webp";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LngSwitcher = () => {
  const languages = {
    en: { flag: uk, label: "English" },
    bg: { flag: bg, label: "Български" },
  };

  const { lng } = useParams()

  const [displayLng, setDisplayLng] = useState(lng === "bg" ? languages.en : languages.bg);

  const location = useLocation()
  const currentPath = location.pathname.replace(/^\/(en|bg)/, "")

  const navigate = useNavigate()

  const handleToggleLng = () => {
    const newLng = lng === "bg" ? "en" : "bg";
    setDisplayLng(languages[lng]);
    navigate(`/${newLng}${currentPath}`)
  };

  return (
    <Button
      onClick={handleToggleLng}
      variant="outlined"
      color="primary"
      size="small"
      sx={{ pr: 1 }}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Box sx={{ width: "24px" }}>
          <img src={displayLng.flag} alt={displayLng.label} className="image" />
        </Box>
        <Typography variant="body2">{displayLng.label}</Typography>
      </Stack>
    </Button>
  );
};

export default LngSwitcher;
