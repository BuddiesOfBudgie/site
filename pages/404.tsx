import type { NextPage } from "next";
import { CustomMetaProps } from "../components/CustomMeta";

// Material UI Bits
import Container from "@mui/material/Container";

import PageBase from "../components/PageBase";
import NotFound from "../components/NotFound";

export const meta: CustomMetaProps = {
  Title: "404 Not Found",
};

const Custom404: NextPage = () => {
  return (
    <PageBase meta={meta}>
      <Container maxWidth="sm" sx={{ marginTop: "30vh" }}>
        <NotFound />
      </Container>
    </PageBase>
  );
};

export default Custom404;
