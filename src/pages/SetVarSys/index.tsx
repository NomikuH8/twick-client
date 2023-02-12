import { Box, Button, Switch, TextField, Typography } from "@mui/material"
import { SetVariablesBody } from "../../interfaces/SetVariablesBody"
import { setVariables } from "../../wrappers/sysvars"
import { useNavigate } from "react-router"
import { useState } from "react"

export default function () {
  const [discordEnabled, setDiscordEnabled] = useState(true)
  const [wentWrong, setWentWrong] = useState("")
  const redirect = useNavigate()

  const handleSend = async () => {
    const body: SetVariablesBody = {}

    body.twitter = {
      consumer_key:
        document.querySelector<HTMLInputElement>("#consumerkey")?.value || "",
      consumer_secret:
        document.querySelector<HTMLInputElement>("#consumersecret")?.value ||
        "",
      callback:
        document.querySelector<HTMLInputElement>("#callback")?.value || "",
    }
    body.discord = {
      enabled:
        document.querySelector<HTMLInputElement>("#dcenabled")?.checked ||
        false,
      prefix:
        document.querySelector<HTMLInputElement>("#dcprefix")?.value || "",
      token: document.querySelector<HTMLInputElement>("#dctoken")?.value || "",
      allowed_channels:
        document
          .querySelector<HTMLInputElement>("#dcAllowedChannels")
          ?.value.split("\n") || [],
    }
    const req = await setVariables(body)

    if (req.success) {
      redirect("/")
      return
    }

    setWentWrong(req.message)
  }

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      gap={2}>
      <Box
        display={"flex"}
        gap={1}
        flexDirection={"column"}>
        <Typography variant="h5">Twitter</Typography>
        <TextField
          id="consumerkey"
          label={"Consumer Key"}
        />
        <TextField
          id="consumersecret"
          label={"Consumer Secret"}
        />
        <TextField
          id="callback"
          defaultValue={"http://localhost:7278/callback"}
          label={"Callback"}
        />
      </Box>

      <Box
        display={"flex"}
        gap={1}
        flexDirection={"column"}>
        <Typography variant="h5">Discord</Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}>
          <Typography>Enabled</Typography>
          <Switch
            id="dcenabled"
            defaultChecked
            onChange={(e) => setDiscordEnabled(e.target.checked)}
          />
        </Box>
        <TextField
          id="dctoken"
          disabled={!discordEnabled}
          label={"Token"}
        />
        <TextField
          id="dcprefix"
          disabled={!discordEnabled}
          label={"Prefix"}
        />

        <Typography variant="subtitle1">Recommendations</Typography>
        <Box
          display="flex"
          flexDirection={"column"}>
          <TextField
            id="dcAllowedChannels"
            multiline
            disabled={!discordEnabled}
            label={"Allowed channels"}
          />
          <Typography variant="caption">
            Separate channels with enter
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="h6"
        color={"error"}>
        {wentWrong}
      </Typography>
      <Button
        variant="contained"
        onClick={handleSend}>
        Send
      </Button>
    </Box>
  )
}
