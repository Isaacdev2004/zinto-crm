import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  price: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  feature: {
    marginBottom: theme.spacing(1),
  },
  popular: {
    position: "absolute",
    top: -10,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
  },
  button: {
    marginTop: "auto",
    marginTop: theme.spacing(2),
  },
}));

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 users",
      "2 WhatsApp connections",
      "Basic support",
      "Standard features",
    ],
    priceId: process.env.REACT_APP_STRIPE_STARTER_PRICE_ID,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Best for growing businesses",
    features: [
      "Up to 15 users",
      "5 WhatsApp connections",
      "Priority support",
      "Advanced features",
      "Campaigns",
      "Integrations",
    ],
    priceId: process.env.REACT_APP_STRIPE_PRO_PRICE_ID,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$149",
    period: "/month",
    description: "For established businesses",
    features: [
      "Up to 50 users",
      "15 WhatsApp connections",
      "24/7 support",
      "All features",
      "Advanced analytics",
      "Custom integrations",
    ],
    priceId: process.env.REACT_APP_STRIPE_PREMIUM_PRICE_ID,
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations",
    features: [
      "Unlimited users",
      "Unlimited connections",
      "Dedicated support",
      "Custom features",
      "SLA guarantee",
      "On-premise option",
    ],
    priceId: null,
    popular: false,
  },
];

const StripePricing = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = async (plan) => {
    if (!user) {
      toast.error("Please log in to select a plan");
      return;
    }

    if (plan.id === "enterprise") {
      // For enterprise, redirect to contact form or show modal
      toast.info("Please contact us for enterprise pricing");
      return;
    }

    if (!plan.priceId) {
      toast.error("Plan not available");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/stripe/checkout", {
        priceId: plan.priceId,
        planId: plan.id,
      });

      if (response.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        toast.error("Error creating checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Select the perfect plan for your business needs
        </Typography>
      </Box>

      <Grid container spacing={3} justify="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={3} key={plan.id}>
            <Card className={classes.card}>
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  className={classes.popular}
                />
              )}
              <CardHeader
                title={plan.name}
                subheader={plan.description}
                className={classes.cardHeader}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
              />
              <CardContent className={classes.cardContent}>
                <Box textAlign="center" mb={2}>
                  <Typography className={classes.price}>
                    {plan.price}
                  </Typography>
                  <Typography color="textSecondary">{plan.period}</Typography>
                </Box>

                <Box flexGrow={1}>
                  {plan.features.map((feature, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      className={classes.feature}
                    >
                      ✓ {feature}
                    </Typography>
                  ))}
                </Box>

                <Button
                  variant={plan.popular ? "contained" : "outlined"}
                  color="primary"
                  fullWidth
                  className={classes.button}
                  onClick={() => handleSelectPlan(plan)}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : plan.id === "enterprise" ? (
                    "Contact Sales"
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="textSecondary">
          All plans include a 14-day free trial. Cancel anytime.
        </Typography>
      </Box>
    </div>
  );
};

export default StripePricing;

