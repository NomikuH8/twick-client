import { Box, Typography } from "@mui/material"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { getAvailableUsers } from "../../wrappers/user"

const panels = [
  { title: "Current user", panel: <></> },
  { title: "Next tweet", panel: <></> },
  { title: "Previous tweet", panel: <></> },
  { title: "Discord bot", panel: <></> },
  { title: "Current user", panel: <></> },
  { title: "Current user", panel: <></> },
]

export default function () {
  const redirect = useNavigate()

  useEffect(() => {
    ;(async () => {
      const users = await getAvailableUsers()
      if (!users.length) {
        redirect("/nousers")
        return
      }
    })()
  })

  return (
    <Box>
      <Grid
        spacing={2}
        container>
        {panels.map((val, idx) => (
          <Grid
            key={idx}
            textAlign={"center"}
            sm={12}
            md={6}
            lg={4}>
            <Paper>
              <Typography variant="h5">{val.title}</Typography>
              {val.panel}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
