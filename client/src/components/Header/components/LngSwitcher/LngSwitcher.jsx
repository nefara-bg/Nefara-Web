import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname, useRouter } from "next/navigation";
import { useNavigate } from "@/hooks/useNavigate";

const LngSwitcher = () => {
  const languages = {
    en: "EN",
    bg: "БГ",
  };

  const lng = "en"

  const [displayLng, setDisplayLng] = useState(lng === "bg" ? languages.en : languages.bg);

  const location = usePathname()
  const currentPath = location.replace(/^\/(en|bg)/, "")

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
    >
      <Stack direction="row" gap={1} alignItems="center">
        <LanguageIcon sx={{ width: "1.2rem", height: "1.2rem" }} />
        <Typography variant="body2" fontSize={"0.9rem"} fontWeight={500} color="primary">{displayLng}</Typography>
      </Stack>
    </Button>
  );
};

export default LngSwitcher;
