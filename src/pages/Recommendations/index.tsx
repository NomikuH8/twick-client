import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect, useState } from "react"
import NoRecommendations from "../../components/NoRecommendations"
import { Recommendation } from "../../interfaces/Recommendation"
import {
  approveRecommendation,
  declineRecommendation,
  getImageRecommendation,
  getRecommendations,
} from "../../wrappers/recommendation"

export default function () {
  const [recom, setRecom] = useState<Recommendation[]>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    ;(async () => {
      const recommendations = await getRecommendations()
      setRecom(recommendations)
    })()
  }, [])

  const changePage = (newpage: number) => {
    if (newpage >= recom.length) return
    if (newpage < 0) return
    setPage(newpage)
  }

  const approveClick = async () => {
    const newRecom = []
    for (const i of recom) {
      if (recom[page].id === i.id) continue
      newRecom.push({ ...i })
    }

    await approveRecommendation(recom[page].id)
    setRecom(newRecom)
    changePage(0)
  }

  const declineClick = async () => {
    const newRecom = []
    for (const i of recom) {
      if (recom[page].id === i.id) continue
      newRecom.push({ ...i })
    }

    await declineRecommendation(recom[page].id)
    setRecom(newRecom)
    changePage(0)
  }

  if (!recom.length) return <NoRecommendations />

  const currRecom = recom[page]
  const date = new Date(currRecom.datetime)

  return (
    <Box
      flexGrow={1}
      textAlign={"center"}>
      <Grid
        spacing={1}
        container>
        <Grid
          xs={12}
          md={6}>
          <Paper>
            <Box
              display={"flex"}
              justifyContent={"center"}
              gap={1}
              flexGrow={1}>
              <Button onClick={() => changePage(0)}>{"<<"}</Button>
              <Button onClick={() => changePage(page - 1)}>{"<"}</Button>
              <Typography variant="h5">
                {page + 1}/{recom.length}
              </Typography>
              <Button onClick={() => changePage(page + 1)}>{">"}</Button>
              <Button onClick={() => changePage(recom.length - 1)}>
                {">>"}
              </Button>
            </Box>
            <Box
              display={"flex"}
              gap={1}
              padding={2}
              justifyContent={"center"}>
              <TextField
                value={currRecom.filename}
                fullWidth
                label={"Filename"}
              />
              <TextField
                value={date.toLocaleString()}
                fullWidth
                label={"Time sent"}
              />
            </Box>
            <Box display={"flex"}>
              <Button
                fullWidth
                onClick={() => approveClick()}
                color="success">
                Approve
              </Button>
              <Button
                fullWidth
                onClick={() => declineClick()}
                color="error">
                Decline
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid
          xs={12}
          md={6}>
          <Box
            position={"relative"}
            sx={{ objectFit: "contain", width: "100%", height: "100%" }}>
            {currRecom.filename.endsWith("mp4") ? (
              <video
                controls
                style={{ width: "100%", height: "100%" }}
                src={getImageRecommendation(currRecom.filename)}></video>
            ) : (
              <img
                style={{ width: "100%", height: "100%" }}
                src={getImageRecommendation(currRecom.filename)}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
