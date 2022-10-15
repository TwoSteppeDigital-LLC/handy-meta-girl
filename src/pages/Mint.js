import * as React from "react";

import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";

import { useOnceEffect } from "../components/common/CustomHook";
import UserContext from "../components/common/UserContext";

const style = {
  section: {
    backgroundColor: "#FFE3E1",
  },
  gird: {
    paddingBottom: "20px",
  },
  h1: {
    color: "#ad333c",
    font: "normal normal normal 30px/1.35em 'rozha one', serif",
    textAlign: "center",
    marginBottom: 0,
  },
  img: {
    width: "20%",
    borderRadius: "10px",
  },
  p: {
    color: "#ad333c",
  },
};

export default function Contact() {
  const userContext = React.useContext(UserContext);
  useOnceEffect(() => {
    userContext.setIsMintPage(true);
  }, []);

  return (
    <Grow in={true}>
      <section style={style.section}>
        <Grid
          container
          justifyContent="center"
          direction="column"
          style={style.box}
        >
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            style={style.gird}
          >
            <h1 style={style.h1}>10 / 5555</h1>
          </Grid>
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            style={style.gird}
          >
            <img alt="logo" src="../img/mint-logo.gif" style={style.img} />
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent="center"
            style={style.gird}
          >
            <p style={style.p}>
              The launch of 5,555 Handy Meta Girls NFT to whitelisted members
              and to the public.
            </p>
          </Grid>
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            style={style.gird}
          >
            <Button
              variant="contained"
              color="error"
              disabled={!userContext.connected}
            >
              Mint Now
            </Button>
          </Grid>
        </Grid>
      </section>
    </Grow>
  );
}
