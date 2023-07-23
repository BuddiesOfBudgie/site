import React from "react";
import { Card, CardActions, CardContent } from "@mui/material";
import { PopButton } from "../pop/PopButton";
import { InterText } from "../InterText";

export const OCCallout = () => {
  return (
    <Card
      sx={{
        backgroundColor: "success.light",
        borderRadius: 4,
        boxShadow: "none",
        marginBlockEnd: 4,
        paddingBlockEnd: 2,
        paddingBlockStart: 1,
        paddingInline: 1,
      }}
    >
      <CardContent>
        <InterText variant="body1">
          Did you know that you can financially support the Buddies of Budgie project? Buddies of Budgie was founded to
          provide a home for Budgie Desktop and your financial contribution can go a long way to supporting our goals
          for development, providing opportunities for financial compensation, leveraging no-compromise Continuous
          Integration and Continuous Delivery systems for streamlining Budgie 10 and 11 development, and more!
        </InterText>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <PopButton
          bw
          href="https://opencollective.com/buddies-of-budgie?ref=buddiesofbudgie.org"
          sx={{ marginInlineEnd: 1, marginInlineStart: "auto" }}
        >
          Support
        </PopButton>
      </CardActions>
    </Card>
  );
};
