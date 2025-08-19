import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import uk from "../../../../img/uk.webp";
import bg from "../../../../img/bg.webp";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Dropdown, LngOption } from "../../styles";

const LngSwitcher = () => {
  const { t, i18n } = useTranslation();

  const languages = {
    en: {
      flag: uk,
      label: t("header.languages.en"),
    },
    bg: {
      flag: bg,
      label: t("header.languages.bg"),
    },
  };

  // normalize localStorage navigator.language so "en", "bg"
  const initialLng =
    (localStorage.getItem("lng") &&
      localStorage.getItem("lng").split("-")[0]) ||
    (navigator.language && navigator.language.split("-")[0]) ||
    "en";

  const [currLng, setCurrLng] = useState(initialLng);
  const [dropdown, setDropdown] = useState(false);

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setCurrLng(lng);
    setDropdown(false);
  };

  // fallback in case currLng is not in languages
  const current = languages[currLng] || languages.en;

  return (
    <Button
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
      variant="outlined"
      color="primary"
      size="small"
      sx={{ pr: 1, position: "relative" }}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Box sx={{ width: "24px" }}>
          <img src={current.flag} alt={current.label} className="image" />
        </Box>
        <Typography variant="body2">{current.label}</Typography>
        <ArrowDropDownIcon
          color="primary"
          sx={{ transform: `rotate(${dropdown ? "180deg" : "0"})` }}
        />
      </Stack>

      {dropdown && (
        <Dropdown>
          {Object.keys(languages).map((language, i) => (
            <LngOption key={i} onClick={() => handleChangeLng(language)}>
              <Box sx={{ width: "24px" }}>
                <img
                  src={languages[language].flag}
                  alt={languages[language].label}
                  className="image"
                />
              </Box>
              <Typography variant="body2">
                {languages[language].label}
              </Typography>
            </LngOption>
          ))}
        </Dropdown>
      )}
    </Button>
  );
};

export default LngSwitcher;
