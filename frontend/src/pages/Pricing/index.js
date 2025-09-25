import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import MainContainer from "../../components/MainContainer";
import StripePricing from "../../components/StripePricing";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles,
  },
}));

const Pricing = () => {
  const classes = useStyles();

  return (
    <MainContainer className={classes.mainContainer}>
      <MainHeader>
        <Title>Pricing Plans</Title>
      </MainHeader>
      <StripePricing />
    </MainContainer>
  );
};

export default Pricing;

