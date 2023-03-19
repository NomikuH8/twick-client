import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import Toolbar from "@mui/material/Toolbar"
import Drawer from "@mui/material/Drawer"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Box from "@mui/material/Box"

import { Outlet, useNavigate } from "react-router"
import { useState } from "react"

const DRAWER_WIDTH = 240
const navItems = [
  { name: "Home", link: "/" },
  { name: "Tweeter", link: "/tweeter" },
  { name: "Recommendations", link: "/recommendations" },
]

export function ResponsiveLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const redirect = useNavigate()

  const drawer = (
    <Box
      onClick={() => setMobileOpen(!mobileOpen)}
      sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2 }}>
        Twick
      </Typography>
      <Divider />
      <List>
        {navItems.map((val, idx) => (
          <ListItem
            key={idx}
            disablePadding>
            <ListItemButton
              onClick={() => redirect(val.link)}
              sx={{ textAlign: "center" }}>
              <ListItemText primary={val.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          {/* <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton> */}
          <Button
            color="inherit"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: "none" } }}>
            Menu
          </Button>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
            Twick
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map((val, idx) => (
              <Button
                key={idx}
                onClick={() => redirect(val.link)}
                sx={{ color: "#fff" }}>
                {val.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ p: 3 }}>
        <Toolbar />
        <div className="content">
          <Outlet />
        </div>
      </Box>
    </Box>
  )
}
