import API from "@/api";
import { AxiosResponse } from "axios";
import { Paginator } from "../types";

export interface APIEvent {
  id: number;
  name: string;
  description: string;
  start: string;
  end: string;
  participants: number;
  reg_needed: boolean;
  // thumbnail: string;
  organizer: string;
  address: string;
  price: number;
  accepted: boolean;
  max_price: number;
}

export interface CreateEventData {
  name: string;
  description: string;
  start: string;
  end: string;
  participants: number;
  reg_needed: boolean;
  organizer?: string;
  address: string;
  price: number;
  creator: number;
  max_price: number;
}

export interface PatchEventData {
  name?: string;
  description?: string;
  start?: string;
  end?: string;
  participants?: number;
  reg_needed?: boolean;
  organizer?: string;
  address?: string;
  price?: number;
  accepted?: boolean;
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
  accepted?: boolean;
  query?: string;
}

export const listEvents = (
  params?: EventListParams
): Promise<AxiosResponse<Paginator<APIEvent>>> => {
  return API.axios.get("events", { params });
};

export const getEvent = (id: string): Promise<AxiosResponse<APIEvent>> => {
  return API.axios.get(`events/${id}`);
};

export const starEvent = (
  event: number,
  star: boolean
): Promise<AxiosResponse<any>> => {
  return API.axios.post("star-event", { event, star });
};

export const createEvent = (data: CreateEventData) => {
  return API.axios.post("events", data);
};

export const deleteEvent = (id: string): Promise<void> => {
  return API.axios.delete(`events/${id}`);
};

export const patchEvent = (id: string | number, data: PatchEventData) => {
  return API.axios.patch(`events/${id}`, data);
};
