import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { range } from '../utils/range'
import useInfiniteScroll from '../utils/useInfiniteScroll'
import useGlobal from "../store";

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 5}px 0`,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const no_image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg7FtCSu3uWN9E9gvZrtQ-h36tY0gv55Scm5kfEw_4_tKl-ftz'

const Filter = ({ classes, years, movies, action }) => {
  const [type, setType] = useState('');
  const [year, setYear] = useState('');

  const handleChangeType = event => {
    action.fetchApi({ s: 'your', y: year, type: event.target.value, page: 1, scroll: false });
    setType(event.target.value)
  }

  const handleChangeYear = event => {
    action.fetchApi({ s: 'your', y: event.target.value, type: type, page: 1, scroll: false });
    setYear(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl} key="1">
        <InputLabel htmlFor="demo-controlled-open-select">Type</InputLabel>
        <Select
          value={type}
          onChange={handleChangeType}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            movies.map(v => <MenuItem key={v} value={v}>{v.toUpperCase()}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} key="2">
        <InputLabel htmlFor="demo-controlled-open-select">Year</InputLabel>
        <Select
          value={year}
          onChange={handleChangeYear}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            years.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)
          }

        </Select>
      </FormControl>
    </div>
  )
}

const ListMovie = ({ classes, cols, data }) =>
  <GridList cellHeight={220} className={classes.gridList} cols={cols}>

    {data.map(({ Title, Poster, Type, Year }) => (
      <GridListTile key={Title}>
        <img src={Poster === "N/A" ? no_image : Poster} alt={Title} />
        <GridListTileBar
          title={Title}
          subtitle={<span>Type: {Type} Year: {Year}</span>}
          actionIcon={
            <IconButton className={classes.icon}>
              <InfoIcon />
            </IconButton>
          }
        />
      </GridListTile>

    ))}
  </GridList>

const Home = ({ classes }) => {
  const matches = window.matchMedia('(max-width: 600px)').matches;
  const years = Array.from(range(1950, 2020, 1));
  const movies = ['movie', 'series', 'episode']
  const [cols, setCols] = useState(3);
  const [page, setPage] = useState(1);
  const [globalState, globalActions] = useGlobal();
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const { omdb_data } = globalState;

  function fetchMoreListItems() {
    setTimeout(() => {
      globalActions.fetchApi({ s: globalState.s, y: globalState.y, type: globalState.type, page: page + 1, scroll: true })
      setPage(page + 1)
      setIsFetching(false);
    }, 2000);
  }

  useEffect(() => {
    if (matches)
      setCols(1)

    globalActions.fetchApi({ s: globalState.s, y: globalState.y, type: globalState.type, page: page, scroll: false })
    setPage(page)
  }, []);

  return (
    <React.Fragment>
      <div className={classes.heroUnit} >
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            OMDB Album layout
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            This page is only a test sample for Technical Test of the Software Engineer Frontend. this is an example of a collection of API from omdbapi.
          </Typography>
        </div>
      </div >
      <div className={classNames(classes.layout, classes.cardGrid)}>

        <Filter classes={classes} years={years} movies={movies} action={globalActions} />
        <Divider />
        {/* End hero unit */}
        <ListMovie cols={cols} classes={classes} data={omdb_data} />
        <br />
        {isFetching && <LinearProgress />}
        {isFetching && 'Fetching more list items...'}
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(Home);