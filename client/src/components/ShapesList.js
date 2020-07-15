import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AccordionActions from "@material-ui/core/AccordionActions";
import { Context as ShapesContext } from "../context/ShapesContext";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.secondary,
  },
  shapeDates: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

const ShapesList = ({ categorieId }) => {
  const classes = useStyle();
  const { state, shapesListByCategory } = useContext(ShapesContext);

  useEffect(() => {
    shapesListByCategory(categorieId);
  }, []);

  console.log(state);

  return (
    <div>
      {state.shapesList
        ? state.shapesList.map((shape, index) => (
            <div className={classes.root} key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    {shape.nombre_shape}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    Autor: {shape.autor}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails className={classes.shapeDates}>
                  <Typography>
                    Fecha publicación: {shape.fecha_publicacion}
                  </Typography>
                  <Typography>
                    Fecha creación metadato: {shape.fecha_creacion_metadato}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography>Resumen shape: {shape.resumen_shape}</Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small" color="primary">
                    Descargar
                  </Button>
                </AccordionActions>
              </Accordion>
            </div>
          ))
        : null}
    </div>
  );
};

export default ShapesList;
