import { Box, Button, CircularProgress, Dialog, Link, TextField, Typography } from "@mui/material"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router"
import dayjs, { Dayjs } from "dayjs"
import { getImageRecommendation } from "../../wrappers/recommendation"
import { Recommendation } from "../../interfaces/Recommendation"
import ApprovedDrawer from "../../components/ApprovedDrawer"
import { addNewScheduled, scheduleImages } from "../../wrappers/schedule"
import { changeUser } from "../../wrappers/user"
import { tweet } from "../../wrappers/twitter"

const initialStateImages = [
  { src: "", isImage: false, isRecommended: false },
  { src: "", isImage: false, isRecommended: false },
  { src: "", isImage: false, isRecommended: false },
  { src: "", isImage: false, isRecommended: false },
]

export default function () {
  const [scheduleDate, setScheduleDate] = useState<Dayjs>(dayjs(new Date()))
  const [images, setImages] = useState(initialStateImages)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tweeted, setTweeted] = useState<any>(false)
  const [text, setText] = useState("")
  const redirect = useNavigate()

  const handleSend = async (toSchedule: boolean) => {
    setLoading(true)
    await changeUser()
    const formdata = new FormData()
    const imageFilenames = []

    for (const i of images) {
      if (!i.src) continue
      if (!i.isRecommended) {
        const inputelement = document.querySelector<HTMLInputElement>("#input" + images.indexOf(i))
        console.log(inputelement?.files![0].name)
        formdata.append("image" + images.indexOf(i), inputelement?.files![0]!)
        imageFilenames.push(inputelement?.files![0].name!)
        continue
      }

      formdata.append("image" + images.indexOf(i), i.src)
      imageFilenames.push(i.src)
    }

    await scheduleImages(formdata)
    if (!toSchedule) {
      const tweetid = await tweet(text, imageFilenames)
      setTweeted(tweetid)
    }
    if (toSchedule) {
      await addNewScheduled({
        text,
        images: imageFilenames,
        timestamp: scheduleDate?.toISOString(),
      })
      redirect(0)
    }

    setLoading(false)
  }

  const changeText = (newText: string) => {
    if (newText.length >= 280) return
    setText(newText)
  }

  const changeInput = (idx: number, ev: ChangeEvent<HTMLInputElement>) => {
    const newImages = []
    for (let i of images) newImages.push({ ...i })

    const url = URL.createObjectURL(ev.target.files![0])
    newImages[idx].src = url
    newImages[idx].isImage = !ev.target.files![0].name.endsWith("mp4")
    setImages(newImages)
  }

  const handleSelect = (recom: Recommendation) => {
    for (let i of images) {
      if (i.src) continue
      i.isRecommended = true
      i.src = recom.filename
      i.isImage = !recom.filename.endsWith("mp4")
      break
    }
  }

  const handleRemove = (idx: number) => {
    const newImages = []
    for (const i of images) newImages.push({ ...i })
    newImages[idx].src = ""
    newImages[idx].isRecommended = false
    document.querySelector<HTMLInputElement>("#input" + idx)!.files = null
    setImages(newImages)
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      maxWidth={"800px"}
      gap={1}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={1}>
        <Button
          onClick={() => handleSend(false)}
          variant="outlined">
          Tweet now
        </Button>
        <Typography>or</Typography>
        <Button
          onClick={() => handleSend(true)}
          variant="outlined">
          Schedule
        </Button>
        <MobileDateTimePicker
          value={scheduleDate}
          onChange={(newValue) => setScheduleDate(newValue!)}
        />
      </Box>
      <TextField
        multiline
        rows={5}
        label={"Tweet text"}
        value={text}
        onChange={(e) => changeText(e.target.value)}
      />
      <Typography variant="caption">Characters: {text.length}</Typography>
      <Grid
        spacing={2}
        container>
        <Grid
          xs={12}
          textAlign={"center"}>
          <Button onClick={() => setModalOpen(true)}>Show recommended images</Button>
        </Grid>

        {images.map((val, idx) => (
          <Grid
            key={idx}
            textAlign={"center"}
            xs={6}>
            <Box
              display={"flex"}
              flexDirection={"column"}>
              <input
                style={{ display: "none" }}
                id={"input" + idx}
                onChange={(e) => changeInput(idx, e)}
                type="file"
              />
              <Box>
                <label htmlFor={"input" + idx}>
                  <Button
                    variant="contained"
                    sx={{ pointerEvents: "none" }}>
                    Upload
                  </Button>
                </label>
                {val.src && (
                  <Button
                    color="error"
                    onClick={() => handleRemove(idx)}
                    variant={"contained"}>
                    Remove
                  </Button>
                )}
              </Box>
              {val.isImage ? (
                <img
                  style={{
                    objectFit: "contain",
                    maxHeight: "150px",
                    position: "relative",
                  }}
                  src={val.isRecommended ? getImageRecommendation(val.src) : val.src}
                />
              ) : (
                <video
                  style={{
                    objectFit: "contain",
                    maxHeight: "150px",
                    position: "relative",
                  }}
                  src={val.isRecommended ? getImageRecommendation(val.src) : val.src}></video>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
      <ApprovedDrawer
        onSelect={handleSelect}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      {loading && (
        <Dialog open={true}>
          <Box padding={3}>
            <CircularProgress />
          </Box>
        </Dialog>
      )}
      {tweeted && (
        <Dialog
          open={Boolean(tweeted)}
          onClose={() => redirect(0)}>
          <Box padding={3}>
            <Link
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${tweeted.user.screen_name}/status/${tweeted.id_str}`}>
              Go to tweet
            </Link>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}
