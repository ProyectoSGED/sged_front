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

import SubmitMessage from "../components/SubmitMessage";
import { Context as ShapesContext } from "../context/ShapesContext";

import ShapeItem from "../components/ShapeItem";

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

const SelectShapeScreen = () => {
  const classes = useStyles();
  const { state, downloadShape, clearShape, getShapeByQuery } = useContext(
    ShapesContext
  );

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getShapeByQuery(query);
  };

  useEffect(() => {
    if (state.shapesList && query) {
      handleOpenModal(true);
    }
  }, [state.shapesList]);

  console.log(state);

  return (
    <div className="container-md screen-container">
      {state.errorMessage ? (
        <SubmitMessage errorMessage={state.errorMessage} />
      ) : null}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <div className="icon-close-container">
              <button className="btn" type="button" onClick={handleCloseModal}>
                <i className="fas fa-times close-icon"></i>
              </button>
            </div>
            <h3 id="transition-modal-title" style={{ textAlign: "center" }}>
              Resultados de búsqueda
            </h3>
            <div className="search-result">
              {state.shapesList
                ? state.shapesList.map((shape, index) => (
                    <div className={classes.root} key={index}>
                      <Accordion>
                        <AccordionSummary
                          className={classes.header}
                          expandIcon={
                            <ExpandMoreIcon className={classes.expandIcon} />
                          }
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
                          <Typography>
                            Categoría capa de información:{" "}
                            {shape.nombre_categoria}
                          </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                          <Typography>
                            Resumen capa de información: {shape.resumen_shape}
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
                : null}
            </div>
          </div>
        </Fade>
      </Modal>

      <div className="container-fluid search-form-container">
        <form className="search-form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group row">
            <div className="search-input-container col-sm-10">
              <input
                required
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                className="form-control"
                placeholder="ingrese término de busqueda..."
              />
            </div>
            <button
              className="btn"
              type="submit"
              onClick={() => getShapeByQuery(query)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container-md shapes-item-container">
        <div className="row row-cols-4">
          <ShapeItem
            altText={"amenazas"}
            imageName={"amenazas.png"}
            link={"/shapes/list"}
            shapeName={"amenazas"}
          />
          <ShapeItem
            altText={"infraestructura critica"}
            imageName={"infraestructura_critica.png"}
            link={"/shapes/list"}
            shapeName={"infraestructura_critica"}
          />
          <ShapeItem
            altText={"datos poblacion"}
            imageName={"datos_poblacion.png"}
            link={"/shapes/list"}
            shapeName={"datos_poblacion"}
          />
          <ShapeItem
            altText={"variables fisicas ambientales"}
            imageName={"variables_fisicas_ambientales.png"}
            link={"/shapes/list"}
            shapeName={"variables_fisicas_ambientales"}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectShapeScreen;
