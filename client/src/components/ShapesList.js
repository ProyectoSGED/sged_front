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
    marginBottom: "10px",
  },
  header: {
    backgroundColor: "#0088cc",
  },
  headingText: {
    color: "#FFFFFF",
    fontSize: theme.typography.pxToRem(18),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: "#FFFFFF",
    marginLeft: 30,
  },
  shapeDates: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  expandIcon: {
    color: "#FFFFFF",
  },
  shapeResume: {
    textAlign: "justify",
  },
}));

const ShapesList = ({ shapeList }) => {
  const classes = useStyle();
  const { state, downloadShape, clearShape } = useContext(ShapesContext);

  useEffect(() => {
    return () => {
      clearShape();
    };
  }, []);

  return (
    <div>
      {shapeList ? (
        shapeList.map((shape, index) => (
          <div className={classes.root} key={index}>
            <Accordion>
              <AccordionSummary
                className={classes.header}
                expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.headingText}>
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
                  Formato: {shape.formato_capa_informacion}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.shapeResume}>
                  {shape.resumen_shape}
                </Typography>
              </AccordionDetails>
              <Divider />
              <AccordionActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    downloadShape(shape.id_shape, shape.nombre_shape);
                  }}
                >
                  Descargar
                </Button>
              </AccordionActions>
            </Accordion>
          </div>
        ))
      ) : state.errorMessage ? (
        <div>
          <h4>{state.errorMessage}</h4>
        </div>
      ) : (
        <div
          style={{
            flexDirection: "row",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
          <div
            style={{
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h5>Cargando...</h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShapesList;
