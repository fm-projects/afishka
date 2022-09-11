import API from "@/api";
import { AxiosResponse } from "axios";
import { Paginator } from "../types";

enum APIEventTypes {
  GROUP,
  INDIVIDUAL,
  PUBLIC,
}

export interface APIEvent {
  id: number;
  name: string;
  description: string;
  start: string;
  end: string;
  event_type: APIEventTypes;
  max_members: number;
  reg_needed: boolean;
  thumbnail: string;
  organizer: string;
  address: string;
  price: number;
  active: boolean;
  verbose_address: string;
}

export interface EventListParams {
  page?: number;
  id__in?: string;
  date_before?: string;
  date_after?: string;
  reg_needed?: boolean;
  participants__gte?: number;
  participants__lte?: number;
  price__gte?: number;
  price__lte?: number;
  accepted?: boolean
}

export const listEvents = (
  params?: EventListParams
): Promise<AxiosResponse<Paginator<APIEvent>>> => {
  return API.axios.get("events", { params });
};

export const starEvent = (
  event: number,
  star: boolean
): Promise<AxiosResponse<any>> => {
  return API.axios.post("star-event", { event, star });
};
