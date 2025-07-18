import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

const RegularCake = ({ lines, onSave, onCancel }) => {
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const line = lines.find((l) => l.Id === selectedLine);
  const flavor = line?.flavors.find((f) => f.Id === selectedFlavor);

  const availableSizes = line?.sizes || [];
  const availableFlavors = line?.flavors || [];
  const availableIngredients = flavor?.ingredients || [];

  const handleSubmit = () => {
    if (!selectedLine || !selectedFlavor || !selectedSize) return;

    onSave({
      lineId: selectedLine,
      itemType: "REGULAR",
      flavorId: selectedFlavor,
      sizeId: selectedSize,
      ingredients: selectedIngredients,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Configurar Pastel Regular
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Línea</InputLabel>
            <Select
              value={selectedLine}
              onChange={(e) => {
                setSelectedLine(e.target.value);
                setSelectedFlavor("");
                setSelectedSize("");
                setSelectedIngredients([]);
              }}
              label="Línea"
            >
              {lines.map((line) => (
                <MenuItem key={line.Id} value={line.Id}>
                  {line.line}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sabor</InputLabel>
            <Select
              value={selectedFlavor}
              onChange={(e) => {
                setSelectedFlavor(e.target.value);
                setSelectedIngredients([]);
              }}
              label="Sabor"
              disabled={!selectedLine}
            >
              {availableFlavors.map((flavor) => (
                <MenuItem key={flavor.Id} value={flavor.Id}>
                  {flavor.flavor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Tamaño</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              label="Tamaño"
              disabled={!selectedFlavor}
            >
              {availableSizes.map((size) => (
                <MenuItem key={size.Id} value={size.Id}>
                  {size.size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {availableIngredients.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Ingredientes
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {availableIngredients.map((ingredient) => (
                <FormControlLabel
                  key={ingredient.Id}
                  control={
                    <Checkbox
                      checked={selectedIngredients.includes(ingredient.Id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIngredients([
                            ...selectedIngredients,
                            ingredient.Id,
                          ]);
                        } else {
                          setSelectedIngredients(
                            selectedIngredients.filter(
                              (id) => id !== ingredient.Id
                            )
                          );
                        }
                      }}
                    />
                  }
                  label={ingredient.ingredient}
                />
              ))}
            </Box>
          </Grid>
        )}
      </Grid>

      <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selectedLine || !selectedFlavor || !selectedSize}
        >
          Agregar Pastel
        </Button>
      </Box>
    </Box>
  );
};

export default RegularCake;
