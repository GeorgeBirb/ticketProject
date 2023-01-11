import { TypeUtils } from '../core/type-utils';

export class MovieListItemDto {
    movieId: number = 0;
    name: string = '';
    description: string | null = null;
    image: string = '';

    static fromObj(obj: any): MovieListItemDto | null {
        if (!obj) {
            return null;
        }
        const movieModel: MovieListItemDto = new MovieListItemDto();
        movieModel.movieId = obj.movieId;
        movieModel.name = obj.name;
        movieModel.description = obj.description;
        movieModel.image = obj.image;
        return movieModel;
    }

    static listFromObjList(objs: any[]): MovieListItemDto[] {
        if (!objs) {
            return [];
        }
        return objs.map(MovieListItemDto.fromObj).filter(TypeUtils.isNonNullable);
    }
}