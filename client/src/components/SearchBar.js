import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Search } from "@material-ui/icons";

import { Context as ShapesContext } from "../context/ShapesContext";

import SearchResult from "./SearchResult";
import AlertDialog from "./AlertDialog";

const useStyles = makeStyles((theme) => ({
  margin: {
    width: 300,
    left: "30%",
    bottom: "20%",
    position: "absolute",
  },
  text: {
    width: 230,
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  const { state, getShapeByQuery } = useContext(ShapesContext);

  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);

  setOpenModal.bind(this);

  useEffect(() => {
    if (state.shapesListByQuery && query) {
      setOpenModal(true);
      setQuery("");
    }
  }, [state.shapesListByQuery]);

  return (
    <div className={classes.margin}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          getShapeByQuery(query);
        }}
      >
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className={classes.text}
              id="input-with-icon-grid"
              placeholder={"Buscar capa de información"}
            />
          </Grid>
          <Grid item>
            <Search />
          </Grid>
        </Grid>
      </form>
      {state.shapesListByQuery && openModal ? (
        <SearchResult
          shapesList={state.shapesListByQuery}
          setOpenModal={setOpenModal}
        />
      ) : null}
      {state.errorMessage ? (
        <AlertDialog message={state.errorMessage} showCancelButton={false} />
      ) : null}
    </div>
  );
};

export default SearchBar;
