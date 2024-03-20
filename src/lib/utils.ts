import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toDate = (dateString: string | undefined, format?: string) => {
  if (!dateString) return undefined;
  if (!moment(dateString, format).isValid()) return undefined;
  return moment(dateString, format).toDate();
};

export const formatDate = (date: Date | undefined, format: string) => {
  if (!date) return undefined;
  return moment(date).format(format);
};
export const removeAccents = (str: string | undefined = "") =>
  str
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

export function slugify(string: string) {
  string = removeAccents(string)
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
  return string;
}
