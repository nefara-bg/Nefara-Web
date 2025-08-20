import { Box, Button, Stack, Typography } from "@mui/material";
import uk from "../../../../img/uk.webp";
import bg from "../../../../img/bg.webp";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const LngSwitcher = () => {
  const { t, i18n } = useTranslation();

  const languages = {
    en: { flag: uk, label: t("header.languages.en") },
    bg: { flag: bg, label: t("header.languages.bg") },
  };

  const initialLng =
    (localStorage.getItem("lng") &&
      localStorage.getItem("lng").split("-")[0]) ||
    (navigator.language && navigator.language.split("-")[0]) ||
    "en";

  const [currLng, setCurrLng] = useState(initialLng);

  const handleToggleLng = () => {
    const newLng = currLng === "bg" ? "en" : "bg";
    i18n.changeLanguage(newLng);
    localStorage.setItem("lng", newLng);
    setCurrLng(newLng);
  };

  // Show the *other* language
  const displayLng = currLng === "bg" ? languages.en : languages.bg;

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
