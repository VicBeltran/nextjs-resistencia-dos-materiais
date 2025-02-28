import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CalcConfigs(props) {
  const [shaft_len, set_shaft_len] = useState(1);
  const [d, set_d] = useState(1);
  const [coeficiente_seguranca, set_coeficiente_seguranca] = useState(1);
  const [peso_conjunto, set_peso_conjunto] = useState(1);
  const [coef_transmissao, set_coef_transmissao] = useState(1);
  const [optional_entries, set_optional_entries] = useState(false);
  const [torque, set_torque] = useState(5);


  if (shaft_len / 2 - 0.1 < d) set_d(shaft_len / 2 - 0.1);

  function update() {
    console.debug("query update", {
      shaft_len,
      d,
      coeficiente_seguranca,
      peso_conjunto,
      coef_transmissao,
      d_entre_rodas: shaft_len - 2*d,
      optional_entries,
      torque
    })
    try {
      props.callback({
        shaft_len,
        d,
        coeficiente_seguranca,
        peso_conjunto,
        coef_transmissao,
        d_entre_rodas: shaft_len - 2*d,
        optional_entries: optional_entries? 1:0,
        torque
      })
    } catch(error) {
      console.log(props)
      console.error("error on query update", error)
    }
  }

  useEffect(()=>update(), [
    shaft_len,
    d,
    coeficiente_seguranca,
    peso_conjunto,
    coef_transmissao,
    optional_entries,
    torque
  ])


  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        my: 3,
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }} align="center" noWrap component="div">
        Configurações
      </Typography>

      <Box sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',

        alignItems: 'center',
        width: '100%',

        ml: 1,
        mr: 4,
      }}>
        <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
          <TextField
            fullWidth
            value={shaft_len}
            label="Comprimento do eixo (m)"
            type="number"
            variant="standard"
            onChange={(e, v) => set_shaft_len(v)}
            min={1}
            max={1000}
            required
          />
          <Slider
            value={shaft_len}
            onChange={(e, v) => set_shaft_len(v)}
            min={1}
            max={1000}
          />
        </Stack>
        <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
          <TextField
            fullWidth
            value={d}
            label="d"
            type="number"
            variant="standard"
            onChange={(e, v) => set_d(v)}
            min={0.1}
            max={shaft_len/2}
            step={0.1}
            required
          />
          <Slider value={d} onChange={(e, v) => set_d(v)} step={0.1} min={0.1} max={shaft_len/2} />
        </Stack>
        <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
          <TextField
            fullWidth
            value={torque}
            label="Torque"
            type="number"
            variant="standard"
            onChange={(e, v) => set_torque(v)}
            min={1}
            max={1000}
            required
          />
          <Slider value={torque} onChange={(e, v) => set_torque(v)} min={1} max={1000} />
        </Stack>
        <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
          <TextField
            fullWidth
            value={coeficiente_seguranca}
            label="Coeficiente de segurança"
            type="number"
            variant="standard"
            onChange={(e, v) => set_coeficiente_seguranca(v)}
            min={0}
            max={1}
            step={0.05}
            required
          />
          <Slider
            value={coeficiente_seguranca}
            onChange={(e, v) => set_coeficiente_seguranca(v)}
            min={0}
            max={1}
            step={0.05}
          />
        </Stack>
        <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
          <TextField
            fullWidth
            value={peso_conjunto}
            label="Peso do conjunto (kg)"
            type="number"
            variant="standard"
            onChange={(e, v) => set_peso_conjunto(v)}
            min={1}
            max={1000}
            required
          />
          <Slider
            value={peso_conjunto}
            onChange={(e, v) => set_peso_conjunto(v)}
            min={1}
            max={1000}
          />
        </Stack>
        <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
          <TextField
            fullWidth
            value={coef_transmissao}
            label="Coeficiente de transmissão"
            type="number"
            variant="standard"
            onChange={(e, v) => set_coef_transmissao(v)}
            min={0}
            max={1}
            step={0.05}
            required
          />
          <Slider
            value={coef_transmissao}
            onChange={(e, v) => set_coef_transmissao(v)}
            min={0}
            max={1}
            step={0.05}
          />
        </Stack>
      </Box>
      <Accordion sx={{ m: 0, p: 0 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Opções avançadas</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mr: 4 }}>
          <FormControlLabel
            control={
              <Switch
                value={optional_entries}
                onClick={(e) => set_optional_entries(e.target.checked)}
                defaultChecked
              />
            }
            sx={{ mb: 3 }}
            label="Personalizar as configurações"
            labelPlacement="end"
          />
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Correção acabamento superficial"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Fator Confiabilidade"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Fator de correção pela temperatura"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Fator relativo a serviços pesados"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Corrção da tensão devido à concentradores de tensões"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Correção da tensão devido à incertezas"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ mb: 1 }} alignItems="center">
              <TextField
                fullWidth
                disabled={!optional_entries}
                value={shaft_len}
                label="Limite de resistência à fadiga (50% limite de resistência à tração)"
                type="number"
                variant="standard"
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
                required
              />
              <Slider
                disabled={!optional_entries}
                value={shaft_len}
                onChange={(e, v) => set_shaft_len(v)}
                min={1}
                max={1000}
              />
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
