import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    margin: "auto 5% auto 5%",
  },
  paper: {
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100%",
    height: "99%",
    padding: "20px 80px",
    marginTop: "auto",
  },
  root: {
    overflow: "hidden",
    width: "90%",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
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
}));

const SearchResult = ({ shapesList, setOpenModal }) => {
  const classes = useStyles();

  const { state, downloadShape } = useContext(ShapesContext);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={true}>
          <div className={classes.paper}>
            <div className="icon-close-container">
              <button
                className="btn"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                <i className="fas fa-times close-icon"></i>
              </button>
            </div>
            <h3 id="transition-modal-title" style={{ textAlign: "center" }}>
              Resultados de búsqueda
            </h3>

            {shapesList ? (
              <div className="search-result">
                <PaginatedList
                  currentPage={1}
                  list={shapesList}
                  itemsPerPage={10}
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

                              <AccordionDetails className={classes.shapeDates}>
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
        </Fade>
      </Modal>
    </div>
  );
};

export default SearchResult;
