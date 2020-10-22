import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AccordionActions from "@material-ui/core/AccordionActions";
import { PaginatedList } from "react-paginated-list";

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

const ShapeScreen = ({ location }) => {
  let shapeText;

  const { state, shapesListByCategory, downloadShape, clearShape } = useContext(
    ShapesContext
  );
  const classes = useStyle();

  useEffect(() => {
    shapesListByCategory(location.state.shapeId);

    shapeText.innerHTML = location.state.shapeDescription;
  }, []);

  return (
    <div className="container screen-container">
      <div className="row">
        <div className="col-md-4">
          <div className="shape-image-container">
            <img
              src={`${process.env.PUBLIC_URL}/images/${location.state.imageName}`}
              width="307"
              height="312"
              alt={location.state.shapeName}
              loading="lazy"
            />
          </div>
          <div className="shape-text-container">
            <p className="shape-text" ref={(ref) => (shapeText = ref)}></p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="shapes-container">
            <h4 className="shape-list-title">
              Capa de información: {location.state.shapeName}
            </h4>
            <div className="shape-list-container">
              {state.shapesList ? (
                <div>
                  <PaginatedList
                    currentPage={1}
                    list={state.shapesList}
                    itemsPerPage={15}
                    renderList={(list) => (
                      <>
                        {list.map((item, id) => {
                          return (
                            <div className={classes.root} key={id}>
                              <Accordion>
                                <AccordionSummary
                                  className={classes.header}
                                  expandIcon={
                                    <ExpandMoreIcon
                                      className={classes.expandIcon}
                                    />
                                  }
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography className={classes.headingText}>
                                    {item.nombre_shape}
                                  </Typography>
                                  <Typography
                                    className={classes.secondaryHeading}
                                  >
                                    Autor: {item.autor}
                                  </Typography>
                                </AccordionSummary>

                                <AccordionDetails
                                  className={classes.shapeDates}
                                >
                                  <Typography>
                                    Fecha publicación: {item.fecha_publicacion}
                                  </Typography>
                                  <Typography>
                                    Formato: {item.formato_capa_informacion}
                                  </Typography>
                                </AccordionDetails>
                                <AccordionDetails>
                                  <Typography className={classes.shapeResume}>
                                    {item.resumen_shape}
                                  </Typography>
                                </AccordionDetails>
                                <Divider />
                                <AccordionActions>
                                  <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                      downloadShape(
                                        item.id_shape,
                                        item.nombre_shape
                                      );
                                    }}
                                  >
                                    Descargar
                                  </Button>
                                </AccordionActions>
                              </Accordion>
                            </div>
                          );
                        })}
                      </>
                    )}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeScreen;
