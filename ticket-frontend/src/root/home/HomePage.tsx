import React, { useEffect, useState } from 'react'
import CarouselComponent from './components/Carousel';
import { Link } from 'react-router-dom'
import { Typography, Divider, Button, CircularProgress } from '@mui/material';
import GridLayoutComponent from './GridLayoutComponent';
import MovieIcon from '@mui/icons-material/Movie';
import { Stack } from '@mui/system';
import '../shared/components/Footer.css';
import { MovieListItemDto } from '../../modules/movie/movie-list-item-dto';
import { AdminMoviesService } from '../admin/movies/admin-movies-service';
import { useSnackbar } from 'notistack';

const HomePage = () => {
    const [isWaitingFetch, setIsWaitingFetch] = useState<boolean>(false);
    const [movies, setMovies] = useState<MovieListItemDto[]>([]);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        async function loadData() {
            setIsWaitingFetch(true);
            setMovies([]);
            try {
                const fetchMoviesListResponseDto = await AdminMoviesService.fetchMoviesList();
                console.log('fetchMoviesListResponseDto', fetchMoviesListResponseDto)
                setMovies(fetchMoviesListResponseDto.movies);
                setIsWaitingFetch(false);
            } catch (e) {
                console.error(e);
                enqueueSnackbar('Αποτυχημένη εύρεση λίστας ταινιών', { variant: 'error' });
                setIsWaitingFetch(false);
            }
        }

        loadData();
    }, [])



    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        // navigate
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            {isWaitingFetch
                ? (
                    <CircularProgress />
                )
                : (
                    <React.Fragment>
                        <CarouselComponent movies={movies} />

                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Stack direction={'row'} alignContent='center' alignItems={'center'}>
                                <MovieIcon sx={{ marginLeft: 4 }} fontSize='large' />
                                <Typography sx={{ fontSize: 'xx-large', marginLeft: 2, fontWeight: 'bolder' }}>ΠΑΙΖΟΝΤΑΙ ΤΩΡΑ</Typography>

                            </Stack>

                            <Link to={'/events'}>
                                <Button sx={{ textDecoration: 'underline', marginRight: 5 }}> ΟΛΕΣ ΟΙ ΤΑΙΝΙΕΣ </Button>
                            </Link>
                        </div>

                        <Divider variant="middle" style={{ marginBottom: 10 }} />
                        <GridLayoutComponent movies={movies} />
                    </React.Fragment>
                )}

        </React.Fragment>
    )
}

export default HomePage
