"use client"

import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname, useRouter } from "next/navigation";

const LngSwitcher = ({ locale = "en" }) => {
  const languages = {
    en: "EN",
    bg: "БГ",
  };

  const [displayLng, setDisplayLng] = useState(locale === "bg" ? languages.en : languages.bg);

  const location = usePathname()
  const currentPath = location.replace(/^\/(en|bg)/, "")

  const router = useRouter()
  const navigate = (route) => router.push(route)

  const handleToggleLng = () => {
    const newLng = locale === "bg" ? "en" : "bg";
    setDisplayLng(languages[locale]);
    navigate(`/${newLng}${currentPath}`)
  };

  return (
    <Button
      onClick={handleToggleLng}
      variant="outlined"
      color="primary"
      size="small"
    >
      <Stack direction="row" gap={1} alignItems="center">
        <LanguageIcon sx={{ width: "1.2rem", height: "1.2rem" }} />
        <Typography variant="body2" fontSize={"0.9rem"} fontWeight={500} color="primary">{displayLng}</Typography>
      </Stack>
    </Button>
  );
};

export default LngSwitcher;
