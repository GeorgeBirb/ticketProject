import { MovieListItemDto } from '../../../../modules/movie/movie-list-item-dto';

export class FetchMoviesListResponseDto {
    movies: MovieListItemDto[] = [];

    static fromObj(obj: any): FetchMoviesListResponseDto | null {
        if (!obj) {
            return null;
        }
        const fetchMoviesListResponseDto: FetchMoviesListResponseDto = new FetchMoviesListResponseDto();
        fetchMoviesListResponseDto.movies = obj.movies;
        return fetchMoviesListResponseDto;
    }
}