package aics.server.api.home;

import aics.infrastructure.errors.TicketException;
import aics.server.api.admin.admin_shared.AdminConstants;
import aics.server.api.home.dtos.FetchMoviesPlayingNowResponseDto;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path(AdminConstants.ADMIN_PATH + "/home")
public class HomeController {
    @Inject
    HomeActions homeActions;

    @Path("/movies-playing-now")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchMoviesPlayingNowResponseDto> handleFetchMoviesPlayingNow() {
        Log.info("Start HomeController.handleFetchMoviesPlayingNow");
        try {
            FetchMoviesPlayingNowResponseDto fetchMoviesPlayingNowResponseDto = this.homeActions.doFetchMoviesPlayingNow();
            Log.info("End HomeController.handleFetchMoviesPlayingNow");
            return RestResponse.ok(fetchMoviesPlayingNowResponseDto);
        } catch (TicketException e) {
            Log.error("End HomeController.handleFetchMoviesPlayingNow with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End HomeController.handleFetchMoviesPlayingNow with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

}