package aics.server.api.general;

import aics.infrastructure.errors.TicketException;
import aics.server.api.api_shared.ApiConstants;
import aics.server.api.general.dtos.FetchLoggedUserDetailsDto;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path(ApiConstants.API_PATH + "/general")
public class GeneralController {
    @Inject
    GeneralActions generalActions;


    @Path("/logged-user-details")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchLoggedUserDetailsDto> handleFetchLoggedUserDetails(@RestPath Long id) {
        Log.info("Start GeneralController.handleFetchLoggedUserDetails");
        try {
            FetchLoggedUserDetailsDto fetchLoggedUserDetailsDto = this.generalActions.doFetchLoggedUserDetails();
            Log.info("End GeneralController.handleFetchLoggedUserDetails");
            return RestResponse.ok(fetchLoggedUserDetailsDto);
        } catch (TicketException e) {
            Log.error("End GeneralController.handleFetchLoggedUserDetails with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End GeneralController.handleFetchLoggedUserDetails with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}