import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { MovieListItemDto } from '../../../modules/movie/movie-list-item-dto';

export interface CardComponentProps {
    movie: MovieListItemDto
}

//Probably have to use arrays in order to load them dynamically
const CardComponent = (props: CardComponentProps) => {


    //Create a custom onClick function for our ticket buttons
    const onClick = (id: string) => {
        console.log({ id })
    }
    return (
        <Card sx={{ ":hover": { transform: 'scale(1.05)', boxShadow: 3 }, transition: 'ease', borderRadius: 5, maxWidth: 300 }}>
            <CardMedia
                component="img"
                height="200"
                src={props.movie.imageMimePrefix + ',' + props.movie.image}
            />
            <CardContent>
                <Typography fontWeight={'bold'} gutterBottom variant="h5" component="div">
                    {props.movie.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.movie.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => onClick(props.movie.name)} variant='contained' sx={{ ":hover": { backgroundColor: 'secondary' }, borderRadius: 20, backgroundColor: 'primary' }} size="small">ΕΙΣΙΤΗΡΙΑ</Button>
                <Button component={Link} to={'/events/details/:' + props.movie.name} key={'Events'} variant='outlined' sx={{ ":hover": { borderColor: '#920b17', color: '#920b17' }, color: '#E63946', backgroundColor: 'white', borderColor: '#E63946', borderRadius: 20, marginLeft: 1 }} size="small">ΠΛΗΡΟΦΟΡΙΕΣ</Button>
            </CardActions>
        </Card>
    )
}

export default CardComponent