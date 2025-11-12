"use client"

import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";

const LngSwitcher = ({ locale = "en" }) => {
  const languages = {
    en: "EN",
    bg: "БГ",
  };

  const [displayLng, setDisplayLng] = useState(locale === "bg" ? languages.en : languages.bg);

  const location = usePathname()
  const currentPath = location.replace(/^\/(en|bg)/, "")

  const router = useRouter()

  const handleToggleLng = () => {
    const newLng = locale === "bg" ? "en" : "bg";
    console.log(`PATH: ${`/${newLng}${currentPath}`}`)
    router.push(currentPath, { locale: newLng })
  };

  return (
    // <Link href="/" locale="bg">
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
    // </Link>
  );
};

export default LngSwitcher;
