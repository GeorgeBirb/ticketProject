package aics.server.api.events;


import aics.infrastructure.errors.TicketException;
import aics.server.api.api_shared.ApiConstants;
import aics.server.api.events.dtos.FetchEventsFilterOptionsDto;
import aics.server.api.events.dtos.FetchEventsFilteredRequestDto;
import aics.server.api.events.dtos.FetchEventsFilteredResponseDto;
import io.quarkus.logging.Log;
import org.jboss.resteasy.reactive.RestResponse;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path(ApiConstants.API_PATH + "/events")
public class EventsController {
    @Inject
    EventsActions eventsActions;

    @Path("/list-filtered")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventsFilteredResponseDto> handleFetchEventsFiltered(FetchEventsFilteredRequestDto fetchEventsFilteredRequestDto) {
        Log.info("Start EventsController.handleFetchEventsFiltered");
        try {
            FetchEventsFilteredResponseDto fetchEventsFilteredResponseDto = this.eventsActions.doFetchEventsFiltered(fetchEventsFilteredRequestDto);
            Log.info("End EventsController.handleFetchEventsFiltered");
            return RestResponse.ok(fetchEventsFilteredResponseDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventsFiltered with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventsFiltered with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }

    @Path("/filter-options")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<FetchEventsFilterOptionsDto> handleFetchEventsFilterOptions() {
        Log.info("Start EventsController.handleFetchEventsFilterOptions");
        try {
            FetchEventsFilterOptionsDto fetchEventsFilterOptionsDto = this.eventsActions.doFetchEventsFilterOptions();
            Log.info("End EventsController.handleFetchEventsFilterOptions");
            return RestResponse.ok(fetchEventsFilterOptionsDto);
        } catch (TicketException e) {
            Log.error("End EventsController.handleFetchEventsFilterOptions with error", e);
            return RestResponse.status(e.getStatus(), null);
        } catch (Exception e) {
            Log.error("End EventsController.handleFetchEventsFilterOptions with error", e);
            return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR, null);
        }
    }
}