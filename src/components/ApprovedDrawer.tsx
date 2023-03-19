import {
  getApprovedRecommendations,
  getImageRecommendation,
} from "../wrappers/recommendation"
import { AppBar, Box, Button, IconButton, Paper, Toolbar } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import { useEffect, useState } from "react"
import { Recommendation } from "../interfaces/Recommendation"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

export default function ({
  open,
  onClose,
  onSelect,
}: {
  open: boolean
  onClose: any
  onSelect: any
}) {
  const [images, setImages] = useState<Recommendation[]>([])

  useEffect(() => {
    ;(async () => {
      const recoms = await getApprovedRecommendations()
      setImages(recoms)
    })()
  }, [])

  const handleSelect = (recom: Recommendation) => {
    onSelect(recom)
    onClose()
  }

  return (
    <Dialog
      fullScreen
      onClose={() => onClose()}
      open={open}>
      <AppBar>
        <Toolbar>
          <Button
            color={"inherit"}
            onClick={onClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid
        spacing={2}
        padding={2}
        container>
        {images.map((val, idx) => (
          <Grid
            key={idx}
            xs={12}
            sm={6}
            md={4}
            lg={3}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}>
              {val.filename.endsWith("mp4") ? (
                <video
                  style={{ height: "250px" }}
                  src={getImageRecommendation(val.filename)}></video>
              ) : (
                <img
                  style={{ height: "250px" }}
                  src={getImageRecommendation(val.filename)}
                />
              )}
              <Box display={"flex"}>
                <Button
                  onClick={() => handleSelect(val)}
                  variant="contained"
                  fullWidth
                  color={"info"}>
                  Select
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color={"error"}>
                  Delete
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  )
}
